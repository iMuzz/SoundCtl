function OpusEncoder() {}

OpusEncoder.prototype.init = function(rate, channels, frame_sz) {
  var err;
  var err_ptr;
  var max_coded_sz;
  if (rate != 48000) throw "OpusEnc: wrong rate "+rate;
  if (channels != 2) throw "OpusEnc: wrong chan count "+channels;
  if (frame_sz != 480) throw "OpusEnc: wrong frame size "+frame_sz;
  this.rate = rate;
  this.channels = channels;
  this.frame_sz = frame_sz;
  err_ptr = allocate(4, 'i32', ALLOC_STACK);
  this.ctx = _opus_encoder_create(this.rate, this.channels, 2049, err);
  err = getValue(err_ptr, 'i32');
  if (err !== 0) throw 'OpusEnc: opus_encoder_create failed: ' + err;
  this.raw_ptr = _malloc(this.frame_sz * this.channels * 4);
  this.raw_len = this.frame_sz * this.channels;
  this.raw = HEAPF32.subarray(this.raw_ptr >> 2,
   (this.raw_ptr >> 2) + this.raw_len);
  max_coded_sz = 1275 * 3 + 7;
  this.coded_sz = max_coded_sz;
  this.coded_ptr = _malloc(this.coded_sz);
  this.coded = HEAPU8.subarray(this.coded_ptr, this.coded_ptr + this.coded_sz);
  this.raw_off = 0;
};

OpusEncoder.prototype.encode = function(samples) {
  var ret;
  var off;
  var packet;
  var packets = [];
  off = 0;
  while (samples.length - off >= this.raw_len - this.raw_off) {
    if (this.raw_off > 0) {
      this.raw.set(samples.subarray(off,
       off + this.raw_len - this.raw_off), this.raw_off);
      off += this.raw_len - this.raw_off;
      this.raw_off = 0;
    } else {
      this.raw.set(samples.subarray(off, off + this.raw_len));
      off += this.raw_len;
    }
    ret = _opus_encode_float(this.ctx, this.raw_ptr,
     this.frame_sz, this.coded_ptr, this.coded_sz);
    if (ret <= 0) throw 'OpusEnc: opus_encode_float failed: ' + ret;
    packet = new ArrayBuffer(ret);
    new Uint8Array(packet).set(this.coded.subarray(0, ret));
    packets.push(packet);
  }
  if (off < samples.length) {
    this.raw.set(samples.subarray(off));
    this.raw_off = samples.length - off;
  }
  return packets;
};

OpusEncoder.prototype.ctl = function(ctl, value) {
  var ptr;
  var ret;
  if (ctl == "OPUS_SET_BITRATE") {
    if (isNaN(value)) throw "OpusEnc: NaN value "+value;
    if (value < 500 || value > 512000) throw "OpusEnc: invalid value "+value;
    ptr = allocate(4, 'i32', ALLOC_STACK);
    setValue(ptr, value, 'i32');
    ret = _opus_encoder_ctl(this.ctx, 4002, ptr);
    if (ret < 0) throw 'OpusEnc: opus_encoder_ctl failed: ' + ret;
    return;
  }
  throw "OpusEnc: invalid control "+ctl;
};

OpusEncoder.prototype.destroy = function() {
  if (!this.ctx) return;
  _opus_encoder_destroy(this.ctx);
  _free(this.raw_ptr);
  _free(this.coded_ptr);
  this.ctx = null;
  this.coded_ptr = null;
  this.raw_ptr = null;
};
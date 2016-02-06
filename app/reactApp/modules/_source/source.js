function Source() {
  this.audioCtx = null;
  this.streamUrl = null;
  this.srcNode = null;
  this.procNode = null;
  this.muteNode = null;
  this.worker = null;
  this.nsamples = 1024;
}

Source.prototype.init = function(audioCtx, streamUrl, mediaStream) {
  var source;
  console.log("Source init being called");
  if (!audioCtx || isNaN(audioCtx.sampleRate)) {
    throw "Source: invalid audioCtx";
  }
  if (!streamUrl) {
    throw "Source: invalid streamUrl";
  }
  if (!mediaStream) {
    throw "Source: invalid mediaStream";
  }
  this.audioCtx = audioCtx;
  this.streamUrl = streamUrl;
  this.audioInit(mediaStream);
};

Source.prototype.audioInit = function(stream) {
  var source;
  this.srcNode = this.audioCtx.createMediaStreamSource(stream);
  if (this.srcNode.channelCount != 2) throw "Source: input is not stereo!";
  this.procNode = this.audioCtx.createScriptProcessor(this.nsamples, 2, 2);
  source = this;
  this.srcNode.connect(this.procNode);
  this.procNode.onaudioprocess = function(e) { source.audioProcess(e); };
  this.muteNode = this.audioCtx.createGain();
  this.muteNode.gain.value = 0.0;
  this.procNode.connect(this.muteNode);
  this.muteNode.connect(this.audioCtx.destination);
  console.log("audioInit executed");
};

Source.prototype.audioProcess = function(e) {
  var i;
  var j;
  var left;
  var right;
  var samples;
  left = e.inputBuffer.getChannelData(0);
  right = e.inputBuffer.getChannelData(1);
  samples = new Float32Array(2 * this.nsamples);
  for (i = j = 0; i < this.nsamples; i++) {
    samples[j++] = left[i];
    samples[j++] = right[i];
  }
  if (this.worker) this.worker.postMessage(samples, [samples.buffer]);
};

Source.prototype.start = function() {
  var source = this;
  var worker;

  worker = new Worker('/scripts/source_worker.js');
  console.log("worker available", worker);

  worker.onmessage = function(e) {
    if (e.data.init) {
      console.log("SourceWorker initialized");
      worker.postMessage({ctl: {req: "OPUS_SET_BITRATE", val: 96000}});
      source.worker = worker;
    } else if (e.data.err) {
      console.log(e.data.err);
      source.reset();
    }
  };
  worker.postMessage({setup: {rate: this.audioCtx.sampleRate,
   nsamples: this.nsamples, channels: 2, stream_url: this.streamUrl}});
};

Source.prototype.stop = function() {
  if (this.worker) {
    this.worker.postMessage({reset: true});
    this.worker.terminate();
    this.worker = null;
  }
};

Source.prototype.reset = function() {
  this.stop();
  this.muteNode.disconnect();
  this.procNode.disconnect();
  this.srcNode.disconnect();
  this.audioCtx = null;
  this.streamUrl = null;
  this.srcNode = null;
  this.procNode = null;
  this.muteNode = null;
};

module.exports = Source;
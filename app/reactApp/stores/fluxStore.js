import EventEmitter from  'events';

const CHANGE_EVENT = 'change';

export class FluxStore extends EventEmitter {
	constructor(){
		super();
	}

	emitChange() {
		console.log('emitting event..', CHANGE_EVENT );
		this.emit(CHANGE_EVENT);
	}

	addChangeListener(callback){
		console.log('Create event listener when ' + CHANGE_EVENT + ' fires.');
		this.on(CHANGE_EVENT, callback);
	}

	removeChangeListener(){
		console.log('Remove event listener: ', CHANGE_EVENT);
		this.removeListener(CHANGE_EVENT, callback);
	}
}
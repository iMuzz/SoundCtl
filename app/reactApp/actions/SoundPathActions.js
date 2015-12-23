var AppDispatcher = require('../dispatcher/AppDispatcher');

let SoundPathActions = {
	create: function(data){
		console.log('Calling dispatcher with SOUND_PATH_CREATE...')
		AppDispatcher.dispatch({
			actionType: "SOUND_PATH_CREATE",
			data: data
		})
	}
}

module.exports = SoundPathActions;
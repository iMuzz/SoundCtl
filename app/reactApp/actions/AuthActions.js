var AppDispatcher = require('../dispatcher/AppDispatcher');

let AuthActions = {
	logout: function(){
		console.log('Calling dispatcher with event LOGOUT_USER...')
		AppDispatcher.dispatch({
			actionType: "LOGOUT_USER"
		})
	}
}

module.exports = AuthActions;
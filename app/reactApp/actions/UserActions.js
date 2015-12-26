import AppDispatcher from   '../dispatcher/AppDispatcher';

let UserActions = {
	logout: function(){
		console.log('Calling dispatcher with event LOGOUT_USER...')
		AppDispatcher.dispatch({
			actionType: "LOGOUT_USER"
		})
	}
}

module.exports = UserActions;
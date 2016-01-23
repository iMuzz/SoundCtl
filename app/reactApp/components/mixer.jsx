import React from             'react';
import ReactDom from          'react-dom';
import {SoundPathStore} from    '../stores/SoundStore';

let SoundPathActions = require('../actions/SoundPathActions');

// accepts mixer path as a prop
class FaderControl extends React.Component {
	constructor(props){
		super(props);

		this.increase = this.increase.bind(this);
		this.decrease = this.decrease.bind(this);
		this._onClickHandler = this._onClickHandler.bind(this);
	}

	increase(){
		console.log('Some event happened!');
	}

	decrease(){
		station.updateFader(this.props.fader - 1, this.props.path);
	}

	_onClickHandler(){
		SoundPathActions.create({test: "hello"});
	}

	componentDidMount(){
		SoundPathStore.addChangeListener(this._onChange);
	}

	componentWillUnmount(){
		SoundPathStore.removeChangeListener(this._onChange);
	}

	// callback after data changes.. 
	_onChange(){
		console.log('Setting state with new soundPath state..');
		// set state with new data from the store...
		// this.setState(getSoundPathsState());
	}

	render(){ 
		return(
			<div className="path-wrap">
				<h4> Sound Path :: {this.props.path} :: VALUE  ::  {this.props.fader}</h4>
				<button onClick={this.increase}> +1 </button>
				<button onClick={this.decrease}> -1 </button>
				<button onClick={this._onClickHandler}> Call Action </button>
			</div>
		);
	}
}

export class Mixer extends React.Component {
	constructor(props) {
		super(props);
	}

	render(){
		let faderNodes = this.props.soundPaths.map( (currEl) => {
			return <FaderControl path={currEl.path} fader={currEl.data.afx[0].volume.fader}/>
		});

		return (
			<div> {faderNodes} </div>
		)
	}
}

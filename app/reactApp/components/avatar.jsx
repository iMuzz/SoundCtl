import React from         'react';
import ReactDom from      'react-dom';

export class Avatar extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount(){
	}

	render() {
		return (
			<div className="avatar">
				<div className="image" style={{backgroundImage: 'url(' + this.props.imageUrl + ')'}}></div>
			</div>
		);
	}
}
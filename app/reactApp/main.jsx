// var React = require('react');
// var ReactDom = require('react-dom');
import React from         'react';
import ReactDom from      'react-dom';
import $ from             'jquery';
import {Navbar} from      './components/navbar';

class Intro extends React.Component {
	render() {
		return  ( 
			<div> 
				<Navbar />
			</div> 
		);
	}
}
$(document).ready(function(){
	ReactDom.render(<Intro />, document.getElementById('main'));
});
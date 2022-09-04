import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import $ from 'jquery';
import axios from 'axios';
import crypto from 'crypto';
import { Defer, Footer, Head } from '../../molecules';

const snapConfig = require('../../../config');

export default class WrapperLogin extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		let self = this;

		if (window) {
			App.init();
		}
	}

	render() {
		return (
			<React.Fragment>
				<Head title={this.props.title} />

				<div
					id="app"
					className="app app-full-height app-without-header"
				>
					<Defer chunkSize={10}>{this.props.children}</Defer>

					{this.props.footer && <Footer />}
				</div>
			</React.Fragment>
		);
	}
}

import React, { useContext } from 'react';
import Link from 'next/link';
import $ from 'jquery';
import axios from 'axios';
import crypto from 'crypto';
import moment from 'moment';

import { Wrapper } from '../components';
import { getProfile, loggedIn } from '../helper';

const snapConfig = require('../config');
// const Auth = new AuthServices();

export default class extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			login: 0,
			user: null,
		};
	}

	componentDidMount() {
		let self = this;

		if (loggedIn()) {
			this.setState({
				login: 1,
				user: getProfile(),
			});
		}
	}

	render() {
		return (
			<Wrapper
				{...this.props}
				title="Dashboard"
				module="User"
				permission="read"
				header={true}
				footer={true}
			>
				{this.state.login == 1 && (
					<React.Fragment>
						<ul className="breadcrumb">
							<li className="breadcrumb-item">
								<Link
									href="/dashboard"
									as="/dashboard"
									passHref
								>
									<a href="/dashboard">GKUBE</a>
								</Link>
							</li>
							<li className="breadcrumb-item active">
								Dashboard
							</li>
						</ul>
						<h1 className="page-header">
							Welcome To GKUBE{' '}
							<small>The way the world runs Kubernetes.</small>
						</h1>
						<p>
							To get you started we have auto-detected your
							clusters in your kubeconfig file and added them to
							the catalog, your centralized view for managing all
							your cloud-native resources.
						</p>
					</React.Fragment>
				)}
			</Wrapper>
		);
	}
}

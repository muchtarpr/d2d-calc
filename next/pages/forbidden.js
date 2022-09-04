import React, { useContext } from 'react';
import Link from 'next/link';
import $ from 'jquery';
import axios from 'axios';
import crypto from 'crypto';
import { Wrapper } from '../components';
import { getProfile, loggedIn } from '../helper';

const snapConfig = require('../config');
// const Auth = new AuthServices();

export default class Forbidden extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			login: 0,
			user: null,
		};
	}

	componentDidMount() {
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
				title="Forbidden"
				module="User"
				permission="read"
				header={true}
				footer={true}
			>
				<div className="error-page">
					<div className="error-page-content">
						<div
							className="card mb-5 mx-auto"
							style={{ maxWidth: '320px' }}
						>
							<div className="card-body">
								<div className="card">
									<div className="error-code">403</div>
									<div className="card-arrow">
										<div className="card-arrow-top-left"></div>
										<div className="card-arrow-top-right"></div>
										<div className="card-arrow-bottom-left"></div>
										<div className="card-arrow-bottom-right"></div>
									</div>
								</div>
							</div>
							<div className="card-arrow">
								<div className="card-arrow-top-left"></div>
								<div className="card-arrow-top-right"></div>
								<div className="card-arrow-bottom-left"></div>
								<div className="card-arrow-bottom-right"></div>
							</div>
						</div>
						<h1>Oops!</h1>
						<h3>Sorry...You cannot access this module</h3>
					</div>
				</div>
			</Wrapper>
		);
	}
}

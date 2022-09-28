import React, { useContext } from 'react';
import Link from 'next/link';
import $ from 'jquery';

import { Wrapper } from '../../../../components';
import Table from '../table';
import { getProfile, loggedIn } from '../../../../helper';

const snapConfig = require('../../../../config');
// const Auth = new AuthServices();

export default class extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			login: 0,
			user: null,
			info: false,
			infoStatus: '',
			infoMessage: '',
		};

		this.flashInfo = this.flashInfo.bind(this);
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

	flashInfo(status, message) {
		$('.error-bar').delay(1000).show();

		if (status == 'success') {
			this.setState({
				info: true,
				infoStatus: 'alert alert-solid alert-info error-bar',
				infoMessage: message,
			});
		} else {
			this.setState({
				info: true,
				infoStatus: 'alert alert-solid alert-danger error-bar',
				infoMessage: message,
			});
		}

		$('.error-bar').delay(2000).fadeOut();
	}

	render() {
		return (
			<Wrapper
				{...this.props}
				title="Roles"
				module="Role"
				permission="read"
				header={true}
				footer={true}
			>
				{this.state.login == 1 && (
					<React.Fragment>
						<div className="d-flex align-items-center mb-md-3 mb-2">
							<div className="flex-fill">
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
										Roles
									</li>
								</ul>
								<h1 className="page-header">List Roles</h1>
							</div>
							<div className="ms-auto">
								<Link
									href="/module/role/create"
									as="/role/create"
									passHref
								>
									<a
										href="/role/create"
										className="btn btn-outline-theme"
									>
										<i className="fa fa-plus-circle me-1"></i>{' '}
										Add
									</a>
								</Link>
							</div>
						</div>

						<div id="datatable" className="mb-5">
							{this.state.info && (
								<div className={this.state.infoStatus}>
									{this.state.infoMessage}
								</div>
							)}

							<Table flashInfo={this.flashInfo} />
						</div>
					</React.Fragment>
				)}
			</Wrapper>
		);
	}
}

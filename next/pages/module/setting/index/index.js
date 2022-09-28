import React, { useContext } from 'react';
import Link from 'next/link';
import $ from 'jquery';
import axios from 'axios';
import crypto from 'crypto';

import { Wrapper } from '../../../../components';
import { getProfile, loggedIn } from '../../../../helper';

const snapConfig = require('../../../../config');
// const Auth = new AuthServices();

export default class extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			login: 0,
			user: null,
			generals: null,
			info: false,
			infoStatus: '',
			infoMessage: '',
		};

		this.showEdit = this.showEdit.bind(this);
		this.changeGenerals = this.changeGenerals.bind(this);
		this.encryptString = this.encryptString.bind(this);
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

		axios({
			url: snapConfig.BASE_API_URL + '/setting/get-by-group',
			method: 'POST',
			data: {
				groups: 'general',
			},
			timeout: snapConfig.TIMEOUT,
		}).then(function (response) {
			if (response.data.code == '2000') {
				self.setState({
					generals: response.data.data,
				});
			}
		});
	}

	showEdit(e, id) {
		if (e.target.innerText == 'Edit') {
			$('#edit-button-' + id).text('Close');
		} else {
			$('#edit-button-' + id).text('Edit');
		}
		$('#edit-text-' + id).toggle();
		$('#edit-input-' + id).toggle();
	}

	changeGenerals(e, idx, id, type) {
		let self = this;

		let generals = this.state.generals;
		generals[idx]['value'] = e.target.value;

		if (type == 'blur') {
			axios({
				url:
					snapConfig.BASE_API_URL +
					'/setting/update/' +
					self.encryptString(id),
				method: 'POST',
				data: {
					groups: 'general',
					options: e.target.name,
					value: e.target.value,
				},
				timeout: snapConfig.TIMEOUT,
			})
				.then(function (response) {
					if (response.data.code == '2000') {
						self.flashInfo('success', response.data.message);
					} else {
						self.flashInfo('error', response.data.message);
					}
				})
				.catch((e) => {
					self.flashInfo('error', e.message);
				});
		}

		this.setState({ generals: generals });
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

	encryptString(string) {
		let iv = crypto.randomBytes(16);
		let cipher = crypto.createCipheriv(
			'aes-256-cbc',
			snapConfig.APP_KEY,
			iv,
		);
		let cipherText = cipher.update(string.toString(), 'utf8', 'hex');
		cipherText += cipher.final('hex');
		cipherText = iv.toString('hex') + cipherText;

		return cipherText;
	}

	formatName(string) {
		return string.replace(/_/g, ' ');
	}

	render() {
		return (
			<Wrapper
				{...this.props}
				title="Settings"
				module="Setting"
				permission="read"
				header={true}
				footer={true}
			>
				{this.state.login == 1 && (
					<React.Fragment>
						<div className="container">
							<div className="row justify-content-center">
								<div className="col-md-12">
									<div className="row">
										<div className="col-xl-9">
											<div className="d-flex align-items-center mb-md-3 mb-2">
												<div className="flex-fill">
													<ul className="breadcrumb">
														<li className="breadcrumb-item">
															<Link
																href="/dashboard"
																as="/dashboard"
																passHref
															>
																<a href="/dashboard">
																	GKUBE
																</a>
															</Link>
														</li>
														<li className="breadcrumb-item active">
															Settings
														</li>
													</ul>
													<h1 className="page-header">
														List Settings
													</h1>
												</div>
											</div>

											{this.state.info && (
												<div
													className={
														this.state.infoStatus
													}
												>
													{this.state.infoMessage}
												</div>
											)}

											<div id="general" className="mb-5">
												<h4>
													<i className="far fa-user fa-fw text-theme"></i>{' '}
													General
												</h4>
												<p></p>
												<div className="card">
													{this.state.generals && (
														<div className="list-group list-group-flush">
															{this.state.generals.map(
																(data, i) => {
																	return (
																		<div
																			className="list-group-item d-flex align-items-center"
																			key={
																				i
																			}
																		>
																			<div
																				id={
																					'edit-text-' +
																					data.id
																				}
																				className="flex-1 text-break"
																			>
																				<div className="text-capitalize">
																					{this.formatName(
																						data.options,
																					)}
																				</div>
																				<div class="text-white text-opacity-50">
																					{
																						data.value
																					}
																				</div>
																			</div>
																			<div
																				id={
																					'edit-input-' +
																					data.id
																				}
																				className="flex-1 text-break"
																				style={{
																					display:
																						'none',
																				}}
																			>
																				<input
																					type="text"
																					className="form-control"
																					name={
																						data.options
																					}
																					value={
																						data.value
																					}
																					onChange={(
																						e,
																					) =>
																						this.changeGenerals(
																							e,
																							i,
																							data.id,
																							'change',
																						)
																					}
																					onBlur={(
																						e,
																					) =>
																						this.changeGenerals(
																							e,
																							i,
																							data.id,
																							'blur',
																						)
																					}
																				/>
																			</div>
																			<div className="w-100px">
																				<button
																					type="button"
																					id={
																						'edit-button-' +
																						data.id
																					}
																					class="btn btn-outline-default w-100px"
																					onClick={(
																						e,
																					) =>
																						this.showEdit(
																							e,
																							data.id,
																						)
																					}
																				>
																					Edit
																				</button>
																			</div>
																		</div>
																	);
																},
															)}
														</div>
													)}
													<div className="card-arrow">
														<div className="card-arrow-top-left"></div>
														<div className="card-arrow-top-right"></div>
														<div className="card-arrow-bottom-left"></div>
														<div className="card-arrow-bottom-right"></div>
													</div>
												</div>
											</div>
										</div>
										<div className="col-xl-3">
											<nav
												id="sidebar-bootstrap"
												className="navbar navbar-sticky d-none d-xl-block"
											>
												<nav className="nav">
													<a
														className="nav-link active"
														href="#general"
														data-toggle="scroll-to"
													>
														General
													</a>
												</nav>
											</nav>
										</div>
									</div>
								</div>
							</div>
						</div>
					</React.Fragment>
				)}
			</Wrapper>
		);
	}
}

import React, { useContext } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import $ from 'jquery';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';
import _lo from 'lodash';

import { Wrapper } from '../../../components';
import { getProfile, loggedIn } from '../../../helper';

const snapConfig = require('../../../config');
// const Auth = new AuthServices();

const RoleSchema = Yup.object().shape({
	role_title: Yup.string()
		.min(3, 'Too Short!')
		.max(100, 'Too Long!')
		.required('Required'),
	role_slug: Yup.string()
		.min(3, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Required'),
	role_access: Yup.array().required('Required'),
});

export default class extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			login: 0,
			user: null,
			moduleList: null,
			indexNo: -1,
			info: false,
			infoStatus: '',
			infoMessage: '',
		};

		this.moduleGrouped = this.moduleGrouped.bind(this);
		this.strToCapitalized = this.strToCapitalized.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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
			url: snapConfig.BASE_API_URL + '/role/get-module-list',
			method: 'POST',
			timeout: snapConfig.TIMEOUT,
		}).then(function (response) {
			if (response.data.code == '2000') {
				let moduleList = self.moduleGrouped(response.data.data);

				self.setState({
					moduleList: moduleList,
				});

				$('#checkallrole').on('click', function () {
					$('#table-role input:checkbox')
						.not(this)
						.prop('checked', this.checked);
				});
			}
		});
	}

	moduleGrouped(datas) {
		let moduleList = [];
		let modules = [];
		let sidebarMenu = document.getElementById('sidebar');
		let items = sidebarMenu.getElementsByClassName('menu-item');

		for (let item of items) {
			let menu = item
				.getElementsByClassName('menu-link')[0]
				.getElementsByClassName('menu-text')[0].innerHTML;
			let itemParent = {};
			let itemChilds = item.getElementsByTagName('a');

			let itemParents = [];
			for (let itemChild of itemChilds) {
				let itemChildComponent = itemChild.getAttribute('href');
				if (itemChildComponent && itemChildComponent != '#') {
					itemChild.component =
						this.strToCapitalized(itemChildComponent);
					itemParents.push({
						component: itemChild.component,
						create: 0,
						read: 0,
						update: 0,
						delete: 0,
					});
					modules.push({
						component: itemChild.component,
						create: 0,
						read: 0,
						update: 0,
						delete: 0,
					});
				}
			}

			itemParents = _lo.sortBy(itemParents, ['component']);
			itemParents = _lo
				.chain(itemParents)
				.groupBy('component')
				.map(function (v, i) {
					return v;
				})
				.value();

			if (menu != 'Dashboard') {
				itemParent.component = menu;
				itemParent.items = itemParents;
				moduleList.push(itemParent);
			}
		}

		let itemOthers = [];
		for (let data of datas) {
			let isExistMenu = _lo.find(modules, { component: data });

			if (!isExistMenu) {
				itemOthers.push([{ component: data }]);
			}
		}

		moduleList.push({
			component: 'Others',
			items: _lo.sortBy(itemOthers, ['component']),
		});

		return moduleList;
	}

	strToCapitalized(str) {
		let split1 = str.split('/');
		let split2 = '';
		if (split1.length > 1) {
			split2 = split1[1].split('-');
		} else {
			split2 = split1[0].split('-');
		}
		for (let i = 0; i < split2.length; i++) {
			split2[i] = split2[i].charAt(0).toUpperCase() + split2[i].slice(1);
		}
		return split2.join('');
	}

	handleSubmit(e) {
		e.preventDefault();

		let self = this;
		$('.error-bar').delay(1000).show();
		$('.error-bar-valid').delay(1000).show();

		let data = new FormData(e.target);

		axios({
			url: snapConfig.BASE_API_URL + '/role/create',
			method: 'POST',
			data: data,
			timeout: snapConfig.TIMEOUT,
		})
			.then(function (response) {
				setSubmitting(false);
				if (response.data.code == '2000') {
					self.flashInfo('success', response.data.message);

					Router.push('/module/role/index', '/role');
				} else {
					self.flashInfo('error', response.data.message);

					self.setState({
						errorMessage: response.data.data,
					});

					$('.error-bar-valid').delay(2000).fadeOut();
				}
			})
			.catch(function (e) {
				setSubmitting(false);
				self.flashInfo('error', e.response.data.message);

				self.setState({
					errorMessage: e.response.data.data,
				});

				$('.error-bar-valid').delay(2000).fadeOut();
			});
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
				title="Create Role"
				module="Role"
				permission="create"
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
									<li className="breadcrumb-item">
										<Link
											href="/module/role/index"
											as="/role"
											passHref
										>
											<a href="/role">Roles</a>
										</Link>
									</li>
									<li className="breadcrumb-item active">
										Create
									</li>
								</ul>
								<h1 className="page-header">Create Role</h1>
							</div>
							<div className="ms-auto">
								<Link
									href="/module/role/index"
									as="/role"
									passHref
								>
									<a
										href="/role"
										className="btn btn-outline-theme"
									>
										<i className="fa fa-angle-left me-1"></i>{' '}
										Back
									</a>
								</Link>
							</div>
						</div>

						<div className="card">
							<div className="card-body">
								{this.state.info && (
									<div className={this.state.infoStatus}>
										{this.state.infoMessage}
									</div>
								)}

								{this.state.errorMessage && (
									<div className="alert alert-solid alert-warning error-bar-valid">
										{Object.keys(
											this.state.errorMessage,
										).map((key) => {
											return (
												<React.Fragment key={key}>
													<span>
														{
															this.state
																.errorMessage[
																key
															]
														}
													</span>
													<br />
												</React.Fragment>
											);
										})}
									</div>
								)}

								<form onSubmit={this.handleSubmit}>
									<div className="row">
										<div className="col-md-6">
											<div className="form-group mb-3">
												<label
													className="form-label"
													htmlFor="role_title"
												>
													Title
												</label>
												<input
													type="text"
													name="role_title"
													id="role_title"
													className="form-control"
												/>
											</div>
										</div>
										<div className="col-md-6">
											<div className="form-group mb-3">
												<label
													className="form-label"
													htmlFor="role_slug"
												>
													Slug
												</label>
												<input
													type="text"
													name="role_slug"
													id="role_slug"
													className="form-control"
												/>
											</div>
										</div>
										{this.state.moduleList && (
											<div className="col-md-12">
												<div className="form-group">
													<label
														className="form-label"
														htmlFor="role_title"
													>
														Access
													</label>
													<div className="table-responsive">
														<table
															id="table-role"
															className="table table-striped table-bordered"
															width="100%"
															cellSpacing="0"
														>
															<thead>
																<tr>
																	<th className="text-center">
																		Module
																	</th>
																	<th className="text-center">
																		Create
																	</th>
																	<th className="text-center">
																		Read
																	</th>
																	<th className="text-center">
																		Update
																	</th>
																	<th className="text-center">
																		Delete
																	</th>
																</tr>
															</thead>
															<tbody>
																{this.state.moduleList.map(
																	(
																		data,
																		i,
																	) => {
																		return (
																			<React.Fragment
																				key={
																					i
																				}
																			>
																				<tr>
																					<td className="text-left">
																						<b>
																							{
																								data.component
																							}
																						</b>
																					</td>
																					<td></td>
																					<td></td>
																					<td></td>
																					<td></td>
																				</tr>
																				{data
																					.items
																					.length >
																					0 && (
																					<React.Fragment>
																						{data.items.map(
																							(
																								data2,
																								j,
																							) => {
																								this
																									.state
																									.indexNo++;
																								return (
																									<tr
																										key={
																											j
																										}
																									>
																										<td className="text-left pd-l-20-force">
																											<input
																												name={
																													'role_access[' +
																													this
																														.state
																														.indexNo +
																													'][component]'
																												}
																												value={
																													data2[0]
																														.component
																												}
																												type="hidden"
																											/>

																											-{' '}
																											{
																												data2[0]
																													.component
																											}
																										</td>
																										<td className="text-center">
																											<input
																												name={
																													'role_access[' +
																													this
																														.state
																														.indexNo +
																													'][create]'
																												}
																												value="1"
																												type="checkbox"
																											/>
																										</td>
																										<td className="text-center">
																											<input
																												name={
																													'role_access[' +
																													this
																														.state
																														.indexNo +
																													'][read]'
																												}
																												value="1"
																												type="checkbox"
																											/>
																										</td>
																										<td className="text-center">
																											<input
																												name={
																													'role_access[' +
																													this
																														.state
																														.indexNo +
																													'][update]'
																												}
																												value="1"
																												type="checkbox"
																											/>
																										</td>
																										<td className="text-center">
																											<input
																												name={
																													'role_access[' +
																													this
																														.state
																														.indexNo +
																													'][delete]'
																												}
																												value="1"
																												type="checkbox"
																											/>
																										</td>
																									</tr>
																								);
																							},
																						)}
																					</React.Fragment>
																				)}
																			</React.Fragment>
																		);
																	},
																)}
															</tbody>
															<tfoot>
																<tr>
																	<td
																		colSpan="5"
																		className="text-center"
																	>
																		<label htmlFor="checkallrole">
																			<input
																				id="checkallrole"
																				type="checkbox"
																			/>{' '}
																			Select
																			All
																		</label>
																	</td>
																</tr>
															</tfoot>
														</table>
													</div>
												</div>
											</div>
										)}
									</div>
									<button
										type="submit"
										className="btn btn-success"
									>
										Submit
									</button>
								</form>
							</div>
							<div className="card-arrow">
								<div className="card-arrow-top-left"></div>
								<div className="card-arrow-top-right"></div>
								<div className="card-arrow-bottom-left"></div>
								<div className="card-arrow-bottom-right"></div>
							</div>
						</div>
					</React.Fragment>
				)}
			</Wrapper>
		);
	}
}

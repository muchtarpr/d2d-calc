import React, { useContext } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import $ from 'jquery';
import axios from 'axios';
import crypto from 'crypto';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Wrapper } from '../../../components';
import { getProfile, loggedIn } from '../../../helper';

const snapConfig = require('../../../config');
// const Auth = new AuthServices();

const UserSchema = Yup.object().shape({
	fullname: Yup.string()
		.min(5, 'Too Short!')
		.max(100, 'Too Long!')
		.required('Required'),
	username: Yup.string()
		.min(5, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Required'),
	email: Yup.string().email('Invalid email').required('Required'),
	user_type: Yup.number().required('Required'),
	user_role: Yup.number().required('Required'),
});

export default class extends React.Component {
	static async getInitialProps({ req, res, query }) {
		let id = query ? query.id : '0';

		return { id };
	}

	constructor(props) {
		super(props);

		this.state = {
			login: 0,
			user: null,
			id: this.props.id,
			roles: null,
			edit: null,
			info: false,
			infoStatus: '',
			infoMessage: '',
		};

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
			url: snapConfig.BASE_API_URL + '/role/get-role',
			method: 'POST',
			data: {},
			timeout: snapConfig.TIMEOUT,
		}).then(function (response) {
			if (response.data.code == '2000') {
				self.setState({
					roles: response.data.data,
				});
			} else {
				self.flashInfo('error', response.data.message);
			}
		});

		axios({
			url: snapConfig.BASE_API_URL + '/user/edit',
			method: 'POST',
			data: {
				id: self.state.id,
			},
			timeout: snapConfig.TIMEOUT,
		}).then(function (response) {
			if (response.data.code == '2000') {
				self.setState({
					edit: response.data.data,
				});
			} else {
				self.flashInfo('error', response.data.message);
			}
		});
	}

	handleSubmit(data, setSubmitting) {
		let self = this;
		$('.error-bar').delay(1000).show();
		$('.error-bar-valid').delay(1000).show();

		data.user_type = parseInt(data.user_type);
		data.user_role = parseInt(data.user_role);

		axios({
			url: snapConfig.BASE_API_URL + '/user/update/' + self.state.id,
			method: 'POST',
			data: data,
			timeout: snapConfig.TIMEOUT,
		})
			.then(function (response) {
				setSubmitting(false);
				if (response.data.code == '2000') {
					self.flashInfo('success', response.data.message);

					Router.push('/module/user/index', '/user');
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
				title="Edit User"
				module="User"
				permission="update"
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
											href="/module/user/index"
											as="/user"
											passHref
										>
											<a href="/user">Users</a>
										</Link>
									</li>
									<li className="breadcrumb-item active">
										Edit
									</li>
								</ul>
								<h1 className="page-header">Edit User</h1>
							</div>
							<div className="ms-auto">
								<Link
									href="/module/user/index"
									as="/user"
									passHref
								>
									<a
										href="/user"
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

								{this.state.edit && (
									<Formik
										initialValues={{
											fullname: this.state.edit.fullname,
											username: this.state.edit.username,
											email: this.state.edit.email,
											password: '',
											user_type:
												this.state.edit.user_type,
											user_role:
												this.state.edit.user_role,
										}}
										validationSchema={UserSchema}
										onSubmit={(
											values,
											{ setSubmitting },
										) => {
											this.handleSubmit(
												values,
												setSubmitting,
											);
										}}
									>
										{({
											values,
											errors,
											touched,
											handleChange,
											handleBlur,
											handleSubmit,
											isSubmitting,
										}) => (
											<form onSubmit={handleSubmit}>
												<div className="row">
													<div className="col-md-6">
														<div className="form-group mb-3">
															<label
																className="form-label"
																htmlFor="fullname"
															>
																Fullname
															</label>
															<input
																type="text"
																name="fullname"
																id="fullname"
																className="form-control"
																onChange={
																	handleChange
																}
																onBlur={
																	handleBlur
																}
																value={
																	values.fullname
																}
															/>
															{touched.fullname &&
																errors.fullname && (
																	<div className="invalid-feedback invalid-formik">
																		{
																			errors.fullname
																		}
																	</div>
																)}
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group mb-3">
															<label
																className="form-label"
																htmlFor="username"
															>
																Username
															</label>
															<input
																type="text"
																name="username"
																id="username"
																className="form-control"
																onChange={
																	handleChange
																}
																onBlur={
																	handleBlur
																}
																value={
																	values.username
																}
															/>
															{touched.username &&
																errors.username && (
																	<div className="invalid-feedback invalid-formik">
																		{
																			errors.username
																		}
																	</div>
																)}
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group mb-3">
															<label
																className="form-label"
																htmlFor="email"
															>
																Email
															</label>
															<input
																type="text"
																name="email"
																id="email"
																className="form-control"
																onChange={
																	handleChange
																}
																onBlur={
																	handleBlur
																}
																value={
																	values.email
																}
															/>
															{touched.email &&
																errors.email && (
																	<div className="invalid-feedback invalid-formik">
																		{
																			errors.email
																		}
																	</div>
																)}
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group mb-3">
															<label
																className="form-label"
																htmlFor="password"
															>
																Password
															</label>
															<input
																type="password"
																name="password"
																id="password"
																className="form-control"
																onChange={
																	handleChange
																}
																onBlur={
																	handleBlur
																}
																value={
																	values.password
																}
															/>
															{touched.password &&
																errors.password && (
																	<div className="invalid-feedback invalid-formik">
																		{
																			errors.password
																		}
																	</div>
																)}
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group mb-3">
															<label
																className="form-label"
																htmlFor="user_type"
															>
																Type
															</label>
															<select
																name="user_type"
																id="user_type"
																className="form-select"
																onChange={
																	handleChange
																}
																onBlur={
																	handleBlur
																}
																value={
																	values.user_type
																}
															>
																<option value="1">
																	Employee
																</option>
																<option value="2">
																	Management
																</option>
															</select>
															{touched.user_type &&
																errors.user_type && (
																	<div className="invalid-feedback invalid-formik">
																		{
																			errors.user_type
																		}
																	</div>
																)}
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group mb-3">
															<label
																className="form-label"
																htmlFor="user_role"
															>
																Role
															</label>
															<select
																name="user_role"
																id="user_role"
																className="form-select"
																onChange={
																	handleChange
																}
																onBlur={
																	handleBlur
																}
																value={
																	values.user_role
																}
															>
																{this.state
																	.roles && (
																	<React.Fragment>
																		{this.state.roles.map(
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
																						<option
																							value={
																								data.value
																							}
																						>
																							{
																								data.label
																							}
																						</option>
																					</React.Fragment>
																				);
																			},
																		)}
																	</React.Fragment>
																)}
															</select>
															{touched.user_role &&
																errors.user_role && (
																	<div className="invalid-feedback invalid-formik">
																		{
																			errors.user_role
																		}
																	</div>
																)}
														</div>
													</div>
												</div>
												<button
													type="submit"
													className="btn btn-success"
													disabled={isSubmitting}
												>
													Submit
												</button>
											</form>
										)}
									</Formik>
								)}
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

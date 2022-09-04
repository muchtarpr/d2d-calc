import React, { useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import $ from 'jquery';
import axios from 'axios';
import crypto from 'crypto';

import { Defer, Footer, Head, Header } from '../../molecules';

const snapConfig = require('../../../config');

const Wrapper = ({
	props,
	title,
	desc,
	header = true,
	headerImage,
	footer,
	footerComponent,
	additionalStyleContent,
	additionalClassNameContent,
	additionalHeaderComponent,
	data,
	coachmarkHeaderData = null,
	children,
	isOverlay,
	onClickHeaderTitle = () => {},
	onClickBack = null,
	isDataEmpty = false,
}) => {
	useEffect(() => {
		if (window) {
			App.init();
		}
	}, []);

	useEffect(() => {}, [coachmarkHeaderData]);

	// axios({
	// 	url: snapConfig.BASE_API_URL + '/check-login',
	// 	method: 'POST',
	// 	timeout: snapConfig.TIMEOUT
	// }).then(function (response) {
	// 	if (response.data.code == '200') {
	// 		const user = localStorage.getItem('user')

	// 		if(user) {
	// 			let contents = Buffer.from(user, 'hex')
	// 			let iv = contents.slice(0, 16)
	// 			let textBytes = contents.slice(16)
	// 			let decipher = crypto.createDecipheriv('aes-256-cbc', snapConfig.APP_KEY, iv)
	// 			let decrypted = decipher.update(textBytes, 'hex', 'utf8')
	// 			decrypted += decipher.final('utf8')

	// 			self.setState({
	// 				user: JSON.parse(decrypted)
	// 			})
	// 		}

	// 		self.checkAuth()
	// 	} else {
	// 		localStorage.removeItem('user')

	// 		Router.push({
	// 			pathname: '/'
	// 		})
	// 	}
	// })

	// checkAuth() {
	// 	let self = this;

	// 	axios({
	// 		url: snapConfig.BASE_API_URL + '/check-auth',
	// 		method: 'POST',
	// 		data: {
	// 			module: props.module,
	// 			permission: props.permission,
	// 		},
	// 		timeout: snapConfig.TIMEOUT,
	// 	}).then(function (response) {
	// 		if (response.data.code == '4003') {
	// 			Router.push({
	// 				pathname: '/forbidden',
	// 			});
	// 		}
	// 	});
	// }

	return (
		<React.Fragment>
			<Head title={title} />

			<div
				id="app"
				style={{
					height: '100vh',
					width: '100%',
					overflow: 'hidden',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				{header && (
					<div>
						<Header
							title={title}
							desc={desc}
							headerImage={headerImage}
							data={data}
							coachmarkHeaderData={coachmarkHeaderData ?? null}
							onClickHeaderTitle={onClickHeaderTitle}
							onClickBack={onClickBack}
						/>
						{additionalHeaderComponent}
					</div>
				)}

				<Defer chunkSize={10}>
					<div
						id="content"
						className={additionalClassNameContent}
						style={{
							flex: 1,
							overflowY: !isOverlay ? 'scroll' : 'hidden',
							...additionalStyleContent,
						}}
					>
						{!isDataEmpty && children}
					</div>
				</Defer>

				{footer ? (
					<div id="footer">
						{footerComponent ? footerComponent : <Footer />}
					</div>
				) : null}

				{isOverlay && (
					<div
						style={{
							position: 'absolute',
							top: 0,
							bottom: 0,
							left: 0,
							right: 0,
							backgroundColor: 'rgba(0, 0, 0, 0.8)',
							zIndex: 1,
						}}
					/>
				)}
			</div>
		</React.Fragment>
	);
};

export default Wrapper;

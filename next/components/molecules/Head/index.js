import React from 'react';
import NextHead from 'next/head';
import { string } from 'prop-types';
import $ from 'jquery';
import crypto from 'crypto';
import axios from 'axios';

const defaultTitle = 'Teleconsultation';
const defaultDescription = 'Teleconsultation';
const defaultKeyword = 'Teleconsultation';

export default class Head extends React.Component {
	constructor(props) {
		super(props);
	}

	static propTypes = {
		title: string,
		description: string,
		keyword: string,
	};

	componentDidMount() {
		let self = this;
	}

	render() {
		const props = this.props;

		return (
			<NextHead>
				<meta charSet="UTF-8" />
				<title>
					{(props.title ?? '') + ' - D2D Calculator' ||
						defaultTitle}
				</title>
				<meta
					name="description"
					content={
						props.description || props.title
							? props.title + ' - ' + defaultDescription
							: defaultDescription
					}
				/>
				<meta
					name="keywords"
					content={props.keywords || defaultKeyword}
				/>
				<meta name="author" content="PT. GUE" />
				<meta name="HandheldFriendly" content="true" />
				<meta name="language" content="ID" />
				<meta name="revisit-after" content="7" />
				<meta name="webcrawlers" content="all" />
				<meta name="rating" content="general" />
				<meta name="spiders" content="all" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
				/>
				<meta name="google-site-verification" content="" />
				<meta name="msapplication-tap-highlight" content="no" />
				<meta name="mobile-web-app-capable" content="yes" />
				<meta name="application-name" content="Teleconsultation" />
				<meta name="theme-color" content="#ffffff" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta
					name="apple-mobile-web-app-status-bar-style"
					content="black-translucent"
				/>
				<meta
					name="apple-mobile-web-app-title"
					content="Teleconsultation"
				/>
				<meta
					name="apple-mobile-web-app-status-bar-style"
					content="#ffffff"
				/>
				<meta
					property="og:title"
					content={props.title || defaultTitle}
				/>
				<meta
					property="og:description"
					content={
						props.description || props.title
							? props.title + ' - ' + defaultDescription
							: defaultDescription
					}
				/>
				<meta property="og:site_name" content="Teleconsultation" />

				<link
					rel="apple-touch-icon"
					href="/assets/img/logo-129x129.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="129x129"
					href="/assets/img/logo-129x129.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="114x114"
					href="/assets/img/logo-114x114.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="120x120"
					href="/assets/img/logo-120x120.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="192x192"
					href="/assets/img/logo-192x192.png"
				/>
				<link rel="shortcut icon" href="/assets/img/favicon.png" />

				<link href="/assets/css/vendor.min.css" rel="stylesheet" />
				<link href="/assets/css/app.min.css" rel="stylesheet" />
				<link href="/assets/css/main.css" rel="stylesheet" />
				<link href="/assets/css/customStyle.css" rel="stylesheet" />

				<link
					href="/assets/plugins/datatables.net-bs5/css/dataTables.bootstrap5.min.css"
					rel="stylesheet"
				/>
				<link
					href="/assets/plugins/datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css"
					rel="stylesheet"
				/>
				<link
					href="/assets/plugins/datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css"
					rel="stylesheet"
				/>

				<link
					rel="dns-prefetch"
					href="//goapotik.oss-ap-southeast-5.aliyuncs.com"
				/>
				<link rel="dns-prefetch" href="//www.google-analytics.com" />
				<link rel="dns-prefetch" href="//www.googletagmanager.com" />
				<link rel="dns-prefetch" href="//fonts.googleapis.com" />
				<link rel="manifest" href="/manifest.json" />
				<link rel="manifest" href="/manifest.webmanifest" />

				<link
					rel="stylesheet"
					href="https://unpkg.com/react-spring-bottom-sheet/dist/style.css"
					crossoOrigin="anonymous"
				/>

				<script
					dangerouslySetInnerHTML={{
						__html: `
					window.addEventListener('DOMContentLoaded', () => {
						App.init();
					});
				`,
					}}
				></script>
			</NextHead>
		);
	}
}

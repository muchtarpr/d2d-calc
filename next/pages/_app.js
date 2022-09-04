import React from 'react';
import App from 'next/app';
import { ErrorBoundary } from '../components';
import { wrapper } from '../redux/next-store-wrapper';

class MyApp extends App {
	constructor(props) {
		super(props);
	}

	render() {
		const { Component, pageProps } = this.props;
		return (
			<ErrorBoundary>
				<Component {...pageProps} />
			</ErrorBoundary>
		);
	}
}

export default wrapper.withRedux(MyApp);

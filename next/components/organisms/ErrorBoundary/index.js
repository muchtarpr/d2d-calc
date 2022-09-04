import React from 'react';
import { Head } from '../../molecules';

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);

		// Define a state variable to track whether is an error or not
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		// You can use your own error logging service here
		console.log({ error, errorInfo });
	}

	render() {
		// Check if the error is thrown
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return (
				<React.Fragment>
					<Head title="Error - Error Boundary" />

					<div className="error-page">
						<div className="error-page-content">
							<div
								className="card mb-5 mx-auto"
								style={{ maxWidth: '320px' }}
							>
								<div className="card-body">
									<div className="card">
										<div className="error-code">404</div>
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
							<h3>
								We can't seem to find the page you're looking
								for
							</h3>
						</div>
					</div>
				</React.Fragment>
			);
		}

		// Return children components in case of no error
		return this.props.children;
	}
}

export default ErrorBoundary;

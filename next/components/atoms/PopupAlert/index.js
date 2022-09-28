import React, { useEffect } from 'react';
import { Alert, Input } from 'reactstrap';

const PopupAlert = ({
	className,
	timeout = 3000,
	alertMessage = '',
	setAlertMessage = () => {},
}) => {
	useEffect(() => {
		if (alertMessage) {
			setTimeout(() => {
				setAlertMessage('');
			}, timeout);
		}
	}, [alertMessage]);

	return (
		alertMessage && (
			<div className={'absolute-bottom-16  ' + className}>
				<Alert color="danger" toggle={() => setAlertMessage('')}>
					<p className="mg-b-0">{alertMessage}</p>
				</Alert>
			</div>
		)
	);
};
export default PopupAlert;

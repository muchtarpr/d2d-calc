import React, { useEffect, useState } from 'react';
import { IconTimeGreen, Icon, IconTimeRed } from '../../../assets';
import { getFormattedTimeFromSeconds } from '../../../helper';

const CountdownTimerBar = ({
	data,
	duration = null,
	setTimeLeft = () => {},
}) => {
	const [time, setTime] = useState();

	useEffect(() => {
		setTime(duration);
	}, [duration]);

	useEffect(() => {
		if (duration != null && time != null) {
			if (time > 0) {
				updateTimeLeft();
			} else {
				setTimeLeft(0);
			}
		}
	}, [time]);

	const updateTimeLeft = () => {
		setTimeout(() => setTime(time - 1), 1000);
	};

	return (
		<div
			className={
				'd-flex flex-1 pd-x-16 pd-y-12 ' +
				(time < 60 ? 'box-light-red' : 'box-light-green')
			}
		>
			{time < 60 ? <IconTimeRed /> : <IconTimeGreen />}
			<p
				className={
					'tx-countdown tx-roboto-medium font-16 mg-l-16 flex-1 ' +
					(time < 60 && 'tx-countdown-end')
				}
			>
				{time == 0
					? 'Telekonsultasi telah berakhir'
					: time < 60
					? 'Telekonsultasi akan berakhir'
					: 'Durasi Telekonsultasi'}
			</p>
			{time > 0 && (
				<p
					className={
						'tx-countdown tx-roboto-medium font-16 flex-0 ' +
						(time < 60 && 'tx-countdown-end')
					}
				>
					{getFormattedTimeFromSeconds(time)}
				</p>
			)}
		</div>
	);
};

export default CountdownTimerBar;

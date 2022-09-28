import moment from 'moment';
import React, { useState } from 'react';
import DatePicker from 'react-mobile-datepicker';
import { Button } from 'reactstrap';
import { IconCalendar } from '../../../assets';
import { calculateAgeYearMonth } from '../../../helper';

const InputDateScroll = ({ data, onChange = () => {} }) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleSelect = (time) => {
		onChange(time);
		setIsOpen(false);
	};

	const monthMap = {
		1: 'Jan',
		2: 'Feb',
		3: 'Mar',
		4: 'Apr',
		5: 'May',
		6: 'Jun',
		7: 'Jul',
		8: 'Aug',
		9: 'Sep',
		10: 'Oct',
		11: 'Nov',
		12: 'Dec',
	};

	const dateConfig = {
		year: {
			format: 'YYYY',
			caption: 'Year',
			step: 1,
		},
		month: {
			format: (value) => monthMap[value.getMonth() + 1],
			caption: 'Mon',
			step: 1,
		},
		date: {
			format: 'DD',
			caption: 'Day',
			step: 1,
		},
	};

	return (
		<div
			className="custom-date d-flex mg-0 pd-y-18 pd-x-16 bg-gray rounded-4 link-cursor align-items-center"
			onClick={() => setIsOpen(true)}
		>
			<p className="mg-b-0  flex-1 text-break font-16">
				{data?.value
					? moment(data?.value ?? new Date()).format('DD MMMM YYYY') +
					  ' (' +
					  calculateAgeYearMonth(data?.value ?? new Date()) +
					  ')'
					: data?.placeholder ?? 'Pilih Tanggal'}
			</p>
			<Button color="gray" className="bd-0 pd-0">
				<IconCalendar />
			</Button>
			<DatePicker
				value={data?.value ? new Date(data.value) : ''}
				isOpen={isOpen}
				onSelect={handleSelect}
				onCancel={() => setIsOpen(false)}
				dateConfig={dateConfig}
				confirmText="OK"
				cancelText="CANCEL"
				theme="android"
				max={new Date()}
			/>
		</div>
	);
};

export default InputDateScroll;

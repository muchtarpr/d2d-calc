import React, { useEffect, useRef, useState } from 'react';
import { Button, FormGroup, Input, Label } from 'reactstrap';
import {
	INPUTFORM_CONST,
	REGEX_CONST,
	removeCharByregex,
} from '../../../helper';

const InputFormAge = ({
	className,
	formId,
	data = {},
	onChange = () => {},
}) => {
	const [yearValue, setYearValue] = useState('');
	const [monthValue, setMonthValue] = useState('');

	const inputAreaRef = useRef();

	useEffect(() => {
		setYearValue(getYear());
		setMonthValue(getMonth());
	}, []);

	const getYear = () => {
		var year = Math.floor(data?.value / 12);
		console.log('year age', data, data.name, data?.value, year);
		return year > 0 ? year : '';
	};
	const getMonth = () => {
		var month = Math.floor(data?.value % 12);
		console.log('year age month', data?.value, month);

		return month > 0 ? month : '';
	};

	const updateAge = (type, value) => {
		var temp = value.substring(0, INPUTFORM_CONST.year ? 3 : 2);
		temp = removeCharByregex(temp, REGEX_CONST.numeric);

		let val = temp ? parseInt(temp) : 0;
		var year = Math.floor((data?.value ?? 0) / 12);
		var month = data?.value != null ? data?.value % 12 : 0;

		if (type == INPUTFORM_CONST.year) {
			year = val ?? 0;
			year = year >= 100 ? (month > 0 ? 99 : 100) : year;
		}
		if (type == INPUTFORM_CONST.month) {
			month = val ?? 0;
			month = year >= 100 ? 0 : month > 11 ? 11 : month;
		}
		let res = year * 12 + month;

		setYearValue(year);
		setMonthValue(month);

		onChange(res);
	};

	return (
		<FormGroup className={className} id={formId}>
			{data?.title && (
				<Label className="mg-b-12">
					{data?.title ?? ''}{' '}
					{data?.isRequired && <span className="tx-danger">*</span>}
				</Label>
			)}
			<div className="row">
				<div className="col">
					<Input
						rows={1}
						pattern="[0-9]"
						style={{ resize: 'none' }}
						maxLength={data?.max_length ?? null}
						className="form-control flex-1 font-16 bd-0"
						value={yearValue}
						placeholder={data?.placeholder}
						onChange={(e) =>
							updateAge(INPUTFORM_CONST.year, e.target.value)
						}
					/>
					<span
						className="pos-absolute font-16 mg-y-18"
						style={{ top: 33, left: 48 }}
					>
						Tahun
					</span>
				</div>
				<div className="col">
					<Input
						rows={1}
						pattern="[0-9]"
						style={{ resize: 'none' }}
						maxLength={2}
						className="form-control flex-1 font-16 bd-0"
						value={monthValue}
						placeholder={data?.placeholder}
						onChange={(e) =>
							updateAge(INPUTFORM_CONST.month, e.target.value)
						}
					/>
					<span
						className="pos-absolute font-16 mg-y-18"
						style={{ top: 33, left: 'calc(50% + 48px + 16px)' }}
					>
						Bulan
					</span>
				</div>
			</div>
			<div className="row">
				{data?.bottom_label && (
					<Label className="font-12 mg-t-8 tx-gray-2 col-8 flex-1">
						{data?.bottom_label}
					</Label>
				)}
			</div>
		</FormGroup>
	);
};

export default InputFormAge;

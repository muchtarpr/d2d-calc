import React, { useEffect, useReducer, useRef, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import $, { map } from 'jquery';
import axios from 'axios';
import crypto from 'crypto';

import { Button, Input } from 'reactstrap';
import moment from 'moment';
import 'moment/locale/id';
import { IconCalendar } from '../../../assets';
import { calculateAge } from '../../../helper';

const InputDate = ({ data, onChange = () => {} }) => {
	return (
		<div className="custom-date d-flex mg-0 pd-y-18 pd-x-16 bg-gray rounded-4 link-cursor align-items-center">
			<p className="mg-b-0  flex-1 text-break font-16">
				{data?.value
					? moment(data?.value ?? new Date()).format('DD MMMM YYYY') +
					  ' (' +
					  calculateAge(data?.value ?? new Date()) +
					  ' Tahun)'
					: data?.placeholder ?? 'Pilih Tanggal'}
			</p>
			<Button color="gray" className="bd-0 pd-0">
				<IconCalendar />
			</Button>
			<Input
				type="date"
				id="inputDate"
				onChange={(e) => onChange(e.target.value)}
			/>
		</div>
	);
};
export default InputDate;

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import $, { map } from 'jquery';
import axios from 'axios';
import crypto from 'crypto';

import { Button } from 'reactstrap';

const CardBox = ({ className, icon, title, titleClass='card-chat-gray', body }) => {
	return (
		<div className={className} style={{ width: '100%' }}>
			<div className={`${titleClass} d-flex pd-12 align-items-center`}>
				<div className="pd-r-12">{icon}</div>
				<div className="tx-16 tx-roboto-medium tx-spacing-015">
					{title}
				</div>
			</div>
			<div className="pd-16">{body}</div>
		</div>
	);
};
export default CardBox;

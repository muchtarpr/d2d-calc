import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import $, { map } from 'jquery';
import axios from 'axios';
import crypto from 'crypto';

import { Button } from 'reactstrap';
import { IconErrorRed } from '../../../assets';

const ButtonErrorIcon = ({
	onClick = () => { },
	isDiabled = false,
}) => {
	return (
		<div>
			<Button
				color='transparent'
				onClick={onClick}
				style={{
					paddingLeft: 5,
					paddingTop: 0,
					paddingRight: 0,
					paddingBottom: 0,
				}}
				disabled={isDiabled}
			>
				<IconErrorRed />
			</Button>
		</div>
	);
};
export default ButtonErrorIcon;

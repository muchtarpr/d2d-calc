import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import $, { map } from 'jquery';
import axios from 'axios';
import crypto from 'crypto';

import { Button } from 'reactstrap';

const ButtonHighlight = ({
	className = '',
	classNameBtn = '',
	text = 'Submit',
	onClick = () => {},
	isDiabled = false,
	color = 'primary',
}) => {
	return (
		<div className={'wd-100p d-flex flex-1 ' + className}>
			<Button
				className={classNameBtn}
				color={color}
				style={{ flex: 1 }}
				onClick={onClick}
				disabled={isDiabled}
			>
				{text}
			</Button>
		</div>
	);
};
export default ButtonHighlight;

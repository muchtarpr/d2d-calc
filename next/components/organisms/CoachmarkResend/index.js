import React, { useEffect, useState } from 'react';
import {
	Button,
	FormGroup,
	Input,
	Label,
	Popover,
	PopoverBody,
} from 'reactstrap';

import { IconSendOn } from '../../../assets/index.js';

import { INPUTFORM_CONST } from '../../../helper';
import { ButtonHighlight } from '../../atoms';

const CoachmarkResend = ({
	children,
	classNameContainer,
	className,
	isPopoverOpen = false,
	onResendClick = () => {},
	targetId = 'PopoverTarget',
}) => {
	const [isOpen, setIsOpen] = useState(false);
	useEffect(() => {
		setIsOpen(isPopoverOpen);
	}, [isPopoverOpen]);

	return (
		<div className={classNameContainer ?? 'flex-1 d-flex'}>
			<div
				id={targetId}
				className={(className ?? '') + (isOpen ? ' z-index-10' : '')}
			>
				{children}
			</div>
			<Popover
				placement="bottom"
				isOpen={isOpen}
				target={targetId}
				hideArrow={true}
				popperClassName="popoverBody pd-8"
			>
				{/* <PopoverBody> */}
				<div
					style={{
						backgroundColor: 'white',
						width: 'fit-content',
						padding: '8px',
						display: 'block',
						marginLeft: 'auto',
						marginRight: '0',
						borderRadius: '10px',
					}}
				>
					<Button
						className="pd-0 pd-x-15"
						onClick={onResendClick}
						style={{
							color: 'dodgerblue',
							backgroundColor: 'transparent',
							border: 'none',
						}}
					>
						KIRIM ULANG
					</Button>
					<IconSendOn />
				</div>
				{/* </PopoverBody> */}
			</Popover>
		</div>
	);
};

export default CoachmarkResend;

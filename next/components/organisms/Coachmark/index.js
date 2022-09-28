import React, { useEffect, useState } from 'react';
import {
	Button,
	FormGroup,
	Input,
	Label,
	Popover,
	PopoverBody,
} from 'reactstrap';
import { INPUTFORM_CONST } from '../../../helper';

const Coachmark = ({
	children,
	classNameContainer,
	className,
	isPopoverOpen = false,
	data,
	onChange = () => {},
	dotActivePosition = 1,
	dotLength = 3,
	title = '',
	desc = '',
	onClickNext = () => {},
	onClickPrev,
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
			<Popover placement="bottom" isOpen={isOpen} target={targetId}>
				<PopoverBody>
					<div className="tx-black flex-1 w-100">
						<p className="font-20 tx-roboto-medium">{title}</p>
						<p className="font-16 mg-t-16">{desc}</p>
						<div className="flex-1 d-flex align-items-center mg-t-16">
							<p className="font-16 flex-1">
								{dotActivePosition + ' dari ' + dotLength}
							</p>
							{onClickPrev != null && (
								<Button
									color="grey pd-y-10"
									onClick={onClickPrev}
								>
									KEMBALI
								</Button>
							)}
							<Button
								color="primary pd-y-10 mg-l-16"
								onClick={onClickNext}
							>
								{dotLength == dotActivePosition
									? 'SELESAI'
									: 'LANJUT'}
							</Button>
						</div>
					</div>
				</PopoverBody>
			</Popover>
		</div>
	);
};

export default Coachmark;

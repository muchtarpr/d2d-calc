import React, { useEffect } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { ButtonHighlight } from '../../atoms';
import PopupBottomsheet from '../PopupBottomsheet';

const PopupBottomsheetConfirmation = ({
	data,
	callback = () => {},
	handleOnClick = () => {},
}) => {
	useEffect(() => {}, [data]);

	return (
		<PopupBottomsheet
			expandOnContentDrag={false}
			isSwipeableOpen={data != null}
			setIsSwipeableOpen={(isOpen) => {
				if (!isOpen) callback(null);
			}}
			headerComponent={
				<div className="mg-t-36 mg-x-16">
					<p className="font-20 tx-roboto-medium tx-left">
						{data?.title}
					</p>
				</div>
			}
			footerComponent={
				data?.cancelButtonText ? (
					<div className="row pd-16">
						<ButtonHighlight
							color="grey"
							onClick={() => {
								callback(null);
							}}
							text={data?.cancelButtonText}
						/>
						<ButtonHighlight
							onClick={() => {
								callback(true);
							}}
							text={data?.okButtonText}
						/>
					</div>
				) : (
					<div className='pd-16'>
						<ButtonHighlight
							onClick={() => {
								callback(true);
							}}
							text={data?.okButtonText}
						/>
					</div>
				)
			}
		>
			{data?.desc && (
				<div className="mg-16">
					<p className="font-16">{data?.desc}</p>
				</div>
			)}
		</PopupBottomsheet>
	);
};

export default PopupBottomsheetConfirmation;

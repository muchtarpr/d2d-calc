import React, { useEffect, useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import {
	Button,
	Card,
	CardText,
	CardTitle,
	Col,
	Nav,
	NavItem,
	NavLink,
	Row,
	TabContent,
	TabPane,
} from 'reactstrap';
import { Doctor1, IconCloseRound } from '../../../assets';
import { ButtonHighlight } from '../../atoms';

const PopupBottomsheet = ({
	isSwipeableOpen = false,
	setIsSwipeableOpen = () => {},
	styleSwipeable,
	data,
	headerComponent,
	footerComponent,
	children = <div />,
	isWithCloseButton = false,
	expandOnContentDrag = true,
}) => {
	useEffect(() => {
		console.log('isswipeableopen', isSwipeableOpen);
	}, [isSwipeableOpen]);

	const renderHeaderComponent = () => {
		return (
			<div>
				{isWithCloseButton && (
					<IconCloseRound
						className="btn-floating-top-right"
						onClick={() => setIsSwipeableOpen(false)}
					/>
				)}
				{headerComponent}
			</div>
		);
	};

	return (
		<div className="tx-black">
			<BottomSheet
				open={isSwipeableOpen}
				expandOnContentDrag={expandOnContentDrag}
				onDismiss={() => setIsSwipeableOpen(false)}
				snapPoints={({ minHeight, maxHeight }) => [
					minHeight,
					!expandOnContentDrag
						? minHeight
						: isWithCloseButton
						? maxHeight * 0.9 - 32
						: maxHeight * 0.9,
				]}
				footer={footerComponent}
				header={renderHeaderComponent()}
			>
				{children}
			</BottomSheet>
		</div>
	);
};

export default PopupBottomsheet;

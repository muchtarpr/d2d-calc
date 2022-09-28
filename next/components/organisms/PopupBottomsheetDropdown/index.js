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
import { DropdownList, InputForm } from '../../molecules';
import PopupBottomsheet from '../PopupBottomsheet';

const PopupBottomsheetDropdown = ({
	isSwipeableOpen = false,
	setIsSwipeableOpen = () => {},
	styleSwipeable,
	data,
	onChange = () => {},
}) => {
	const [dataTemp, setDataTemp] = useState(data);

	useEffect(() => {
		if (!isSwipeableOpen) {
			setDataTemp(data);
		}
	}, [isSwipeableOpen]);

	return (
		<PopupBottomsheet
			className="bg-black"
			isSwipeableOpen={isSwipeableOpen}
			setIsSwipeableOpen={(isOpen) => {
				setIsSwipeableOpen(isOpen);
			}}
			footerComponent={
				<div className="row mg-t-16 box-shadow-top2 pd-16">
					<ButtonHighlight
						color="grey"
						onClick={() => {
							setIsSwipeableOpen(false);
						}}
						text="BATAL"
					/>
					<ButtonHighlight
						isDiabled={
							dataTemp?.value == null ||
							(dataTemp?.value &&
								dataTemp?.options[dataTemp?.value]
									?.textbox_active &&
								!dataTemp?.valueText)
						}
						onClick={() => {
							onChange(
								dataTemp?.valueText != null &&
									dataTemp?.valueText != ''
									? {
											id: dataTemp?.value,
											valueText: dataTemp?.valueText,
									  }
									: null,
							);
							setIsSwipeableOpen(false);
						}}
						text="KONFIRMASI"
					/>
				</div>
			}
			headerComponent={
				<div className="pd-y-20 mg-x-16">
					<p className="tx-left mg-t-16 font-20 tx-roboto-medium bd-0">
						{dataTemp?.options_title}
					</p>
				</div>
			}
		>
			<div className="">
				<DropdownList
					title={dataTemp?.options_title}
					data={dataTemp?.options}
					selected={{
						id: dataTemp?.value,
						text: dataTemp?.valueText,
					}}
					onChange={(id, valueText) =>
						setDataTemp({
							...dataTemp,
							value: id,
							valueText: valueText,
						})
					}
				/>
				{dataTemp?.value &&
				dataTemp?.options[dataTemp?.value]?.textbox_active ? (
					<InputForm
						className="mg-x-16 mg-t-8"
						data={{
							value: dataTemp?.valueText,
							placeholder: dataTemp?.other_placeholder,
						}}
						onChange={(params) =>
							setDataTemp({
								...dataTemp,
								valueText: params?.value,
							})
						}
					/>
				) : null}
			</div>
		</PopupBottomsheet>
	);
};

export default PopupBottomsheetDropdown;

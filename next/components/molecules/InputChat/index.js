import React, { useEffect, useRef, useState } from 'react';
import { Input, InputGroup, InputGroupText } from 'reactstrap';
import { IconAddBlue, IconClear } from '../../../assets';
import { Coachmark, FilePicker, PopupBottomsheet } from '../../organisms';

const InputChat = ({
	value,
	onChange = () => {},
	onChangeFileInput = () => {},
	coachmarkAddButtonData,
	disabled = false,
	fileTemp = null,
}) => {
	const [isOpenBottomsheetAdd, setIsOpenBottomsheetAdd] = useState(false);
	const inputAreaRef = useRef();

	useEffect(() => {
		checkHeight();
	}, [value, fileTemp]);

	const checkHeight = () => {
		var inputTextArea = inputAreaRef.current;

		inputAreaRef.current.style.height = '24px';
		inputAreaRef.current.style.height = inputTextArea.scrollHeight + 'px';
	};

	const onClickAdd = () => {
		if (disabled) {
			return;
		}
		setIsOpenBottomsheetAdd(true);
	};

	return (
		<div
			style={{
				backgroundColor: '#fff',
			}}
			className="d-flex flex-1 align-items-center"
		>
			{fileTemp && (
				<div
					className="pd-12 mg-r-12 mg-y-3 img-48 rounded-circle btn-hover align-self-end"
					onClick={() => onChangeFileInput(null)}
				>
					<IconClear />
				</div>
			)}
			<InputGroup
				className={
					'mg-r-12 bg-gray rounded-28 ' +
					(coachmarkAddButtonData?.isShow ? '' : 'overflow-x-clip')
				}
			>
				<Input
					type="textarea"
					className="form-control flex-1 col-10 bd-0 pd-16 font-16 mg-r-0"
					name="InputArea"
					id="InputArea"
					onKeyUp={checkHeight}
					value={value}
					// ref={inputAreaRef}
					innerRef={inputAreaRef}
					placeholder="Type something.."
					onChange={(e) => onChange(e.target.value)}
					rows={1}
					style={{ resize: 'none' }}
					maxLength={2200}
				/>

				<Coachmark
					className="d-flex flex-0"
					title={coachmarkAddButtonData?.title ?? ''}
					desc={coachmarkAddButtonData?.desc ?? ''}
					dotActivePosition={
						coachmarkAddButtonData?.dotActivePosition ?? 1
					}
					dotLength={coachmarkAddButtonData?.dotLength ?? 1}
					onClickPrev={coachmarkAddButtonData?.onPressPrev}
					onClickNext={coachmarkAddButtonData?.onPressNext}
					isPopoverOpen={coachmarkAddButtonData?.isShow ?? false}
					targetId="popoverAddButton"
					classNameContainer="d-flex flex-0"
				>
					<InputGroupText
						className="link-cursor bg-gray pd-16 bd-0 mg-l-0 rounded-8"
						onClick={onClickAdd}
					>
						<IconAddBlue className="align-self-end" />
					</InputGroupText>
				</Coachmark>
			</InputGroup>
			<FilePicker
				isSwipeableOpen={isOpenBottomsheetAdd}
				setIsSwipeableOpen={(isOpen) => setIsOpenBottomsheetAdd(isOpen)}
				onChange={(val) => {
					setIsOpenBottomsheetAdd(false);
					onChangeFileInput(val);
				}}
			/>
		</div>
	);
};
export default InputChat;

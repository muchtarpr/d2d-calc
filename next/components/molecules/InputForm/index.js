import React, { useEffect, useRef, useState } from 'react';
import { Button, FormGroup, Input, Label } from 'reactstrap';
import { IconRight } from '../../../assets';
import {
	INPUTFORM_CONST,
	REGEX_CONST,
	removeCharByregex,
} from '../../../helper';
import { PopupBottomsheetDropdown } from '../../organisms';
import { InputDate, InputDateScroll } from '../../atoms';
import { InputFormAge } from '../../molecules';
import { FORM_CONSULTATION } from '../../../pages/form-consultation';

const InputForm = ({ className, formId, data, onChange = () => {} }) => {
	const [isOpenBottomsheetDropdown, setisOpenBottomsheetDropdown] =
		useState(false);

	const inputAreaRef = useRef();

	useEffect(() => {
		checkHeight();
	}, []);

	useEffect(() => {}, [data]);

	const checkHeight = () => {
		try {
			var inputTextArea = inputAreaRef.current;

			if (data?.type == INPUTFORM_CONST.textarea) {
				inputAreaRef.current.style.height = '24px';
				inputAreaRef.current.style.height =
					inputTextArea.scrollHeight + 'px';
			}
		} catch (error) {
			console.log('error on checkheight input : ', error);
		}
	};

	useEffect(() => {}, [isOpenBottomsheetDropdown]);

	if (data?.type == INPUTFORM_CONST.options_radio) {
		return (
			<FormGroup className={className} id={formId}>
				{data?.title && (
					<Label className="mg-b-12 form-label tx-16 tx-semibold">
						{data?.title}{' '}
						{data?.isRequired && (
							<span className="tx-danger">*</span>
						)}
					</Label>
				)}

				<div className="row mg-0 col-gap-16">
					{data?.options &&
						data?.options.length &&
						data.options.map((element, id) => (
							<Button
								key={'options' + id}
								color={
									data?.value != null &&
									data?.value == element?.id
										? 'primary-red'
										: 'grey'
								}
								className="flex-1"
								onClick={() =>
									onChange({
										name: data?.name,
										type: data?.type,
										formId: formId,
										value: element.id,
									})
								}
							>
								{element.name}
							</Button>
						))}
				</div>
			</FormGroup>
		);
	} else if (data?.type == INPUTFORM_CONST.dropdown) {
		return (
			<FormGroup className={className} id={formId}>
				{data?.title && (
					<Label className="mg-b-12 form-label tx-16 tx-semibold">
						{data?.title ?? ''}{' '}
						{data?.isRequired && (
							<span className="tx-danger">*</span>
						)}
					</Label>
				)}
				<div
					className="d-flex mg-0 bg-gray rounded-4 link-cursor"
					onClick={() => {
						console.log('onopen');
						setisOpenBottomsheetDropdown(true);
					}}
				>
					<p className="mg-b-0 pd-y-18 pd-x-16 flex-1 text-break">
						{data?.valueText ?? data?.placeholder ?? ''}
					</p>
					<Button color="gray" className="bd-0">
						<IconRight />
					</Button>
				</div>
				<PopupBottomsheetDropdown
					data={data}
					isSwipeableOpen={isOpenBottomsheetDropdown}
					setIsSwipeableOpen={(isOpen) =>
						setisOpenBottomsheetDropdown(isOpen)
					}
					onChange={(value) => {
						onChange({
							name: data?.name,
							type: data?.type,
							formId: formId,
							value: value,
						});
					}}
				/>
			</FormGroup>
		);
	} else if (data?.type == INPUTFORM_CONST.date) {
		return (
			<FormGroup className={className} id={formId}>
				{data?.title && (
					<Label className="mg-b-12">
						{data?.title ?? ''}{' '}
						{data?.isRequired && (
							<span className="tx-danger">*</span>
						)}
					</Label>
				)}
				<InputDate
					data={data}
					onChange={(val) =>
						onChange({
							name: data?.name,
							type: data?.type,
							formId: formId,
							value: val,
						})
					}
				/>
			</FormGroup>
		);
	} else if (data?.name == FORM_CONSULTATION.AGE) {
		return (
			<FormGroup className={className} id={formId}>
				{data?.title && (
					<Label className="mg-b-12 form-label tx-16 tx-semibold">
						{data?.title ?? ''}{' '}
						{data?.isRequired && (
							<span className="tx-danger">*</span>
						)}
					</Label>
				)}
				<InputDateScroll
					data={data}
					onChange={(val) => {
						onChange({
							name: data?.name,
							type: data?.type,
							formId: formId,
							value: val,
						});
					}}
				/>
			</FormGroup>
		);
	}

	// default
	return (
		<FormGroup className={className} id={formId}>
			{data?.title && (
				<Label className="mg-b-12 form-label tx-16 tx-semibold">
					{data?.title ?? ''}{' '}
					{data?.isRequired && <span className="tx-danger">*</span>}
				</Label>
			)}
			<Input
				innerRef={inputAreaRef}
				type={data?.type ?? 'text'}
				onKeyUp={checkHeight}
				rows={1}
				style={{ resize: 'none' }}
				maxLength={data?.max_length ?? null}
				className="form-control flex-1 font-16 bd-0"
				value={data?.value ?? ''}
				placeholder={data?.placeholder}
				onChange={(e) => {
					var tempVal = data?.max_length
						? e.target.value.substring(0, data?.max_length)
						: e.target.value;
					if (data?.inputmode == 'numeric') {
						tempVal = removeCharByregex(
							tempVal,
							REGEX_CONST.numeric,
						);
					}

					onChange({
						name: data?.name,
						type: data?.type,
						formId: formId,
						value: tempVal,
					});
				}}
				inputmode={data?.inputmode ?? 'text'}
			/>
			<div className="row">
				{data?.bottom_label && (
					<Label className="font-12 mg-t-8 tx-gray-2 col-8">
						{data?.bottom_label}
					</Label>
				)}
				{data?.counter_visible && (
					<Label className="font-12 mg-t-8 tx-gray-2 col-4 tx-right">
						{(data?.value?.length ?? '0') + '/' + data?.max_length}
					</Label>
				)}
			</div>
		</FormGroup>
	);
};

export default InputForm;

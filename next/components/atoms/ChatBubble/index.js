import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import $, { map } from 'jquery';
import axios from 'axios';
import crypto from 'crypto';

import { Button, Progress } from 'reactstrap';
import ButtonHighlight from '../ButtonHighlight';
import { IconDelivered, IconFile, IconRead, IconSent } from '../../../assets';
import {
	CHAT_CONST,
	checkIfFromPatient,
	convertMB,
	getFilenameUrl,
	getFormattedTimeFromDate,
	getParsedLocalStorage,
	LOCALSTORAGE,
} from '../../../helper';
import ButtonErrorIcon from '../ButtonErrorIcon';
import { CoachmarkResend } from '../../organisms';

const ChatBubble = ({
	id = 0,
	orderid,
	className = '',
	data = null,
	onClick = () => {},
	errorOnClick = () => {},
	onResendClick = () => {},
	setPreviewImageData = () => {},
	isShowResend = false,
}) => {
	const [progressForm, setprogressForm] = useState(0);
	useEffect(() => {
		if (data?.type == CHAT_CONST.FILL_FORM) {
			checkProgressForm();
		}
	}, [data]);

	const checkProgressForm = async () => {
		var trackProgressMandatory = (await getParsedLocalStorage(
			LOCALSTORAGE.FORM_CONSULTATION,
		)) ?? { orderId: orderid, forms: [] };
		setprogressForm(
			trackProgressMandatory.forms.filter((e) => e.isRequired).length,
		);
	};

	const getProgressPercent = () => {
		return Math.round((progressForm / 6) * 100);
	};

	const isFromPatient = (data) => {
		return data?.userType == CHAT_CONST.PATIENT;
	};

	return (
		<div className={' mg-b-16 ' + className}>
			<div
				className={
					'align-items-center mg-b-6 d-flex ' +
					(isFromPatient(data)
						? 'justify-content-end'
						: 'justify-content-start')
				}
			>
				<CoachmarkResend
					className={
						'd-flex flex-1 ' +
						(isFromPatient(data)
							? 'justify-content-end'
							: 'justify-content-start')
					}
					isPopoverOpen={isShowResend}
					targetId={'popoverChat' + id}
					onResendClick={onResendClick}
				>
					<div
						className={
							'card-chat ' +
							(isFromPatient(data)
								? 'card-chat-blue'
								: 'card-chat-gray') +
							(data?.type == CHAT_CONST.IMAGE ? ' pd-0' : '')
						}
					>
						{data?.type == CHAT_CONST.FILE ? (
							<div
								className="d-flex align-itmes-center link-cursor"
								onClick={() => {
									Router.push({
										pathname: '/preview-pdf',
										query: { source: data?.source },
									});
								}}
							>
								<div className="bg-white rounded-16 img-72 align-items-center justify-content-center align-self-center">
									<IconFile className="mg-16" />
								</div>

								<div className="mg-l-5 flex-1 mg-l-12">
									<p className="tx-chat font-16">
										{getFilenameUrl(data?.source)}
									</p>
									<p className="tx-chat font-14 mg-t-5">
										{convertMB(data.size)}
									</p>
								</div>
							</div>
						) : data?.type == CHAT_CONST.IMAGE ? (
							<div
								className="d-flex align-itmes-center link-cursor"
								onClick={() => setPreviewImageData(data)}
							>
								<img
									src={data?.source}
									className="img-contain img-214 rounded-16"
								/>
							</div>
						) : (
							<div>
								<p className="tx-chat font-16">
									{getProgressPercent() < 100
										? data.message
										: 'Anda sudah mengisi formulir konsultasi.'}
								</p>
								{data?.type == CHAT_CONST.FILL_FORM && (
									<div>
										<ButtonHighlight
											color="grey"
											className="mg-t-12"
											classNameBtn="font-12 pd-y-10 tx-link"
											text={
												getProgressPercent() < 100
													? 'LENGKAPI FORMULIR KONSULTASI'
													: 'LIHAT FORMULIR KONSULTASI'
											}
											onClick={() =>
												onClick(data?.type, {
													progress:
														getProgressPercent(),
												})
											}
										/>
										{getProgressPercent() < 100 && (
											<div className="d-flex  mg-t-12 align-items-center">
												<Progress
													className="flex-1 mg-r-12"
													value={getProgressPercent()}
												/>
												<p className="font-12 mg-b-0 tx-gray-2">
													{getProgressPercent() + '%'}
												</p>
											</div>
										)}
									</div>
								)}
							</div>
						)}
					</div>
				</CoachmarkResend>

				{isFromPatient(data) && data.status == CHAT_CONST.FAILED && (
					<ButtonErrorIcon onClick={errorOnClick} />
				)}
			</div>
			{data?.createdAt && (
				<p
					className={
						'font-12 tx-gray-2 ' +
						(isFromPatient(data) ? 'tx-right' : '')
					}
				>
					{isFromPatient(data) ? (
						data?.status == CHAT_CONST.READ ? (
							<span className="mg-r-4">
								<IconRead /> Dibaca
							</span>
						) : data?.status == CHAT_CONST.DELIVERED ? (
							<span className="mg-r-4">
								<IconDelivered /> Tersampaikan
							</span>
						) : (
							<span className="mg-r-4">
								<IconSent /> Belum Tersampaikan
							</span>
						)
					) : null}
					{getFormattedTimeFromDate(
						data?.updated_at ?? data?.createdAt,
					)}
				</p>
			)}
		</div>
	);
};
export default ChatBubble;

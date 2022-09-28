import React, { useEffect, useRef, useState } from 'react';
import Router, { useRouter } from 'next/router';
import {
	ButtonHighlight,
	ChatBubble,
	Coachmark,
	CountdownTimerBar,
	InputChat,
	Wrapper,
	Receipt,
	PopupBottomsheetDetailChat,
	Gallery,
	PreviewImage,
} from '../components/index.js';
import moment from 'moment';
import {
	checkIfFromPatient,
	getChatDetailData,
	getFormattedTimeFromDate,
	getLocalStorage,
	LOCALSTORAGE,
	setLocalStorage,
	encryptData,
	decryptData,
	getConsulUser,
	getConsulVerify,
	getConsulDetail,
	CHAT_CONST,
	removeLocalStorage,
	getTimeLeft,
} from '../helper';
import {
	IconDelivered,
	IconDkonsul,
	IconKemenkes,
	IconRead,
	IconSendOff,
	IconSendOn,
	IconSent,
} from '../assets/index.js';

const ChatDetail = (props) => {
	const orderid = 'a1asd1dax2dd12q3d';
	const [chatData, setChatData] = useState(null);

	const [doctorData, setDoctorData] = useState();
	const [patientData, setPatientData] = useState();

	const [consulDetail, setConsulDetail] = useState();

	const [chats, setChats] = useState([]);

	const [timeLeft, setTimeLeft] = useState(null);

	const [inputValue, setInputValue] = useState('');

	const [pushMessageById, setPushMessageById] = useState(null);

	//int id
	const [pushResendMessage, setPushResendMessage] = useState(null);

	const [isShowCoachmarkHeader, setIsShowCoachmarkHeader] = useState(false);
	const [isShowCoachmarkDuration, setIsShowCoachmarkDuration] =
		useState(false);
	const [isShowCoachmarkAddButton, setIsShowCoachmarkAddButton] =
		useState(false);

	const [isOpenBottomsheetDetail, setIsOpenBottomsheetDetail] =
		useState(false);

	const [activeTab, setActiveTab] = useState(0);

	const [isShowCoachmarkResend, setIsCoachmarkResend] = useState(null);

	const [fileTemp, setFileTemp] = useState();

	const [previewImageData, setPreviewImageData] = useState(false);

	const router = useRouter();

	// const contentRef = useRef(null);

	useEffect(() => {
		const params = router.query;

		if (params.token == null) return;
		console.log('TOKENNYA', params.token);

		getData(params.token);

		setTimeout(async () => {
			let lastCoachmark = await getLocalStorage(
				LOCALSTORAGE.CHATDETAIL_COACHMARK,
			);
			console.log('coach', lastCoachmark);
			if (lastCoachmark == null) {
				setIsShowCoachmarkHeader(true);
			} else if (lastCoachmark == 1) {
				setIsShowCoachmarkDuration(true);
			} else if (lastCoachmark == 2) {
				setIsShowCoachmarkAddButton(true);
			}
		}, 500);
	}, [router.query]);

	const chatsRef = useRef(chats);

	useEffect(() => {
		chatsRef.current = chats;
	}, [chats]);

	const getData = async (token) => {
		try {
			let verifyToken = await getConsulVerify(token);
			console.log('res consulVerify', verifyToken?.meta?.status);

			if (verifyToken?.meta?.status != 200) return;
			///TODO: Bikin view token error

			global.tokenAuthorization = verifyToken?.data?.token;
			global.orderNumber = verifyToken?.data?.orderNumber;

			///REAL DATA
			let consulDetail = await getConsulDetail(global.orderNumber);
			console.log('realData', consulDetail);
			setConsulDetail(consulDetail);

			global.patientMemberId = consulDetail?.data?.patientData?.id;
			global.orderNumber = consulDetail?.data?.orderNumber;

			let data = await getChatDetailData();
			console.log('res chatdetail', data);

			setChatData(consulDetail?.data);
			setChats(consulDetail?.data?.messages);

			let timeLeftTemp = getTimeLeft(consulDetail?.data?.expiredAt);
			setTimeLeft(timeLeftTemp);
		} catch (error) {
			console.log('error on get data chat detail : ', error);
		}
	};

	const getConsulUserDetail = async (type) => {
		if (type == 'doctor') {
			let data = await getConsulUser(global.orderNumber, type);

			setDoctorData(data?.data);
		} else if (type == 'patient') {
			let data = await getConsulUser(global.orderNumber, type);

			setPatientData(data?.data);
		}
	};

	const handleNewMessage = (res) => {
		if (checkIfFromPatient({ from: res.user })) {
			setInputValue('');
		}

		const index = chatsRef.current?.findIndex((e) => e.id == res.id);
		if (index == -1) {
			setChats((prev) => [...prev, res]);
		} else {
			replaceChat(index, res);
		}
	};

	const replaceChat = (index, chat) => {
		let newChats = Object.assign([], chatsRef.current);
		newChats[index] = chat;
		setChats(newChats);
	};

	const chatErrorCallback = (id) => {
		const index = chatsRef.current.findIndex((e) => e.id == id);
		const tempChats = chatsRef.current.map((item) => ({ ...item }));
		if (tempChats[index].status != 'DELIVERED') {
			tempChats[index].status = 'FAILED';
		}
		setChats(tempChats);
	};

	const onPressNextCoachmarkHeader = () => {
		setLocalStorage(LOCALSTORAGE.CHATDETAIL_COACHMARK, 1);
		setIsShowCoachmarkDuration(true);
		setIsShowCoachmarkHeader(false);
	};
	const onPressBackDuration = () => {
		setLocalStorage(LOCALSTORAGE.CHATDETAIL_COACHMARK, 0);
		setIsShowCoachmarkHeader(true);
		setIsShowCoachmarkDuration(false);
	};
	const onPressNextDuration = () => {
		setLocalStorage(LOCALSTORAGE.CHATDETAIL_COACHMARK, 2);

		setIsShowCoachmarkDuration(false);
		if (timeLeft > 0) {
			setIsShowCoachmarkAddButton(true);
		}
	};
	const onPressBackAddButton = () => {
		setLocalStorage(LOCALSTORAGE.CHATDETAIL_COACHMARK, 1);
		setIsShowCoachmarkDuration(true);
		setIsShowCoachmarkAddButton(false);
	};
	const onPressNextAddButton = () => {
		setLocalStorage(LOCALSTORAGE.CHATDETAIL_COACHMARK, 3);
		setIsShowCoachmarkAddButton(false);
		setIsShowCoachmarkAddButton(false);
		setIsShowCoachmarkHeader(false);
	};

	const renderFooterButton = () => {
		if (!timeLeft) {
			return (
				<div className="mg-16">
					<ButtonHighlight text="KEMBALI KE TOKOPEDIA" />
				</div>
			);
		} else {
			return (
				<div className="d-flex flex-1 pd-16">
					<InputChat
						coachmarkAddButtonData={{
							title: 'Unggah Berkas',
							desc: 'Anda dapat memberikan informasi lampiran foto dan file disini.',
							isShow: isShowCoachmarkAddButton,
							onPressPrev: onPressBackAddButton,
							onPressNext: onPressNextAddButton,
							dotLength: 3,
							dotActivePosition: 3,
						}}
						onChange={(value) => setInputValue(value)}
						onChangeFileInput={(val) => {
							setFileTemp(val);
							console.log('val', val);
						}}
						fileTemp={fileTemp}
						value={inputValue}
						disabled={
							isShowCoachmarkHeader ||
							isShowCoachmarkDuration ||
							isShowCoachmarkAddButton
						}
					/>
					<div
						className="pd-16 rounded-half btn-hover img-56 align-self-end"
						onClick={() => {
							var chat = createNewChat(inputValue);
							setChats((prev) => [...prev, chat]);
							setPushMessageById(chat.id);
							try {
								// console.log(
								// 	'contentRef.current?',
								// 	contentRef.current,
								// );
								// contentRef.current?.scrollToBottom();
							} catch (error) {
								console.log(
									'error on scroll to bottom : ',
									error,
								);
							}
						}}
					>
						{inputValue ? <IconSendOn /> : <IconSendOff />}
					</div>
				</div>
			);
		}
	};

	const createNewChat = (message) => {
		return {
			action: CHAT_CONST.INCOMING_MESSAGE,
			type: CHAT_CONST.MESSAGE,
			userType: CHAT_CONST.PATIENT,
			authorization: global?.tokenAuthorization,
			order_number: global?.orderNumber,
			id: new Date().getTime(),
			createdAt: new Date(),
			message: message,
			status: CHAT_CONST.SENT,
		};
	};

	const renderSummary = () => {
		var header = consulDetail?.data?.chatHeaders ?? [];

		if (header.length == 0) return <div></div>;

		return (
			<div className="pd-16 card-border">
				{header.map((e) => {
					return (
						<div className=" d-flex tx-black align-items-center">
							<div className="flex-1 mg-b-16">
								<p className="font-12 tx-roboto-medium tx-gray-2">
									{e.label}
								</p>
								<p className="font-14 mg-t-8 tx-roboto-medium">
									{e.name}
								</p>
							</div>
							{/* <IconKemenkes className="mg-l-16" /> */}
							<img
								src={e?.image}
								width={100}
								className="mg-l-16"
							/>
						</div>
					);
				})}
			</div>
		);
	};

	const renderChatList = () => {
		var temp = '';
		return (
			<div>
				{chats?.map((element, id) => {
					var formattedDate = moment(element.createdAt).format(
						'DD MMMM YYYY',
					);
					var isNewDate = temp != formattedDate;
					if (isNewDate) {
						temp = formattedDate;
					}
					return (
						<div>
							<div
								className="font-14 mg-y-8 tx-roboto-medium tx-gray-2"
								style={{ textAlign: 'center' }}
							>
								{isNewDate ? temp : ''}
							</div>
							<ChatBubble
								id={id}
								key={id}
								orderid={orderid}
								data={element}
								onClick={(type, params) => {
									if (type == CHAT_CONST.FILL_FORM) {
										if (params?.progress < 100) {
											Router.push({
												pathname: '/form-consultation',
											});
										} else {
											setIsOpenBottomsheetDetail(true);
											setActiveTab(1);
										}
									}
								}}
								errorOnClick={() => {
									setIsCoachmarkResend(element.id);
								}}
								onResendClick={() => {
									console.log('RESEND CLICKED');
									setIsCoachmarkResend(null);
									setPushResendMessage(element.id);
								}}
								isShowResend={
									isShowCoachmarkResend != null &&
									isShowCoachmarkResend == element.id
								}
								setPreviewImageData={(data) =>
									setPreviewImageData(data)
								}
							/>
						</div>
					);
				})}
			</div>
		);
	};

	const renderDuration = () => {
		return (
			<Coachmark
				className="d-flex flex-1"
				title="Durasi Telekonsultasi"
				desc="Anda bisa melihat durasi telekonsultasi disini."
				dotActivePosition={2}
				dotLength={3}
				onClickPrev={onPressBackDuration}
				onClickNext={onPressNextDuration}
				isPopoverOpen={isShowCoachmarkDuration}
				targetId="popoverDuration"
			>
				<CountdownTimerBar
					duration={timeLeft}
					setTimeLeft={(time) => setTimeLeft(time)}
				/>
			</Coachmark>
		);
	};

	return (
		<Wrapper
			{...props}
			title={chatData?.doctorData?.name}
			desc={chatData?.doctorData?.job_title}
			header={!fileTemp}
			headerImage={chatData?.doctorData?.photo}
			footer={true}
			footerComponent={chatData != null ? renderFooterButton() : null}
			additionalHeaderComponent={
				!fileTemp && chatData != null ? renderDuration() : null
			}
			coachmarkHeaderData={{
				title: 'Detail Informasi Dokter dan Pasien',
				desc: 'Anda bisa melihat informasi profil dokter dan Anda disini.',
				isShow: isShowCoachmarkHeader,
				onPressNext: onPressNextCoachmarkHeader,
				dotLength: 3,
				dotActivePosition: 1,
			}}
			isOverlay={
				isShowCoachmarkHeader ||
				isShowCoachmarkDuration ||
				isShowCoachmarkAddButton ||
				isShowCoachmarkResend != null
			}
			onClickHeaderTitle={async () => {
				await getConsulUserDetail('doctor');
				setIsOpenBottomsheetDetail(true);
			}}
			additionalClassNameContent={fileTemp ? 'd-flex' : ''}
			isDataEmpty={chatData == null}
			// contentRef={contentRef}
		>
			{fileTemp ? (
				<Gallery data={fileTemp} />
			) : (
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<div
						style={{
							flex: 1,
							padding: 16,
						}}
					>
						{renderSummary()}
						<div className="mg-t-16">{renderChatList()}</div>
						{/* <Receipt /> */}
					</div>
				</div>
			)}

			<PopupBottomsheetDetailChat
				isSwipeableOpen={isOpenBottomsheetDetail}
				setIsSwipeableOpen={(isOpen) => {
					setIsOpenBottomsheetDetail(isOpen);
				}}
				activeTab={activeTab}
				setActiveTab={(tabIndex) => {
					setActiveTab(tabIndex);
				}}
			/>
			<PreviewImage
				data={previewImageData}
				setData={(data) => setPreviewImageData(data)}
			/>
		</Wrapper>
	);
};

export default ChatDetail;

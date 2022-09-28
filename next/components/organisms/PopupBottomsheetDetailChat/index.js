import React, { useEffect, useState } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { getConsulUser } from '../../../helper';
import { ButtonHighlight } from '../../atoms';
import PopupBottomsheet from '../PopupBottomsheet';

const PopupBottomsheetDetailChat = ({
	isSwipeableOpen = false,
	setIsSwipeableOpen = () => {},
	// data,
	// doctorData,
	// patientData,
	setActiveTab = () => {},
	activeTab = 0,
}) => {
	// const [dataPatient, setDataPatient] = useState([]);
	// const [dataDoctor, setDataDoctor] = useState([]);

	const [doctorData, setDoctorData] = useState();
	const [patientData, setPatientData] = useState();

	useEffect(() => {
		if (!isSwipeableOpen) {
			setTimeout(() => setActiveTab(0), 500);
		}
	}, [isSwipeableOpen]);

	useEffect(() => {
		if (isSwipeableOpen) {
			getData();
		}
	}, [isSwipeableOpen, activeTab]);

	const getData = async () => {
		let res = await getConsulUser(
			global.orderNumber,
			activeTab == 0 ? 'doctor' : 'patient',
		);
		if (activeTab == 0) {
			setDoctor(res?.data);
		} else {
			setPatient(res?.data);
		}
	};

	const setPatient = (params) => {
		setPatientData([
			{ desc: 'Nama Pasien', value: params?.name },
			{
				desc: 'Usia',
				value: params?.age ? params?.age + ' Tahun' : null,
			},
			{
				desc: 'Jenis Kelamin',
				value:
					params?.gender == 'MALE'
						? 'Laki Laki'
						: params?.gender == 'FEMALE'
						? 'Perempuan'
						: null,
			},
			{
				desc: 'Pekerjaan',
				value: params?.occupation,
			},
			{
				desc: 'Alamat',
				value: params?.address,
			},
			{
				desc: 'Tinggi Badan',
				value: params?.body_height ? params?.body_height + ' cm' : null,
			},
			{
				desc: 'Berat Badan',
				value: params?.body_weight ? params?.body_weight + ' kg' : null,
			},
			{
				desc: 'Keluhan',
				value: params?.medical_complaint,
			},
			{
				desc: 'Obat yang biasa diminum',
				value: params?.often_used_medication,
			},
			{
				desc: 'Riwayat Alergi',
				value: params?.preexisting_allergy,
			},
		]);
	};

	const setDoctor = (params) => {
		setDoctorData([
			{ desc: 'Nama Dokter', value: params?.name },
			{ desc: 'Spesialisasi', value: params?.specialization },
			{
				desc: 'Durasi Pengalaman Kerja',
				value: params?.experience_years
					? params?.experience_years + ' Tahun'
					: null,
			},
			{
				desc: 'Lokasi Praktek',
				value: params?.practice_location,
			},
			{
				desc: 'Pendidikan',
				value: params?.education,
			},
			{
				desc: 'Nomor STR',
				value: params?.str,
			},
			{
				desc: 'Nomor SIP',
				value: params?.sip,
			},
		]);
	};

	const renderDataItemDetailData = (element, id) => {
		if (element.type == 'image') {
			return (
				<img
					src={element.value}
					className="img-fit-cover rounded-16"
					key={id}
				/>
			);
		} else if (element.type == 'array-text') {
			return (
				<div className="flex-1 mg-t-16" key={id}>
					<p className="font-12 tx-roboto-medium tx-gray-2">
						{element.desc}
					</p>
					{element.value.map((elementVal, id) => {
						return (
							<p
								className="font-14 mg-t-8 tx-roboto-medium"
								key={id}
							>
								{elementVal}
							</p>
						);
					})}
				</div>
			);
		} else {
			return (
				<div className="flex-1 mg-t-16" key={id}>
					<p className="font-12 tx-roboto-medium tx-gray-2">
						{element.desc}
					</p>
					{element.value ? (
						<p className="font-14 mg-t-8 tx-roboto-medium">
							{element.value}
						</p>
					) : (
						<p className="font-14 mg-t-8 tx-roboto-medium tx-red">
							Belum diisi
						</p>
					)}
				</div>
			);
		}
	};

	return (
		<PopupBottomsheet
			isSwipeableOpen={isSwipeableOpen}
			setIsSwipeableOpen={(isOpen) => {
				setIsSwipeableOpen(isOpen);
				if (!isOpen) {
					setActiveTab(0);
				}
			}}
			headerComponent={
				<Nav tabs className="d-flex flex-1 mg-t-26 box-shadow-bottom">
					<NavItem className="flex-1">
						<NavLink
							className={activeTab == 0 ? 'active' : 'tx-gray-3'}
							onClick={() => setActiveTab(0)}
						>
							INFORMASI DOKTER
						</NavLink>
					</NavItem>
					<NavItem className="flex-1 align-item-center">
						<NavLink
							className={activeTab == 1 ? 'active' : 'tx-gray-3'}
							onClick={() => setActiveTab(1)}
						>
							INFORMASI PASIEN
						</NavLink>
					</NavItem>
				</Nav>
			}
			footerComponent={
				<ButtonHighlight
					className="pd-16"
					onClick={() => setIsSwipeableOpen(false)}
					text="TUTUP"
				/>
			}
		>
			<div className="tx-black">
				<TabContent activeTab={activeTab}>
					<TabPane tabId={0}>
						<div className="pd-16">
							{doctorData?.image && (
								<img
									src={doctorData?.image}
									className="img-fit-cover rounded-16"
								/>
							)}

							{doctorData?.map((element, id) =>
								renderDataItemDetailData(
									element,
									'doctorData_' + id,
								),
							)}
							{/* <div className="flex-1 mg-t-16">
								<p className="font-12 tx-roboto-medium tx-gray-2">
									Nama Dokter
								</p>
								<p className="font-14 mg-t-8 tx-roboto-medium">
									{doctorData?.name ?? '-'}
								</p>
							</div>
							<div className="flex-1 mg-t-16">
								<p className="font-12 tx-roboto-medium tx-gray-2">
									Spesialisasi
								</p>
								<p className="font-14 mg-t-8 tx-roboto-medium">
									{doctorData?.specialization ?? '-'}
								</p>
							</div>
							<div className="flex-1 mg-t-16">
								<p className="font-12 tx-roboto-medium tx-gray-2">
									Durasi Pengalaman Kerja
								</p>
								<p className="font-14 mg-t-8 tx-roboto-medium">
									{doctorData?.experience_years ?? '-'}
								</p>
							</div>
							<div className="flex-1 mg-t-16">
								<p className="font-12 tx-roboto-medium tx-gray-2">
									Lokasi Praktek
								</p>
								<p className="font-14 mg-t-8 tx-roboto-medium">
									{doctorData?.practice_location ?? '-'}
								</p>
							</div>
							<div className="flex-1 mg-t-16">
								<p className="font-12 tx-roboto-medium tx-gray-2">
									Pendidikan
								</p>
								<p className="font-14 mg-t-8 tx-roboto-medium">
									{doctorData?.education ?? '-'}
								</p>
							</div>
							<div className="flex-1 mg-t-16">
								<p className="font-12 tx-roboto-medium tx-gray-2">
									Nomor STR
								</p>
								<p className="font-14 mg-t-8 tx-roboto-medium">
									{doctorData?.str ?? '-'}
								</p>
							</div>
							<div className="flex-1 mg-t-16">
								<p className="font-12 tx-roboto-medium tx-gray-2">
									Nomor SIP
								</p>
								<p className="font-14 mg-t-8 tx-roboto-medium">
									{doctorData?.sip ?? '-'}
								</p>
							</div> */}
						</div>
					</TabPane>
					<TabPane tabId={1}>
						<div className="pd-16">
							{patientData?.map((element, id) =>
								renderDataItemDetailData(
									element,
									'patientData_' + id,
								),
							)}
							{/* <div className="flex-1 mg-t-16">
								<p className="font-12 tx-roboto-medium tx-gray-2">
									Nama Pasien
								</p>
								<p className="font-14 mg-t-8 tx-roboto-medium">
									{patientData?.name ?? '-'}
								</p>
							</div>
							<div className="flex-1 mg-t-16">
								<p className="font-12 tx-roboto-medium tx-gray-2">
									Usia
								</p>
								<p className="font-14 mg-t-8 tx-roboto-medium">
									{patientData?.age ?? '-'}
								</p>
							</div>
							<div className="flex-1 mg-t-16">
								<p className="font-12 tx-roboto-medium tx-gray-2">
									Jenis Kelamin
								</p>
								<p className="font-14 mg-t-8 tx-roboto-medium">
									{patientData?.gender == 'MALE'
										? 'Laki Laki'
										: patientData?.gender == 'FEMALE'
										? 'Perempuan'
										: '-'}
								</p>
							</div>
							<div className="flex-1 mg-t-16">
								<p className="font-12 tx-roboto-medium tx-gray-2">
									Alamat
								</p>
								<p className="font-14 mg-t-8 tx-roboto-medium">
									{patientData?.address ?? '-'}
								</p>
							</div>
							<div className="flex-1 mg-t-16">
								<p className="font-12 tx-roboto-medium tx-gray-2">
									Tinggi Badan
								</p>
								<p className="font-14 mg-t-8 tx-roboto-medium">
									{`${patientData?.body_height ?? '-'} cm`}
								</p>
							</div>
							<div className="flex-1 mg-t-16">
								<p className="font-12 tx-roboto-medium tx-gray-2">
									Berat Badan
								</p>
								<p className="font-14 mg-t-8 tx-roboto-medium">
									{`${patientData?.body_weight ?? '-'} cm`}
								</p>
							</div>
							<div className="flex-1 mg-t-16">
								<p className="font-12 tx-roboto-medium tx-gray-2">
									Keluhan
								</p>
								<p className="font-14 mg-t-8 tx-roboto-medium">
									{patientData?.medical_complaint ?? '-'}
								</p>
							</div>
							<div className="flex-1 mg-t-16">
								<p className="font-12 tx-roboto-medium tx-gray-2">
									Obat yang biasa diminum
								</p>
								<p className="font-14 mg-t-8 tx-roboto-medium">
									{patientData?.often_used_medication ?? '-'}
								</p>
							</div>
							<div className="flex-1 mg-t-16">
								<p className="font-12 tx-roboto-medium tx-gray-2">
									Riwayat alergi
								</p>
								<p className="font-14 mg-t-8 tx-roboto-medium">
									{patientData?.preexisting_allergy ?? '-'}
								</p>
							</div> */}
						</div>
					</TabPane>
				</TabContent>
			</div>
		</PopupBottomsheet>
	);
};

export default PopupBottomsheetDetailChat;

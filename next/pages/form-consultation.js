import React, { useEffect, useState } from 'react';
import Router from 'next/router';

import {
	ButtonHighlight,
	InputForm,
	PopupBottomsheetConfirmation,
	Wrapper,
} from '../components';
import { Input, Label } from 'reactstrap';
import {
	CONFIRMATION_CONST,
	CONFIRMATION_KEY_CONST,
	getParsedLocalStorage,
	INPUTFORM_CONST,
	LOCALSTORAGE,
	removeLocalStorage,
	setStringifyLocalStorage,
} from '../helper';
import { TNC_CONST } from './tnc';

const FormConsultation = (props) => {
	const orderid = 'a1asd1dax2dd12q3d';
	const [forms, setForms] = useState([]);
	const [activeForm, setActiveForm] = useState(0);
	const [isDisabledNext, setIsDisabledNext] = useState(false);
	const [confirmationButtonData, setConfirmationButtonData] = useState(false);
	const initialForms = [
		[
			{
				name: FORM_CONSULTATION.NAME,
				title: 'Nama',
				isRequired: true,
				placeholder: 'Masukkan Nama',
				max_length: 500,
			},
			{
				name: FORM_CONSULTATION.AGE,
				inputmode: 'numeric',
				max_length: 3,
				className: 'pos-relative',
				title: 'Tanggal Lahir',
				isRequired: true,
				placeholder: '0',
				bottom_label:
					'Jika usia kurang dari 1 tahun maka tahun diisi 0',
			},
			{
				name: FORM_CONSULTATION.GENDER,
				title: 'Jenis Kelamin',
				isRequired: true,
				value: null,
				options: [
					{
						id: 1,
						name: 'LAKI-LAKI',
					},
					{
						id: 2,
						name: 'PEREMPUAN',
					},
				],
				type: INPUTFORM_CONST.options_radio,
			},
			{
				name: FORM_CONSULTATION.ADDRESS,
				title: 'Alamat',
				isRequired: false,
				type: INPUTFORM_CONST.textarea,
				placeholder: 'Nama Jalan, No. Rumah / Gedung',
				bottom_label: 'Ketik secara lengkap alamat Anda',
				max_length: 500,
				counter_visible: true,
			},
		],
		[
			{
				name: FORM_CONSULTATION.SYMPTOMS,
				title: 'Keluhan',
				placeholder: 'Masukkan Keluhan',
				isRequired: true,
				max_length: 500,
			},
			{
				name: FORM_CONSULTATION.ALLERGIC,
				title: 'Riwayat Alergi',
				placeholder: 'Masukkan Riwayat Alergi',
				isRequired: true,
				bottom_label: 'Ketik “Tidak Ada” jika tidak memiliki.',
				max_length: 500,
			},
			{
				name: FORM_CONSULTATION.MEDICINE_USED,
				title: 'Obat yang biasa diminum',
				placeholder: 'Obat yang biasa diminum',
				isRequired: true,
				bottom_label: 'Ketik “Tidak Ada” jika tidak memiliki.',
				max_length: 500,
			},
			{
				name: FORM_CONSULTATION.HEIGHT,
				inputmode: 'numeric',
				max_length: 3,
				title: 'Tinggi Badan (cm)',
				placeholder: 'Masukkan Tinggi Badan (cm)',
			},
			{
				name: FORM_CONSULTATION.WEIGHT,
				inputmode: 'numeric',
				max_length: 3,
				title: 'Berat Badan (kg)',
				placeholder: 'Masukkan Berat Badan (kg)',
			},
			{
				name: FORM_CONSULTATION.JOB,
				title: 'Pekerjaan Saat Ini',
				placeholder: 'Pilih Pekerjaan Saat Ini',
				isRequired: false,
				type: INPUTFORM_CONST.dropdown,
				options_title: 'Pilih Pekerjaan',
				options: [
					{
						id: 0,
						name: 'Pegawai Swasta',
						textbox_active: 0,
					},
					{
						id: 1,
						name: 'Pegawai Negeri',
						textbox_active: 0,
					},
					{
						id: 2,
						name: 'Ibu Rumah Tangga',
						textbox_active: 0,
					},
					{
						id: 3,
						name: 'Pekerjaan Lainnya',
						textbox_active: 1,
					},
				],
				other_placeholder: 'Masukkan Pekerjaan Lainnya',
			},
		],
	];

	useEffect(() => {
		checkFormsFromLocalStorage();
	}, []);

	useEffect(() => {
		console.log(
			'form',
			forms,
			forms[activeForm]?.findIndex(
				(e) =>
					e?.isRequired &&
					(e?.value == null ||
						(e?.type != INPUTFORM_CONST.dropdown &&
							e?.value == '')),
			),
		);
		setIsDisabledNext(
			forms[activeForm]?.some(
				(e) =>
					e?.isRequired &&
					(e?.value == null ||
						(e?.type != INPUTFORM_CONST.dropdown &&
							e?.value == '')),
			),
		);
	}, [forms, activeForm]);

	const checkFormsFromLocalStorage = async () => {
		var trackProgressForm = (await getParsedLocalStorage(
			LOCALSTORAGE.FORM_CONSULTATION,
		)) ?? { orderId: orderid, forms: [] };
		let formsTemp = Object.assign([], initialForms);
		if (trackProgressForm.orderId != orderid) {
			await removeLocalStorage(LOCALSTORAGE.FORM_CONSULTATION);
			setForms(initialForms);
		} else {
			console.log('trackProgressForm', trackProgressForm);
			if (trackProgressForm.forms.length) {
				trackProgressForm.forms.forEach((element) => {
					['patient information', 'medical data'].forEach(
						(elementTypes, i) => {
							let idx = formsTemp[i]?.findIndex(
								(e) => e.name == element.name,
							);
							if (idx > -1) {
								if (
									formsTemp[i][idx].type ==
									INPUTFORM_CONST.dropdown
								) {
									formsTemp[i][idx].value = element?.value.id;
									formsTemp[i][idx].valueText =
										element?.value.valueText;
								} else {
									formsTemp[i][idx].value = element?.value;
								}
							}
						},
					);
				});
				setForms(formsTemp);
			} else {
				setForms(formsTemp);
			}
		}
	};

	const updateFormLocalStorage = async (name, type, value, isRequired) => {
		var trackProgressForm = (await getParsedLocalStorage(
			LOCALSTORAGE.FORM_CONSULTATION,
		)) ?? { orderId: orderid, forms: [] };
		let idx = trackProgressForm.forms?.findIndex((e) => e.name == name);
		if (
			(type == INPUTFORM_CONST.dropdown && value != null) ||
			(type != INPUTFORM_CONST.dropdown && value != null && value != '')
		) {
			if (idx == -1) {
				trackProgressForm.forms.push({
					name: name,
					value: value,
					isRequired: isRequired,
				});
			} else {
				trackProgressForm.forms[idx] = {
					name: name,
					value: value,
					isRequired: isRequired,
				};
			}
		} else {
			if (idx > -1) {
				trackProgressForm.forms.splice(idx, 1);
			} else {
				return;
			}
		}
		await setStringifyLocalStorage(
			LOCALSTORAGE.FORM_CONSULTATION,
			trackProgressForm,
		);
	};

	const onItemClick = (item) => {
		console.log('clicked', item);
		Router.push({
			pathname: '/chat-detail',
			query: item,
		});
	};

	const onChangeForm = ({ name, type, formId, value }) => {
		console.log('res changee year ', name, type, formId);
		let formsTemp = Object.assign([], forms);
		updateFormLocalStorage(
			name,
			type,
			value,
			formsTemp[activeForm][formId].isRequired,
		);
		if (type == INPUTFORM_CONST.dropdown) {
			formsTemp[activeForm][formId].value = value?.id;
			formsTemp[activeForm][formId].valueText = value?.valueText;
		} else {
			formsTemp[activeForm][formId].value = value;
		}

		setForms(formsTemp);
	};

	const onOpenTnC = (type) => {
		Router.push({
			pathname: '/tnc',
			query: {
				title: type,
			},
		});
	};

	const renderFooterButton = () => {
		if (activeForm == 0) {
			return (
				<div className="pd-16 box-shadow-m">
					<Label
						check
						className="tx-black"
						style={{ paddingBottom: 16 }}
					>
						<Input
							type="checkbox"
							id="same-as-profile"
							className="mg-r-16"
						/>
						Isi otomatis sesuai profil
					</Label>
					<ButtonHighlight
						text="LANJUT"
						isDiabled={isDisabledNext}
						onClick={() => setActiveForm(1)}
					/>
				</div>
			);
		} else {
			return (
				<div className="pd-16 box-shadow-m">
					<p className="font-16">
						Dengan menekan tombol mulai saya setuju dengan{' '}
						<a
							className="tx-link"
							onClick={() => onOpenTnC(TNC_CONST.tnc)}
						>
							Syarat Ketentuan
						</a>{' '}
						dan{' '}
						<a
							className="tx-link"
							onClick={() => onOpenTnC(TNC_CONST.privacy_policy)}
						>
							Kebiiakan Privasi
						</a>
						.
					</p>
					<div className="row mg-t-16">
						<ButtonHighlight
							color="grey"
							onClick={() => setActiveForm(0)}
							text="KEMBALI"
						/>
						<ButtonHighlight
							onClick={() =>
								setConfirmationButtonData(
									CONFIRMATION_KEY_CONST.FORM_CONFIRMATION,
								)
							}
							text="SIMPAN"
							isDiabled={isDisabledNext}
						/>
					</div>
				</div>
			);
		}
	};

	return (
		<Wrapper
			{...props}
			title="Form Konsultasi"
			header={true}
			footer={true}
			footerComponent={renderFooterButton()}
			onClickBack={() =>
				setConfirmationButtonData(
					CONFIRMATION_KEY_CONST.BACK_CONFIRMATION,
				)
			}
		>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div
					style={{
						flex: 1,
						padding: 16,
					}}
				>
					<div className="tx-black">
						{forms[activeForm]?.map((element, id) => (
							<InputForm
								key={'forms' + activeForm + id}
								formId={id}
								className={element?.className}
								data={element}
								onChange={onChangeForm}
							/>
						))}
					</div>
				</div>
			</div>
			<PopupBottomsheetConfirmation
				data={
					confirmationButtonData
						? CONFIRMATION_CONST[confirmationButtonData]
						: null
				}
				callback={(res) => {
					if (res) {
						if (
							confirmationButtonData ==
							CONFIRMATION_KEY_CONST.BACK_CONFIRMATION
						) {
							Router.back();
						} else if (
							confirmationButtonData ==
							CONFIRMATION_KEY_CONST.FORM_CONFIRMATION
						) {
							Router.back();
						}
					}
					setConfirmationButtonData(null);
				}}
			/>
		</Wrapper>
	);
};
export default FormConsultation;

export const FORM_CONSULTATION = {
	NAME: 'NAME',
	BIRTHDATE: 'BIRTHDATE',
	AGE: 'AGE',
	GENDER: 'GENDER',
	ADDRESS: 'ADDRESS',
	HEIGHT: 'HEIGHT',
	WEIGHT: 'WEIGHT',
	JOB: 'JOB',
	ALLERGIC: 'ALLERGIC',
	MEDICINE_USED: 'MEDICINE_USED',
	SYMPTOMS: 'SYMPTOMS',

	//IL
	WEIGHT: 'WEIGHT',
	HEIGHT: 'HEIGHT',
};

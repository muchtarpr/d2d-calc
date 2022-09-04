import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { CardBox } from '../../atoms';

import { ButtonHighlight } from '../../atoms';
import {
	IconReceiptApplied,
	IconReceiptNotApplied,
	IconReceiptNotes,
	IconEmptyImage,
} from '../../../assets/index.js';
import Image from 'next/image';

import { getPrescription } from '../../../redux/actions/generalAction';
import Router from 'next/router';

const Receipt = ({ general, detailPrescription }) => {
	const [receiptStatus, setReceiptStatus] = useState('approve');
	const [expired, setExpired] = useState(false);
	const [data, setData] = useState(null);

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		let res = await detailPrescription(123);
		const result = res?.results;
		setData(result);

		if (result?.status == 'EXPIRED') setExpired(true);
	};

	const body = (
		<div>
			{receiptStatus == 'approve' && (
				<>
					<div>
						{data?.data?.prescription.map((val, i) => {
							return (
								<div key={i} className="d-flex gap-3 pd-b-16">
									<div>
										{val?.image ? (
											<Image
												alt=""
												width={'40px'}
												height={'40px'}
												src={val?.image}
											/>
										) : (
											<IconEmptyImage />
										)}
									</div>
									<div>
										<div className="tx-16 tx-roboto-medium tx-spacing-015">
											{val?.name}
										</div>
										<div className="tx-14 tx-roboto-medium tx-green ">
											{val?.consumption} •{' '}
											{val?.consumption_note}
										</div>
									</div>
								</div>
							);
						})}
					</div>
					<div>
						<ButtonHighlight
							color="grey-link"
							text="LIHAT DETAIL"
							onClick={() =>
								Router.push({
									pathname: '/prescription-detail',
								})
							}
						/>
					</div>
				</>
			)}
			{receiptStatus == 'reject' && (
				<>
					<div>
						<div className="d-flex gap-3 pd-b-16">
							<div>
								<IconEmptyImage />
							</div>
							<div>
								<div className="tx-16 tx-roboto-medium tx-gray-2 tx-spacing-015">
									Resep Ditolak
								</div>
								<div className="tx-14 tx-roboto-medium tx-danger ">
									Ditolak
								</div>
							</div>
						</div>
					</div>
					<div>
						<div className="tx-12 tx-roboto-medium tx-gray-2 tx-spacing-019">
							Alasan Penolakan
						</div>
						<div className="tx-14 tx-roboto-medium tx-spacing-025">
							Obat tidak diperlukan
						</div>
					</div>
				</>
			)}
		</div>
	);

	const bodyNotes = (
		<>
			<div>
				{data?.data?.patient_note?.resume && (
					<>
						<div className="pd-b-12 tx-16 tx-roboto-medium tx-spacing-015">
							Resume
						</div>
						<p className="tx-16 tx-spacing-015">
							{data?.data?.patient_note?.resume}
						</p>
					</>
				)}

				{data?.data?.patient_note?.diagnose && (
					<>
						<div className="pd-b-12 tx-16 tx-roboto-medium tx-spacing-015">
							Diagnosis berdasarkan ICD-10
						</div>
						<p className="tx-16 tx-spacing-015">
							{data?.data?.patient_note?.diagnose?.desc}
						</p>
						<div className="pd-b-12 tx-16 tx-roboto-medium tx-spacing-015">
							Saran Dokter
						</div>
						<p className="tx-16 tx-spacing-015">
							{data?.data?.patient_note?.diagnose?.suggestion}
						</p>
					</>
				)}
			</div>
		</>
	);

	return (
		<>
			<CardBox
				className="card-border overflow-hidden"
				icon={
					expired ? <IconReceiptNotApplied /> : <IconReceiptApplied />
				}
				titleClass={expired ? 'card-chat-red' : 'card-chat-gray'}
				title={
					expired
						? 'Resep Elektronik Tidak Berlaku'
						: 'Resep Elektronik'
				}
				body={body}
			/>
			<div className="mg-b-20"></div>
			<CardBox
				className="card-border-16px overflow-hidden"
				icon={<IconReceiptNotes />}
				title="Catatan Pasien"
				body={bodyNotes}
			/>
		</>
	);
};

const mapStateToProps = (state) => ({
	general: state.general,
});

const mapDispatchToProps = (dispatch) => ({
	detailPrescription: (id) => dispatch(getPrescription(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Receipt);

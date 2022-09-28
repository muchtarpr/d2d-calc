import React, { useEffect, useState } from 'react';
import { IconPrescriptionExpired, IconWarningGreen } from '../assets/index.js';
import { DetailItem, HeaderInfo, Wrapper } from '../components/index.js';
import { DETAIL_ITEM } from '../components/organisms/DetailItem/index.js';
import { getPrescriptionDetail } from '../helper/Network/prescription/index.js';
import {
	encryptData,
	decryptData
} from '../helper';


const PrescriptionDetail = (props) => {
	const orderid = 'a1asd1dax2dd12q3d';
	const [data, setData] = useState(null);

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		let res = await getPrescriptionDetail(123);
		console.log('res', res);
		decryptData(res?.results?.encrypted_value);
		setData(res?.results);
	};

	const renderHeader = () => {
		return (
			<HeaderInfo
				data={{
					isAvailable: data?.status == PRESCRIPTION_CONST.VALID,
					icon:
						data?.status == PRESCRIPTION_CONST.VALID ? (
							<IconWarningGreen />
						) : (
							<IconPrescriptionExpired />
						),
					desc: data?.status_desc,
				}}
			/>
		);
	};

	return (
		<Wrapper
			{...props}
			title={'Detail Resep Elektronik'}
			header={true}
			footer={false}
			additionalHeaderComponent={renderHeader()}
		>
			<div className="pos-relative minh-100">
				<DetailItem
					data={{
						title: 'Fasilitas Kesehatan',
						list: data?.data?.medical_facility,
					}}
				/>
				<DetailItem
					data={{
						title: 'Dokter',
						list: data?.data?.doctor,
					}}
				/>
				<DetailItem
					type={DETAIL_ITEM.PRODUCT}
					data={{
						title: 'Produk',
						list: data?.data?.prescription,
					}}
				/>
				<DetailItem
					data={{
						title: 'Pasien',
						list: data?.data?.patient,
					}}
				/>
				{data?.status == PRESCRIPTION_CONST.EXPIRED && (
					<div className="pos-absolute filter-gray bg-watermark-prescription" />
				)}
			</div>
		</Wrapper>
	);
};

export default PrescriptionDetail;

export var PRESCRIPTION_CONST = {
	VALID: 'VALID',
	EXPIRED: 'EXPIRED',
};

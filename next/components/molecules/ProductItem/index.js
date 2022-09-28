import React, { useEffect, useRef, useState } from 'react';
import { IconAddBlue, IconEmptyProduct } from '../../../assets';
import { TextLabel } from '../../atoms';

const ProductItem = ({ data }) => {
	return (
		<div className="bd-gray-2 bd bd-1 rounded-8 mg-x-16 mg-b-16 pd-16">
			<div className="d-flex flex-1 align-items-center">
				{data?.image ? (
					<img
						src={data?.image}
						height={40}
						width={40}
						className="rounded-8"
					/>
				) : (
					<IconEmptyProduct />
				)}

				<div className="flex-1 mg-l-16">
					<p className="font-16 tx-roboto-medium mg-b-5">
						{data?.name}
					</p>
					<p className="font-14 mg-b-0 tx-green">
						{data?.consumption + ' • ' + data?.consumption_note}
					</p>
				</div>
			</div>
			<TextLabel
				data={{
					label: 'Waktu',
					value:
						data?.consumption_times && data?.consumption_times != ''
							? data?.consumption_times
							: '-',
				}}
			/>
			<TextLabel
				data={{
					label: 'Catatan',
					value: data?.note && data?.note != '' ? data?.note : '-',
				}}
			/>
		</div>
	);
};
export default ProductItem;

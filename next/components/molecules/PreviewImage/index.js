import React, { useEffect, useRef, useState } from 'react';
import { IconAddBlue, IconCloseRound, IconEmptyProduct } from '../../../assets';
import { TextLabel } from '../../atoms';

const PreviewImage = ({ data, setData = () => {} }) => {
	useEffect(() => {
		console.log('isShowing', data);
	}, [data]);

	if (!data) return null;
	return (
		<div className="absolute-0 flex-1 align-items-center d-flex flex-column bg-black-8 z-index-10 pd-b-32">
			<img
				className="img-contain flex-1 mx-wd-100p "
				style={{ maxHeight: 'calc(100% - 112px' }}
				src={data?.source}
			/>

			<IconCloseRound
				className="mg-y-32 link-cursor"
				onClick={() => {
					console.log('ke klik');
					setData(null);
				}}
			/>
		</div>
	);
};
export default PreviewImage;

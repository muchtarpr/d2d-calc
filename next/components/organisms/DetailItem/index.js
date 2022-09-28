import React, { useEffect, useState } from 'react';
import {
	Button,
	FormGroup,
	Input,
	Label,
	Popover,
	PopoverBody,
} from 'reactstrap';
import { TextLabel } from '../../atoms';
import { ProductItem } from '../../molecules';

const DetailItem = ({ data, classNameContainer, className, type = null }) => {
	useEffect(() => {
		console.log('data', data);
	}, [data]);

	const renderTitle = () => {
		return (
			<div className={'flex-1 pd-x-16 pd-y-12 box-light-yellow'}>
				<p className="font-16 tx-roboto-medium">{data?.title ?? '-'}</p>
			</div>
		);
	};
	const renderBody = () => {
		if (type != null && type == DETAIL_ITEM.PRODUCT) {
			return (
				<div>
					<div className="bg-gray-2 mg-16 rounded-8">
						<p className="font-16 pd-y-12 pd-x-16">
							Resep elektronik hanya bisa ditebus ke toko yang
							berafiliasi dengan DKonsul di Tokopedia.
						</p>
					</div>
					{data?.list?.map((element, idx) => {
						return (
							<ProductItem
								data={element}
								key={'productitem-' + idx}
							/>
						);
					})}
				</div>
			);
		} else {
			return (
				<div className="mg-x-16 pd-b-16">
					{data?.list?.map((element, idx) => {
						return (
							<TextLabel data={element} key={'dataList-' + idx} />
						);
					})}
				</div>
			);
		}
	};
	return (
		<div>
			<div>
				{renderTitle()}
				{renderBody()}
			</div>
		</div>
	);
};

export default DetailItem;

export const DETAIL_ITEM = {
	PRODUCT: 'PRODUCT',
};

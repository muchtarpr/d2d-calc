import React, { useEffect } from 'react';
import { Alert, Input } from 'reactstrap';
import { IconBookmarkActive, IconBookmarkInactive } from '../../../assets';
import TextValue from '../TextValue';

const CalculatorListItem = ({ className, data, onClick = () => {} }) => {
	return (
		<div
			className={'pd-16 d-flex align-items-center ' + className}
			onClick={onClick}
		>
			<TextValue data={{ name: data?.title, desc: data?.desc }} />
			{data?.isChecked ? (
				<IconBookmarkActive />
			) : (
				<IconBookmarkInactive />
			)}
		</div>
	);
};
export default CalculatorListItem;

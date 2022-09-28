import React from 'react';

const TextValue = ({ data, className = '' }) => {
	return (
		<div className={'flex-1 ' + className}>
			<p className="font-16 tx-roboto-medium">{data?.name}</p>
			<p className="font-14 mg-t-8 tx-roboto-medium tx-gray-2">
				{data?.desc}
			</p>
		</div>
	);
};
export default TextValue;

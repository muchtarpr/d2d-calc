import React from 'react';

const TextLabel = ({ data, className = '' }) => {
	return (
		<div className={'flex-1 mg-t-16 ' + className}>
			<p className="font-12 tx-roboto-medium tx-gray-2">{data?.label}</p>
			<p className="font-14 mg-t-8 tx-roboto-medium">{data?.value}</p>
		</div>
	);
};
export default TextLabel;

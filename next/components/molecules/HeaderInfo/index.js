import React from 'react';
const HeaderInfo = ({ data }) => {
	return (
		<div className="d-flex flex-column">
			<div
				className={
					'd-flex flex-1 pd-x-16 pd-y-12 ' +
					(data?.isAvailable ? 'box-light-green' : 'box-light-red')
				}
			>
				{data?.icon}
				<p
					className={
						'tx-roboto-medium font-16 mg-l-16 flex-1 z-index-10 ' +
						(data?.isAvailable ? 'tx-green' : 'tx-red')
					}
				>
					{data?.desc ?? ''}
				</p>
			</div>
		</div>
	);
};
export default HeaderInfo;

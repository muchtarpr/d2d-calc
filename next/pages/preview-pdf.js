import React, { useEffect, useState } from 'react';
import { Wrapper } from '../components/index.js';
import Router from 'next/router';

const PreviewPdf = (props) => {
	const [data, setData] = useState(Router.query);

	useEffect(() => {
		console.log('router data', Router.query);
	}, []);

	return (
		<Wrapper
			{...props}
			title={'Pratinjau PDF'}
			header={true}
			footer={false}
			additionalClassNameContent={'overflow-y-hidden-force'}
		>
			<div className="ht-100p wd-100p">
				{data?.source && (
					<iframe
						className="ht-100p wd-100p"
						src={
							data?.source
								? data?.source + '#toolbar=0&navpanes=0'
								: null
						}
					/>
				)}
			</div>
		</Wrapper>
	);
};

export default PreviewPdf;

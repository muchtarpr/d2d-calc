import React from 'react';
import { Input } from 'reactstrap';

const InputFile = ({
	className,
	data,
	acceptedType,
	capture,
	onChange = () => {},
	body,
	values = null,
}) => {
	return (
		<div
			className={
				'custom-file-input flex-1 d-flex link-cursor align-items-center ' +
				className
			}
		>
			{body ?? (
				<div className="mg-0 pd-y-18 pd-x-16 bg-gray rounded-4 flex-1">
					<p className="mg-b-0 flex-1 text-break font-16">
						{data?.value ?? 'Pilih File'}
					</p>
				</div>
			)}
			<Input
				type="file"
				id="inputFile"
				onChange={(e) => {
					console.log('change', e.target.files?.length);
					onChange(e.target.files);
				}}
				accept={acceptedType}
				capture={capture}
				value=""
				multiple
			/>
		</div>
	);
};
export default InputFile;

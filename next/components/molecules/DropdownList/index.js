import React, { useEffect, useState } from 'react';
import { IconRadioOff, IconRadioOn } from '../../../assets';
import InputForm from '../InputForm';

const DropdownList = ({ title, data, selected, onChange = () => {} }) => {
	// default
	return (
		<div>
			{data?.map((element) => {
				return (
					<div
						className="d-flex pd-x-16 align-items-center btn-hover link-cursor"
						onClick={() =>
							onChange(
								element?.id,
								element?.textbox_active ? null : element?.name,
							)
						}
					>
						<p className="flex-1 mg-b-0 font-16">{element?.name}</p>
						{selected && element?.id == selected?.id ? (
							<IconRadioOn />
						) : (
							<IconRadioOff />
						)}
					</div>
				);
			})}
		</div>
	);
};

export default DropdownList;

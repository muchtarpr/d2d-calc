import React, { useEffect, useState } from 'react';
import {
	IconCameraGray,
	IconFileBlue,
	IconFileGray,
	IconGalleryBlue,
	IconGalleryGray,
} from '../../../assets';
import { PopupAlert } from '../../atoms';
import PopupBottomsheet from '../PopupBottomsheet';
import InputFile from '../../atoms/InputFile';
import { FILE_CONST } from '../../../helper';
import { uploadFile } from '../../../helper/Network/file';

const FilePicker = ({
	data,
	isSwipeableOpen = false,
	setIsSwipeableOpen = () => {},
	onChange = () => {},
}) => {
	const [isVisibleInputFileError, setIsVisibleInputFileError] =
		useState(false);
	const [alertMessage, setAlertMessage] = useState('');
	const [imgg, setimgg] = useState(null);

	const buttons = [
		{
			icon: <IconGalleryGray height={24} width={24} />,
			iconActive: <IconGalleryBlue height={24} width={24} />,
			name: 'Galeri',
			label: FILE_CONST.PHOTO,
			accept: 'image/jpeg, image/png',
			limit: 10,
		},
		{
			icon: <IconCameraGray height={24} width={24} />,
			name: 'Kamera',
			label: FILE_CONST.PHOTO,
			accept: 'image/jpeg, image/png',
			capture: 'camera',
			limit: 10,
		},
		{
			icon: <IconFileGray height={24} width={24} />,
			iconActive: <IconFileBlue height={24} width={24} />,
			name: 'File',
			label: FILE_CONST.FILE,
			accept: 'application/pdf',
			limit: 3,
		},
	];

	useEffect(() => {}, [isSwipeableOpen]);

	const handleOnChange = async (element, filesParams) => {
		let files = [...filesParams];
		console.log('files', files, files.length);
		if (files.length > element?.limit) {
			setAlertMessage(
				'Batas pilihan maksimum ' +
					element?.limit +
					' ' +
					element?.label +
					'.',
			);
			return;
		} else if (
			element.label == FILE_CONST.PHOTO &&
			files?.some((e) => e.type != 'image/jpeg' && e.type != 'image/png')
		) {
			setAlertMessage('Format gambar harus PNG/JPEG');
			return;
		} else if (
			element.label == FILE_CONST.FILE &&
			files?.some((e) => e.type != 'application/pdf')
		) {
			setAlertMessage('Format File harus PDF');
			return;
		}
		// console.log('fies', URL.createObjectURL(files[0]));

		var fileTemps = [...files]; //await getFilesUrl(files);
		// console.log('getFileResults', await getFileResults(files[0]));
		// console.log('filetemp', fileTemps);
		// await uploadFile(1, fileTemps);
		onChange({ type: element.label, files: fileTemps });

		setimgg(fileTemps);
	};

	return (
		<PopupBottomsheet
			expandOnContentDrag={false}
			isSwipeableOpen={isSwipeableOpen}
			setIsSwipeableOpen={(isOpen) => setIsSwipeableOpen(isOpen)}
			isWithCloseButton={true}
		>
			<div className="tx-black mg-t-30 d-flex flex-column">
				<div className="d-flex flex-1 mg-b-20">
					{buttons.map((element, index) => {
						return (
							<InputFile
								key={'inputFile' + index}
								data={data}
								acceptedType={element?.accept}
								capture={element?.capture}
								onChange={(val) => handleOnChange(element, val)}
								className="hover-gray"
								body={
									<div className="custom-file-input flex-column flex-1 d-flex align-items-center justify-content-center pd-b-16 pd-x-16 pd-t-8">
										<div className="mg-b-6 flex-1">
											{element.icon}
										</div>
										<p className="font-14 tx-gray-2">
											{element.name}
										</p>
									</div>
								}
							/>
						);
					})}
					{/* {imgg && (
						<Image
							alt=""
							width={'40px'}
							height={'40px'}
							src={imgg}
						/>
					)} */}
					{/* <Input
						type="file"
						name="file[]"
						multiple={true}
						onChange={(e) => {
							console.log('change', e.target.files.length);
						}}
					/> */}
				</div>
				<PopupAlert
					alertMessage={alertMessage}
					setAlertMessage={(msg) => setAlertMessage(msg)}
				/>
			</div>
		</PopupBottomsheet>
	);
};

export default FilePicker;

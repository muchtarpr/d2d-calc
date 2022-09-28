import React, { useEffect, useState } from 'react';
import { ImgFileBlue, ImgFileGray } from '../../../assets';
import { FILE_CONST, getFileResults, getUrls } from '../../../helper';
import { Document, pdfjs, Page } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Gallery = ({ data }) => {
	const [files, setFiles] = useState();
	const [activeFileIndex, setActiveFileIndex] = useState(0);
	const [activeFile, setActiveFile] = useState(null);

	useEffect(() => {
		console.log('data', data);
		setActiveFileIndex(0);
		if (data && data?.files?.length) {
			setFiles(data?.files);
		}
	}, [data]);

	useEffect(() => {
		if (files != null) {
			setActiveFile(null);

			getFile();
		}
	}, [activeFileIndex, files]);

	const getFile = async () => {
		let file =
			data?.type == FILE_CONST.PHOTO
				? getUrls(files[activeFileIndex])
				: getUrls(files[activeFileIndex]);
		console.log('file--', file);
		setActiveFile(file);
	};

	return (
		<div className="bg-black flex-1 align-items-center d-flex flex-column overflow-hidden">
			{activeFile ? (
				data?.type == FILE_CONST.PHOTO ? (
					<img
						src={activeFile}
						className="flex-1 img-contain wd-100v "
						style={{ maxHeight: 'calc(100% - 64px)' }}
					/>
				) : (
					<Document
						className="custom-pdf-container"
						file={activeFile}
						onDocumentComplete={() => console.log('complete')}
						onLoadError={() => {
							console.log('error');
						}}
						onLoadProgress={() => {
							console.log('progress');
						}}
						page={1}
					>
						<Page pageNumber={1} />
					</Document>
				)
			) : null}

			{files && files.length > 1 && (
				<div
					className=" bg-black mg-y-8  pd-y-6"
					style={{ height: 64, maxHeight: 64 }}
				>
					<div className=" max-wd-100v overflow-x-auto d-flex flex-1  pd-y-6">
						{files.map((element, index) =>
							data?.type == FILE_CONST.PHOTO ? (
								<img
									className={
										'mg-x-4 ' +
										(index == activeFileIndex
											? 'bd bd-3 bd-primary'
											: '')
									}
									src={getUrls(element)}
									key={'_filesGallery' + index}
									height={36}
									width={36}
									onClick={() => setActiveFileIndex(index)}
									style={{ flexShrink: 0 }}
								/>
							) : index == activeFileIndex ? (
								<img
									className={'mg-x-4 '}
									src={ImgFileBlue.src}
									key={'_imagesGallery' + index}
									height={36}
									width={36}
									onClick={() => setActiveFileIndex(index)}
								/>
							) : (
								<img
									className={'mg-x-4 '}
									src={ImgFileGray.src}
									key={'_imagesGallery' + index}
									height={36}
									width={36}
									onClick={() => setActiveFileIndex(index)}
								/>
							),
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default Gallery;

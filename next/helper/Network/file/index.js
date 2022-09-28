import snapConfig from '../../../config';
import { getFileResults } from '../../Image';
import { API } from '../API';
import { API_CALL, errorHandler } from '../requestHelper';

export const uploadFile = async (id, params) => {
	try {
		var files = [...params]; // await getFileResultsMultiple([...params]);
		// var formData = new FormData();
		// formData.append('order_number', 'DK220800053');
		// files.forEach((element) => {
		// 	formData.append('files', { uri: element, type: 'application/pdf' });
		// });

		// console.log('options form data', Object.fromEntries(formData));
		let a = await getFileResults(files[0]);

		const data = new FormData();
		data.append('order_number', 'DK220800053');
		data.append('files', files[0]);

		let datajson = {
			id: 'DK220800053',
			files: files[0],
			ff: a,
		};

		const options = {
			url: snapConfig.BASE_API_URL + API.FILE_UPLOAD,
			data: datajson,
			method: 'POST',
		};
		console.log('options network', options);

		// console.log(
		// 	'options network data',
		// 	files,
		// 	Object.fromEntries(formData),
		// );
		// return null;

		let response = await API_CALL(options, 'multipart/form-data');
		// let response = await API_CALL(options);
		return response;
	} catch (error) {
		console.log('error on upload file : ', error);
		return errorHandler(error);
	}
};

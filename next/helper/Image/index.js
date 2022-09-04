export const getFilesUrl = (files) =>
	new Promise(async (resolve, reject) => {
		try {
			var fileTemps = [];

			[...files].forEach(async (element) => {
				let file = getUrls(element);
				// console.log('file', file);
				fileTemps.push(file);
			});
			resolve(fileTemps);
		} catch (error) {
			console.log('error on get files url : ', error);
			reject(error);
		}
	});

export const getUrls = (file) => {
	return URL.createObjectURL(file);
};

export const getFilesResultUrl = (files) => {
	try {
		var fileTemps = [];

		[...files].forEach(async (element) => {
			let file = await getFileResults(element);
			fileTemps.push(file);
		});
		return fileTemps;
	} catch (error) {
		console.log('error on get files url : ', error);
		return error;
	}
};

export const getFileResultsMultiple = async (params) => {
	const temp = params.map(async (e) => {
		let eTemp = await getUrls(e);
		return eTemp;
	});

	const res = await Promise.all(temp);
	return res;
};

export const getFileResults = (params) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(params);
		reader.onload = () => {
			// console.log('read', reader.result);
			resolve(reader.result);
		};
		reader.onerror = (error) => reject(error);
	});

import moment from 'moment';

export const getFormattedTimeFromSeconds = (seconds = 0, format = 'mm:ss') => {
	var res = null;
	if (seconds > 3599 && format == 'mm:ss') {
		format = 'HH:mm:ss';
	}
	try {
		res = moment('1945-08-17 00:00:00')
			.add(seconds, 'seconds')
			.format(format);
	} catch (error) {
		console.log('error on  : ', error);
	} finally {
		return res;
	}
};

export const getFormattedTimeFromDate = (
	date = moment().utc(),
	format = 'HH:mm',
) => {
	var res = null;
	try {
		res = moment(date).format(format);
	} catch (error) {
		console.log('error on  : ', error);
	} finally {
		return res;
	}
};

export const getTimeLeft = (time) => {
	let timeleft = Math.floor(
		moment.duration(moment(time).diff(moment())).asSeconds(),
	);
	console.log('timeleft', timeleft);
	return timeleft;
};

export const calculateAge = (birthdate) => {
	try {
		let age = moment().diff(birthdate, 'year', false);
		console.log('age', age, birthdate);
		return age;
	} catch (error) {
		console.log('error on error calculate birthdate : ', error);
		return null;
	}
};

export const calculateAgeDetail = (birthdate) => {
	try {
		var ageText = '';
		var age = moment().diff(birthdate, 'day', false);

		if (age >= 365) {
			ageText =
				Math.floor(age / 365) +
				' Tahun ' +
				(age % 365 > 0
					? Math.floor((age % 365) / 30) + ' Bulan '
					: '') +
				(age % 30 > 0 ? Math.floor(age % 30) + ' Hari' : '');
		} else if (age > 30) {
			ageText =
				Math.floor(age / 30) +
				' Bulan ' +
				(age % 30 > 0 ? Math.floor(age % 30) + ' Hari' : '');
		} else {
			ageText = age + ' Hari';
		}

		console.log('month age', age, ageText);
		return ageText;
	} catch (error) {
		console.log('error on error calculate birthdate : ', error);
		return null;
	}
};

export const calculateAgeYearMonth = (birthdate) => {
	try {
		const age = moment().diff(birthdate, 'day', false);
		const ageText =
			Math.floor(age / 365) +
			' Tahun ' +
			(age % 365 > 0
				? Math.floor((age % 365) / 30) + ' Bulan'
				: '0 Bulan');

		return ageText;
	} catch (error) {
		return null;
	}
};

export const GET_PRESCRIPTION = 'GENERAL/GET_PRESCRIPTION';

import { getPrescriptionDetail } from '../../helper/Network/prescription/index.js';

export const getPrescription = (id) => {
	return async (dispatch) => {
		dispatch({
			type: GET_PRESCRIPTION,
			payload: {
				loading: true,
				data: false,
				errorMessage: false,
			},
		});

		try {
			const data = await getPrescriptionDetail(id);
			dispatch({
				type: GET_PRESCRIPTION,
				payload: {
					loading: false,
					data: data.results,
					errorMessage: false,
				},
			});
			return data;
		} catch (error) {
			dispatch({
				type: GET_PRESCRIPTION,
				payload: {
					loading: false,
					data: false,
					errorMessage: error.message,
				},
			});
			return false;
		}
	};
};

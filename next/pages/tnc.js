import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';

import { Wrapper } from '../components';
import Router from 'next/router';
import snapConfig from '../config.js';
import { getMasterTnc } from '../helper';

const TNC = (props) => {
	const [tnc, setTnc] = useState('');

	const dummyTnc =
		'<style>\n' +
		'  html {\n' +
		'    font: var(--unnamed-font-style-normal) normal\n' +
		'      var(--unnamed-font-weight-normal) var(--unnamed-font-size-16) /\n' +
		'      var(--unnamed-line-spacing-24) var(--unnamed-font-family-roboto);\n' +
		'    letter-spacing: var(--unnamed-character-spacing-0-15);\n' +
		'    text-align: left;\n' +
		'    font: normal normal normal 16px/24px Roboto;\n' +
		'    letter-spacing: 0.15px;\n' +
		'    color: #000000;\n' +
		'  }\n' +
		'  ol {\n' +
		'    list-style-type: lower-alpha;\n' +
		'  }\n' +
		'  ol li {\n' +
		'    display: list-item;\n' +
		'  }\n' +
		'</style>\n' +
		'<html>\n' +
		'  <p style="font-size: 20px;"><strong>PERSETUJUAN PENGGUNA</strong></p>\n' +
		'  <p>Dengan menggunakan fitur Webinar ini, Sejawat D2D menyetujui bahwa:</p>\n' +
		'  <p>\n' +
		'    <strong>DATA SEJAWAT D2D</strong>\n' +
		'  </p>\n' +
		'  <ol type="a">\n' +
		'    <li>\n' +
		'      Sejawat D2D dengan ini setuju untuk memberikan data pribadi Sejawat D2D,\n' +
		'      yang akurat dan benar, kepada PT Global Urban Esensial (“GUE”), yang\n' +
		'      terdiri dari nama lengkap dan alamat email.\n' +
		'    </li>\n' +
		'    <li>\n' +
		'      Sejawat D2D dengan ini setuju bahwa data pribadi tersebut akan digunakan\n' +
		'      untuk dokumentasi dan keperluan administratif serta pembukaan akses kepada\n' +
		'      pihak yang ditetapkan oleh atau bekerjasama dengan PT.GUE.\n' +
		'    </li>\n' +
		'  </ol>\n' +
		'  <p>\n' +
		'    <strong>E-CERTIFICATE</strong>\n' +
		'  </p>\n' +
		'  <ol type="a">\n' +
		'    <li>\n' +
		'      Sejawat D2D setuju membayar sejumlah nominal yang ditentukan oleh D2D ke\n' +
		'      panitia penyelenggara webinar untuk mendapatkan E-Certificate dari\n' +
		'      webinar. E-Certificate akan diproses oleh D2D sesuai dengan prosedur yang\n' +
		'      berlaku di D2D.\n' +
		'    </li>\n' +
		'    <li>\n' +
		'      Sejawat D2D setuju bahwa Sejawat D2D dapat menyaksikan webinar tanpa\n' +
		'      memperoleh E-Certificate pada akhir sesi webinar apabila tidak melakukan\n' +
		'      pembayaran.\n' +
		'    </li>\n' +
		'    <li>\n' +
		'      Sejawat D2D setuju bahwa Sejawat D2D dapat menyaksikan webinar tanpa\n' +
		'      memperoleh E-Certificate pada akhir sesi webinar apabila tidak melakukan\n' +
		'      pembayaran.\n' +
		'    </li>\n' +
		'    <li>\n' +
		'      Sejawat D2D setuju bahwa Sejawat D2D dapat menyaksikan webinar tanpa\n' +
		'      memperoleh E-Certificate pada akhir sesi webinar apabila tidak melakukan\n' +
		'      pembayaran.\n' +
		'    </li>\n' +
		'  </ol>\n' +
		'  <html />\n' +
		'</html>\n' +
		'';

	const queries = () => {
		try {
			return Router?.query;
		} catch (error) {
			console.log('error on getRouter : ', error);
			return null;
		}
	};
	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		let data = await getMasterTnc();
		console.log('res getTnc', data);
		setTnc(data.results.tnc);
	};

	return (
		<Wrapper
			{...props}
			title={queries()?.title ?? 'T & C'}
			header={true}
			additionalStyleContent={{ overflowY: 'hidden', display: 'flex' }}
		>
			<div className="mg-16 pd-16 bd-gray-2 bd bd-1 rounded-8 overflow-y-scroll flex-1">
				{parse(tnc)}
			</div>
		</Wrapper>
	);
};
export default TNC;

export var TNC_CONST = {
	tnc: 'T & C',
	privacy_policy: 'Privacy Policy',
};

import React, { useEffect, useState } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import {
	CalculatorListItem,
	InputForm,
	TextValue,
	Wrapper,
} from '../components/index.js';
import { FORM_CONSULTATION } from './form-consultation.js';

const Index = (props) => {
	const [activeTab, setActiveTab] = useState(0);
	useEffect(() => {}, []);

	const data = [
		{
			title: 'Hasil',
			data: [
				{
					title: 'Indeks Massa Tubuh (IMT)',
					desc: '29.07 kg/m2',
				},
				{
					title: 'Kategori Berat',
					desc: 'Overweight',
				},
				{
					title: 'Body Surface Area',
					desc: '2.009 m2',
				},
			],
		},
	];

	const forms = [
		{
			name: FORM_CONSULTATION.WEIGHT,
			title: 'Berat Badan',
			placeholder: 'Masukkan Berat Badan',
			isRequired: true,
			max_length: 500,
		},
		{
			name: FORM_CONSULTATION.HEIGHT,
			title: 'Tinggi Badan',
			placeholder: 'Masukkan Tinggi Badan',
			isRequired: true,
			max_length: 500,
		},
	];

	const onChangeForm = () => {
		//code
	};

	return (
		<Wrapper
			{...props}
			title="Indeks Massa Tubuh (IMT)"
			header={true}
			footer={true}
			additionalHeaderComponent={
				<Nav tabs className=" box-shadow-bottom ">
					{['KALKULATOR', 'INFORMASI', 'REFERENSI'].map(
						(element, idx) => (
							<NavItem className="flex-1">
								<NavLink
									className={
										'font-14 ' +
										(activeTab == idx
											? 'active'
											: 'tx-gray-3')
									}
									onClick={() => setActiveTab(idx)}
								>
									{element}
								</NavLink>
							</NavItem>
						),
					)}
				</Nav>
			}
		>
			<div className="tx-black">
				<p className="font-18 mg-t-16 mg-x-16 tx-roboto-medium">
					Pertanyaan
				</p>
				<div
					style={{
						flex: 1,
						padding: 16,
					}}
				>
					<div className="tx-black">
						{forms?.map((element, id) => (
							<InputForm
								key={'forms_' + id}
								formId={id}
								className={element?.className}
								data={element}
								onChange={onChangeForm}
							/>
						))}
					</div>
				</div>

				{data.map((element, index) => (
					<div key={'index_' + index}>
						<p className="font-18 mg-16 tx-roboto-medium">
							{element?.title}
						</p>
						{element?.data?.map((elementItem, indexItem) => (
							<div className="pd-16">
								<TextValue
									key={'indexItem_' + indexItem}
									data={{
										name: elementItem.title,
										desc: elementItem.desc,
									}}
								/>
							</div>
						))}
					</div>
				))}
			</div>
		</Wrapper>
	);
};
export default Index;

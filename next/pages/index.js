import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { CalculatorListItem, Wrapper } from '../components/index.js';

const Index = (props) => {
	const [activeTab, setActiveTab] = useState(0);
	useEffect(() => {}, []);

	const data = [
		{
			title: 'Popular',
			data: [
				{
					title: 'Index Masa Tubuh (IMT)',
					desc: 'Menghitung index masa tubuh.',
					isChecked: true,
				},
				{
					title: 'Creatinine Clearance (Cockcroft-Gault Equation)',
					desc: 'Menghitung CrCl menurut persamaan Cockcroft-Gault.',
					isChecked: true,
				},
			],
		},
		{
			title: 'Kalkulator',
			data: [
				{
					title: 'CHA,DS-VASC Score for Atrial Fibrillation Stroke',
					desc: 'Menghitung risiko stroke.',
					isChecked: false,
				},
				{
					title: 'Calcium Correction for Hypoalbuminemia',
					desc: 'Menghitung tingkat kalsium.',
					isChecked: false,
				},
				{
					title: 'CHA,DS-VASC Score for Atrial Fibrillation Stroke',
					desc: 'Menghitung risiko stroke.',
					isChecked: false,
				},
				{
					title: 'Calcium Correction for Hypoalbuminemia',
					desc: 'Menghitung tingkat kalsium.',
					isChecked: false,
				},
			],
		},
	];

	return (
		<Wrapper
			{...props}
			title="D2D Kalkulator"
			header={true}
			footer={true}
			additionalHeaderComponent={
				<Nav tabs className="d-flex flex-1 box-shadow-bottom">
					{['SEMUA', 'FAVORIT', 'RIWAYAT'].map((element, idx) => (
						<NavItem className="flex-1">
							<NavLink
								className={
									'font-14 ' +
									(activeTab == idx ? 'active' : 'tx-gray-3')
								}
								onClick={() => setActiveTab(idx)}
							>
								{element}
							</NavLink>
						</NavItem>
					))}
				</Nav>
			}
		>
			<div className="tx-black">
				<TabContent activeTab={activeTab}>
					<TabPane tabId={0}>
						{data.map((element, index) => (
							<div key={'index_' + index}>
								<p className="font-18 mg-16 tx-roboto-medium">
									{element?.title}
								</p>
								{element?.data?.map(
									(elementItem, indexItem) => (
										<CalculatorListItem
											key={'indexItem_' + indexItem}
											data={elementItem}
											onClick={() =>
												Router.push({
													pathname:
														'/calculator-detail',
													query: {
														source: elementItem,
													},
												})
											}
										/>
									),
								)}
							</div>
						))}
					</TabPane>
					<TabPane tabId={1}></TabPane>
				</TabContent>
			</div>
		</Wrapper>
	);
};
export default Index;

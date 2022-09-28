import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import $ from 'jquery';
import axios from 'axios';
import crypto from 'crypto';

import snapConfig from '../../../config';
import { getProfile } from '../../../helper';
import { IconBack } from '../../../assets';
import { Coachmark } from '../../organisms';
// const Auth = new AuthService();

const Header = ({
	data,
	title,
	desc,
	headerImage,
	coachmarkHeaderData = null,
	onClickHeaderTitle = () => {},
	onClickBack = null,
}) => {
	const [user, setUser] = useState();
	useEffect(() => {
		setUser(getProfile());
	}, []);

	useEffect(() => {}, [coachmarkHeaderData]);

	const logout = () => {
		localStorage.removeItem('user');
		Router.push({
			pathname: '/logout',
		});
	};

	return (
		<React.Fragment>
			<div id="header" className="app-header">
				<div className="menu">
					<div>
						<a
							data-bs-display="static"
							className="menu-link"
							onClick={
								onClickBack != null
									? onClickBack
									: () => Router.back()
							}
						>
							<div
								className="menu-img online"
								style={{ padding: 4 }}
							>
								<IconBack />
							</div>
						</a>
					</div>
					<Coachmark
						className="d-flex flex-1"
						classNameContainer="d-flex flex-1 ht-100p"
						title={coachmarkHeaderData?.title ?? ''}
						desc={coachmarkHeaderData?.desc ?? ''}
						dotActivePosition={
							coachmarkHeaderData?.dotActivePosition ?? 1
						}
						dotLength={coachmarkHeaderData?.dotLength ?? 1}
						onClickNext={coachmarkHeaderData?.onPressNext}
						isPopoverOpen={coachmarkHeaderData?.isShow ?? false}
						targetId="popoverHeaderTitle"
					>
						<div
							className="bg-primary-red d-flex flex-1 pd-4 rounded-8 link-cursor align-items-center"
							onClick={onClickHeaderTitle}
						>
							{headerImage && (
								<div className="menu-img online">
									<img
										src={headerImage}
										className="img-36-round"
									/>
								</div>
							)}
							<div className="flex-1 mg-l-8">
								<p className="tx-20 tx-white lh-24px tx-spacing-015 mg-b-0 tx-roboto-medium">
									{data?.title ?? title ?? 'D2D Calculator'}
								</p>
								<p className="mg-t-3 tx-12 tx-white lh-16px tx-spacing-019 mg-b-0 tx-roboto-regular">
									{data?.desc ?? desc ?? ''}
								</p>
							</div>
						</div>
					</Coachmark>
				</div>
			</div>
		</React.Fragment>
	);
};
export default Header;

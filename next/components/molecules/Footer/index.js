import { string } from 'prop-types'
import Link from 'next/link'
import React from 'react'

const Footer = (props) => (
	<React.Fragment>
		<a href="javascript:void(0);" data-toggle="scroll-to-top" className="btn-scroll-top fade"><i className="fa fa-arrow-up"></i></a>
		
		<div className="app-theme-panel">
			<div className="app-theme-panel-container">
				<div className="app-theme-panel-content">
					<div className="small fw-bold text-white mb-1">Theme Color</div>
					<div className="card mb-3">
						<div className="card-body p-2">
							<div className="app-theme-list">
								<div className="app-theme-list-item"><a href="javascript:void(0);" className="app-theme-list-link bg-pink" data-theme-class="theme-pink" data-toggle="theme-selector" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-container="body" data-bs-title="Pink">&nbsp;</a></div>
								<div className="app-theme-list-item"><a href="javascript:void(0);" className="app-theme-list-link bg-red" data-theme-class="theme-red" data-toggle="theme-selector" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-container="body" data-bs-title="Red">&nbsp;</a></div>
								<div className="app-theme-list-item"><a href="javascript:void(0);" className="app-theme-list-link bg-warning" data-theme-class="theme-warning" data-toggle="theme-selector" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-container="body" data-bs-title="Orange">&nbsp;</a></div>
								<div className="app-theme-list-item"><a href="javascript:void(0);" className="app-theme-list-link bg-yellow" data-theme-class="theme-yellow" data-toggle="theme-selector" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-container="body" data-bs-title="Yellow">&nbsp;</a></div>
								<div className="app-theme-list-item"><a href="javascript:void(0);" className="app-theme-list-link bg-lime" data-theme-class="theme-lime" data-toggle="theme-selector" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-container="body" data-bs-title="Lime">&nbsp;</a></div>
								<div className="app-theme-list-item"><a href="javascript:void(0);" className="app-theme-list-link bg-green" data-theme-class="theme-green" data-toggle="theme-selector" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-container="body" data-bs-title="Green">&nbsp;</a></div>
								<div className="app-theme-list-item active"><a href="javascript:void(0);" className="app-theme-list-link bg-teal" data-theme-class="" data-toggle="theme-selector" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-container="body" data-bs-title="Default">&nbsp;</a></div>
								<div className="app-theme-list-item"><a href="javascript:void(0);" className="app-theme-list-link bg-info" data-theme-class="theme-info" data-toggle="theme-selector" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-container="body" data-bs-title="Cyan">&nbsp;</a></div>
								<div className="app-theme-list-item"><a href="javascript:void(0);" className="app-theme-list-link bg-primary" data-theme-class="theme-primary" data-toggle="theme-selector" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-container="body" data-bs-title="Blue">&nbsp;</a></div>
								<div className="app-theme-list-item"><a href="javascript:void(0);" className="app-theme-list-link bg-purple" data-theme-class="theme-purple" data-toggle="theme-selector" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-container="body" data-bs-title="Purple">&nbsp;</a></div>
								<div className="app-theme-list-item"><a href="javascript:void(0);" className="app-theme-list-link bg-indigo" data-theme-class="theme-indigo" data-toggle="theme-selector" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-container="body" data-bs-title="Indigo">&nbsp;</a></div>
								<div className="app-theme-list-item"><a href="javascript:void(0);" className="app-theme-list-link bg-gray-100" data-theme-class="theme-gray-200" data-toggle="theme-selector" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-container="body" data-bs-title="Gray">&nbsp;</a></div>
							</div>
						</div>

						<div className="card-arrow">
							<div className="card-arrow-top-left"></div>
							<div className="card-arrow-top-right"></div>
							<div className="card-arrow-bottom-left"></div>
							<div className="card-arrow-bottom-right"></div>
						</div>
					</div>
					<div className="small fw-bold text-white mb-1">Theme Cover</div>
					<div className="card">
						<div className="card-body p-2">
							<div className="app-theme-cover">
								<div className="app-theme-cover-item active">
									<a href="javascript:void(0);" className="app-theme-cover-link" style={{ backgroundImage: "url(/assets/img/cover/cover-thumb-1.jpg)"}} data-theme-cover-class="" data-toggle="theme-cover-selector" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-container="body" data-bs-title="Default">&nbsp;</a>
								</div>
								<div className="app-theme-cover-item">
									<a href="javascript:void(0);" className="app-theme-cover-link" style={{ backgroundImage: "url(/assets/img/cover/cover-thumb-2.jpg)"}} data-theme-cover-class="bg-cover-2" data-toggle="theme-cover-selector" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-container="body" data-bs-title="Cover 2">&nbsp;</a>
								</div>
								<div className="app-theme-cover-item">
									<a href="javascript:void(0);" className="app-theme-cover-link" style={{ backgroundImage: "url(/assets/img/cover/cover-thumb-3.jpg)"}} data-theme-cover-class="bg-cover-3" data-toggle="theme-cover-selector" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-container="body" data-bs-title="Cover 3">&nbsp;</a>
								</div>
								<div className="app-theme-cover-item">
									<a href="javascript:void(0);" className="app-theme-cover-link" style={{ backgroundImage: "url(/assets/img/cover/cover-thumb-4.jpg)"}} data-theme-cover-class="bg-cover-4" data-toggle="theme-cover-selector" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-container="body" data-bs-title="Cover 4">&nbsp;</a>
								</div>
								<div className="app-theme-cover-item">
									<a href="javascript:void(0);" className="app-theme-cover-link" style={{ backgroundImage: "url(/assets/img/cover/cover-thumb-5.jpg)"}} data-theme-cover-class="bg-cover-5" data-toggle="theme-cover-selector" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-container="body" data-bs-title="Cover 5">&nbsp;</a>
								</div>
							</div>
						</div>

						<div className="card-arrow">
							<div className="card-arrow-top-left"></div>
							<div className="card-arrow-top-right"></div>
							<div className="card-arrow-bottom-left"></div>
							<div className="card-arrow-bottom-right"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</React.Fragment>
)

Footer.propTypes = {
	year: string
}

export default Footer
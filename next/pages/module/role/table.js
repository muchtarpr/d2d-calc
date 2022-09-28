import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import $ from 'jquery'
import { Modal } from 'reactstrap'
import 'datatables.net'
import 'datatables.net-bs5'

const snapConfig = require('../../../config')

export default class extends React.Component {
	constructor(props) {
		super(props)
		
		this.intl = props.intl

		this.state = {
			totalData: 0,
			idDel: 0,
			modalDel: false,
			modalDelAll: false,
		}

		this.actionEdit = this.actionEdit.bind(this)
		this.toggleDel = this.toggleDel.bind(this)
		this.toggleDelAll = this.toggleDelAll.bind(this)
		this.actionDelete = this.actionDelete.bind(this)
		this.actionDeleteAll = this.actionDeleteAll.bind(this)
	}
	
	componentDidMount() {
		let self = this
		
		$('#table-roles').DataTable({
			order: [[1, 'DESC']],
			columnDefs: [{
				targets: 'no-sort',
				orderable: false
			}],
			columns: [
				{ "name" : "checkbox" },
				{ "name" : "id" },
				{ "name" : "role_title" },
				{ "name" : "role_slug" },
				{ "name" : "action" }
			],
			stateSave: true,
			serverSide: true,
			processing: true,
			pageLength: 10,
			lengthMenu: [
				[10, 30, 50, 100, -1],
				[10, 30, 50, 100, 'All']
			],
			ajax: {
				type: 'post',
				url: snapConfig.BASE_API_URL + '/role/datatable',
			},
			responsive: true,
			language: {
				searchPlaceholder: 'Search...',
				sSearch: '',
				lengthMenu: '_MENU_ items/page',
			},
			dom: "<'row mb-3'<'col-sm-4'l><'col-sm-8 text-end'<'d-flex justify-content-end'fB>>>t<'d-flex align-items-center'<'me-auto'i><'mb-0'p>>",
			"drawCallback": function(settings) {
				$("#titleCheck").on('click', function() {
					let checkedStatus = this.checked;
					$("table tbody tr td div:first-child input[type=checkbox]").each(function() {
						this.checked = checkedStatus
						if (checkedStatus == this.checked) {
							$(this).closest('table tbody tr').removeClass('table-select')
							$(this).closest('table tbody tr').find('input:hidden').attr('disabled', !this.checked)
							self.setState({
								totalData: $('.table-body input[type=checkbox]:checked').length
							})
						}
						if (this.checked) {
							$(this).closest('table tbody tr').addClass('table-select')
							$(this).closest('table tbody tr').find('input:hidden').attr('disabled', !this.checked)
							self.setState({
								totalData: $('.table-body input[type=checkbox]:checked').length
							})
						}
					})
				})
				
				$('table tbody tr td div:first-child input[type=checkbox]').on('click', function () {
					let checkedStatus = this.checked
					this.checked = checkedStatus
					
					if (checkedStatus == this.checked) {
						$(this).closest('table tbody tr').removeClass('table-select')
						$(this).closest('table tbody tr').find('input:hidden').attr('disabled', !this.checked)
						self.setState({
							totalData: $('.table-body input[type=checkbox]:checked').length
						})
					}
					
					if (this.checked) {
						$(this).closest('table tbody tr').addClass('table-select')
						$(this).closest('table tbody tr').find('input:hidden').attr('disabled', !this.checked)
						self.setState({
							totalData: $('.table-body input[type=checkbox]:checked').length
						})
					}
				})
				
				$('table tbody tr td div:first-child input[type=checkbox]').change(function() {
					$(this).closest('tr').toggleClass("table-select", this.checked)
				})
				
				$(".alertdel").on('click', function() {
					let id = $(this).attr("id")
					self.toggleDel()
					self.setState({
						idDel: id
					})
				})
				
				$('.btn-edit').on('click', function() {
					let href = $(this).attr('data-href')
					let as = $(this).attr('data-as')
					
					self.actionEdit(href, as)
				})
			}
		})
    }
	
	componentWillUnmount() {
		$('.dataTables_wrapper').find('table').DataTable().destroy(true)
    }
	
	actionEdit(href, as) {
		Router.push(href, as)
	}
	
	toggleDel() {
		this.setState({
			modalDel: !this.state.modalDel
		})
	}
	
	toggleDelAll() {
		this.setState({
			modalDelAll: !this.state.modalDelAll
		})
	}
	
	actionDelete() {
		let self = this
		
		this.toggleDel()
		
		axios({
			url: snapConfig.BASE_API_URL + '/role/delete',
			method: 'POST',
			data: {
				id: self.state.idDel
			},
			timeout: snapConfig.TIMEOUT
		}).then(function (response) {
			if (response.data.code == '2000') {
				let table = $('.dataTables_wrapper')
					.find('table')
					.DataTable()
				table.clear().draw()
				table.state.clear()
				
				self.props.flashInfo('success', response.data.message)
			} else {
				self.props.flashInfo('error', response.data.message)
			}
		})
	}
	
	actionDeleteAll() {
		let self = this
		
		let values = $('.table-body input[type=checkbox]:checked').map(function(){
			let deldata = $(this).next()
			return deldata.val()
		}).get()
		
		this.toggleDelAll()
		
		axios({
			url: snapConfig.BASE_API_URL + '/role/multi-delete',
			method: 'POST',
			data: {
				totaldata: self.state.totalData,
				item: JSON.stringify(values)
			},
			timeout: snapConfig.TIMEOUT
		}).then(function (response) {
			if (response.data.code == '2000') {
				let table = $('.dataTables_wrapper')
					.find('table')
					.DataTable()
				table.clear().draw()
				table.state.clear()
				
				self.props.flashInfo('success', response.data.message)
			} else {
				self.props.flashInfo('error', response.data.message)
			}
		})
	}
	
	render() {
		return (
			<React.Fragment>
				<div className="card">
					<div className="card-body table-responsive">
						<table id="table-roles" className="table responsive text-nowrap w-100">
							<thead>
								<tr>
									<th className="no-sort" style={{ width:"10px" }}></th>
									<th style={{ width:"30px" }}>Id</th>
									<th>Title</th>
									<th>Slug</th>
									<th className="no-sort" style={{ width:"100px" }}>Action</th>
								</tr>
							</thead>
							<tbody className="table-body"></tbody>
							<tfoot>
								<tr>
									<td style={{ width:"10px" }} className="text-center"><input type="checkbox" id="titleCheck" /></td>
									<td colSpan="4">
										<button className="btn btn-sm btn-danger" type="button" onClick={this.toggleDelAll}><i className="bi bi-trash"></i> Delete All</button>
									</td>
								</tr>
							</tfoot>
						</table>
					</div>
					<div className="card-arrow">
						<div className="card-arrow-top-left"></div>
						<div className="card-arrow-top-right"></div>
						<div className="card-arrow-bottom-left"></div>
						<div className="card-arrow-bottom-right"></div>
					</div>
				</div>

				<Modal isOpen={this.state.modalDel} toggle={this.toggleDel} centered={true} fade={true}>
					<div className="modal-body text-center pd-y-20 pd-x-20">
						<i className="bi bi-exclamation-circle tx-50 text-danger lh-1 mg-t-20 d-inline-block"></i>
						<h4 className="text-danger mg-b-20">Confirmation</h4>
						<p className="mg-b-20 mg-x-20">Are you sure you want to delete this data?</p>
						<button type="button" className="btn btn-danger pd-x-25 mg-r-10" onClick={this.actionDelete}><i className="bi bi-trash"></i> Yes</button>
						<button type="button" className="btn btn-default pd-x-25" onClick={this.toggleDel}><i className="bi bi-x-circle"></i> No</button>
					</div>
				</Modal>
				
				<Modal isOpen={this.state.modalDelAll} toggle={this.toggleDelAll} centered={true} fade={true}>
					<div className="modal-body text-center pd-y-20 pd-x-20">
						<i className="bi bi-exclamation-circle tx-50 text-danger lh-1 mg-t-20 d-inline-block"></i>
						<h4 className="text-danger mg-b-20">Confirmation</h4>
						<p className="mg-b-20 mg-x-20">Are you sure you want to delete this data?</p>
						<button type="button" className="btn btn-danger pd-x-25 mg-r-10" onClick={this.actionDeleteAll}><i className="bi bi-trash"></i> Yes</button>
						<button type="button" className="btn btn-default pd-x-25" onClick={this.toggleDelAll}><i className="bi bi-x-circle"></i> No</button>
					</div>
				</Modal>
			</React.Fragment>
		)
	}
}

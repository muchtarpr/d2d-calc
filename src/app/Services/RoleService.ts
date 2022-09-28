import { Injectable } from '@nestjs/common';
import { 
	InjectModel,
} from 'nestjs-objection';
import path from 'path';
import fs from 'fs';
import _lo from 'lodash';
import { Role as RoleModel } from '../Models/RoleModel';
import { QueryBuilder } from '../Helpers/DatatableBuilder';
import { Hash } from '../Helpers/Hash';
import { CheckAuth } from '../Helpers/CheckAuth';

@Injectable()
export class RoleService {
	constructor(
		@InjectModel(RoleModel) private readonly roleModel: typeof RoleModel
	) {}

	// async datatable(req: any): Promise<any> {
	// 	let newAuth = new CheckAuth();
	// 	let checkAuth = await newAuth.get('Role', 'read', req.user.data)
	// 	if (!checkAuth) {
	// 		return {
	// 			code: '4003',
	// 			message: 'User cannot access this module',
	// 			data: []
	// 		}
	// 	}

	// 	const formData = req.body;

	// 	let tableDefinition = {
	// 		sTableName: 'roles',
	// 		sSelectSql: ['roles.id', 'roles.role_title', 'roles.role_slug'],
	// 		aSearchColumns: ['roles.role_title', 'roles.role_slug'],
	// 		sFromSql: 'roles',
	// 	};
		
	// 	let queryBuilder = new QueryBuilder(tableDefinition);
		
	// 	let requestQuery = {
	// 		draw: formData.draw,
	// 		columns: formData.columns,
	// 		order: formData.order,
	// 		start: formData.start,
	// 		length: formData.length,
	// 		search: formData.search
	// 	}
		
	// 	let queries = queryBuilder.buildQuery(JSON.parse(JSON.stringify(requestQuery)));

	// 	const Database = this.roleModel.knex();
	// 	let select = await Database.raw(queries.select);
	// 	let recordsTotal = await Database.raw(queries.recordsTotal);
	// 	let recordsFiltered = queries.recordsFiltered ? await Database.raw(queries.recordsFiltered) : null;

	// 	let MyHash = new Hash();
	// 	let fdata = [];
	// 	let no = 0;
	// 	for(let x in select[0]) {
	// 		let id = select[0][x]['id'];
	// 		fdata.push([
	// 			"<div class='text-center'>\
	// 				<input type='checkbox' id='titleCheckdel' />\
	// 				<input type='hidden' class='deldata' name='item[]' value='"+ MyHash.encrypt(id.toString()) +"' disabled />\
	// 			</div>\n",
	// 			select[0][x]['id'],
	// 			select[0][x]['role_title'],
	// 			select[0][x]['role_slug'],
	// 			"<div class='text-center'>\
	// 				<div class='btn-group btn-group-sm'>\
	// 					<a href='javascript:void(0);' data-href='/module/role/edit?id="+ MyHash.encrypt(id.toString()) +"' data-as='/role/edit/"+ MyHash.encrypt(id.toString()) +"' class='btn btn-sm btn-primary btn-edit' title='Edit'><i class='bi bi-pencil'></i></a>\
	// 					<a href='javascript:void(0);' class='btn btn-sm btn-danger alertdel' id='"+ MyHash.encrypt(id.toString()) +"' title='Delete'><i class='bi bi-trash'></i></a>\
	// 				</div>\
	// 			</div>\n",
	// 		]);
	// 		no++;
	// 	}
		
	// 	let data = {
	// 		draw: formData.draw,
	// 		recordsTotal: JSON.stringify(recordsTotal[0][0]['COUNT(roles.id)']),
	// 		recordsFiltered: (queries.recordsFiltered) ? JSON.stringify(recordsFiltered[0][0]['COUNT(roles.id)']) : JSON.stringify(recordsTotal[0][0]['COUNT(roles.id)']),
	// 		data: fdata
	// 	};
		
	// 	return data;
	// }

	async create(req: any): Promise<any> {
		let newAuth = new CheckAuth();
		let checkAuth = await newAuth.get('Role', 'create', req.user.data)
		if (!checkAuth) {
			return {
				code: '4003',
				message: 'User cannot access this module',
				data: []
			}
		}

		const { role_title, role_slug, role_access } = req.body;

		let roles = []
		let items = role_access
		for(let x in items) {
			roles.push({
				component: items[x]['component'] ? items[x]['component'] : '-',
				create: items[x]['create'] ? '1' : '0',
				read: items[x]['read'] ? '1' : '0',
				update: items[x]['update'] ? '1' : '0',
				delete: items[x]['delete'] ? '1' : '0',
			})
		}

		let formData = {
			role_title: role_title,
			role_slug: role_slug,
			role_access: JSON.stringify(roles),
			created_by: req.user.id,
			updated_by: req.user.id,
		};

		try {
			await this.roleModel.query().insert(formData);
			
			return {
				code: '2000',
				message: 'Role success created',
				data: [],
			};
		} catch (e) {
			return {
				code: '4004',
				message: 'Role error created',
				data: [],
			};
		}
	}

	async edit(req: any): Promise<any> {
		let newAuth = new CheckAuth();
		let checkAuth = await newAuth.get('Role', 'update', req.user.data)
		if (!checkAuth) {
			return {
				code: '4003',
				message: 'User cannot access this module',
				data: []
			}
		}

		const formData = req.body;
		
		let MyHash = new Hash();
		let role = await this.roleModel.query().select('roles.*').where('roles.id', MyHash.decrypt(formData.id)).first();
		
		if (role) {
			let lfiles = [];
			let directoryPath = path.join(process.cwd(), '/src/app/Controllers');
			let files = fs.readdirSync(directoryPath).map(f => f.replace('Controller.ts', '').replace('Controller.spec.ts', ''));
			lfiles.push(...files);

			let allFiles = [];
			let detectFusion = [];
			let itemFusion = [];
			let itemFusion2 = [];
			let itemFusion3 = [];
			let roleState = role.role_access == '' || role.role_access == null ? false : JSON.parse(role.role_access);

			if (!roleState) {
				for (let i = 0; i < lfiles.length; i++) {
					if (lfiles[i] == 'App' || lfiles[i] == 'Auth') {
					} else {
						allFiles.push({
							component: lfiles[i],
							create: '',
							read: '',
							update: '',
							delete: '',
						});
					}
				}
			} else {
				for (let x in roleState) {
					if (lfiles.includes(roleState[x]['component'])) {
						detectFusion.push(roleState[x]);
					} else {
						itemFusion2.push(roleState[x])
					}
				}

				for (let i = 0; i < lfiles.length; i++) {
					if (lfiles[i] == 'App' || lfiles[i] == 'Auth') {
					} else {
						let chckFus = _lo.find(detectFusion, { component: lfiles[i] });
						if (_lo.size(chckFus) == 0) {
							itemFusion3.push({
								component: lfiles[i],
								create: '',
								read: '',
								update: '',
								delete: '',
							});
						} else {
							itemFusion3.push({
								component: chckFus.component,
								create: chckFus.create,
								read: chckFus.read,
								update: chckFus.update,
								delete: chckFus.delete,
							});
						}
					}
				}

				for (let x in itemFusion3) {
					let chckFus = _lo.find(itemFusion2, { component: itemFusion3[x]['component'] });
					if (_lo.size(chckFus) == 0) {
						itemFusion.push(itemFusion3[x]);
					}
				}
				
				allFiles = itemFusion2.concat(itemFusion);
			}
			return {
				code: '2000',
				message: 'Role found',
				data: {
					role: role,
					files: _lo.sortBy(allFiles, ['component']),
				}
			};
		} else {
			return {
				code: '4004',
				message: 'Role not found',
				data: [],
			};
		}
	}

	async update(params: any, req: any): Promise<any> {
		let newAuth = new CheckAuth();
		let checkAuth = await newAuth.get('Role', 'update', req.user.data)
		if (!checkAuth) {
			return {
				code: '4003',
				message: 'User cannot access this module',
				data: []
			}
		}

		const { role_title, role_slug, role_access } = req.body;

		let MyHash = new Hash();
		let role = await this.roleModel.query().where('id', MyHash.decrypt(params.id));

		let roles = []
		let items = role_access
		for(let x in items) {
			roles.push({
				component: items[x]['component'] ? items[x]['component'] : '-',
				create: items[x]['create'] ? '1' : '0',
				read: items[x]['read'] ? '1' : '0',
				update: items[x]['update'] ? '1' : '0',
				delete: items[x]['delete'] ? '1' : '0'
			})
		}

		try {
			if (role) {
				await this.roleModel.query().where('id', MyHash.decrypt(params.id)).update({
					role_title: role_title,
					role_slug: role_slug,
					role_access: JSON.stringify(roles),
					updated_by: req.user.id,
				});

				return {
					code: '2000',
					message: 'Role success updated',
					data: [],
				};
			} else {
				return {
					code: '4004',
					message: 'Role not found',
					data: [],
				};
			}
		} catch (e) {
			return {
				code: '4004',
				message: 'Role error updated',
				data: [],
			};
		}
	}

	async delete(req: any): Promise<any> {
		let newAuth = new CheckAuth();
		let checkAuth = await newAuth.get('Role', 'delete', req.user.data)
		if (!checkAuth) {
			return {
				code: '4003',
				message: 'User cannot access this module',
				data: []
			}
		}

		const formData = req.body;

		let MyHash = new Hash();
		let role = await this.roleModel.query().where('id', MyHash.decrypt(formData.id)).first();

		if (role) {
			try {
				await this.roleModel.query().where('id', role.id).delete();
				
				return {
					code: '2000',
					message: 'Role success deleted',
					data: [],
				}
			} catch (e) {
				return {
					code: '4004',
					message: 'Role error deleted',
					data: [],
				}
			}
		} else {
			return {
				code: '4004',
				message: 'Role not found',
				data: [],
			}
		}
	}

	async multiDelete(req: any): Promise<any> {
		let newAuth = new CheckAuth();
		let checkAuth = await newAuth.get('Role', 'delete', req.user.data)
		if (!checkAuth) {
			return {
				code: '4003',
				message: 'User cannot access this module',
				data: []
			}
		}

		const formData = req.body;

		let MyHash = new Hash();

		if (formData.totaldata != '0') {
			let dataitem = JSON.parse(formData.item)
			for (let i in dataitem) {
				let role = await this.roleModel.query().where('id', MyHash.decrypt(dataitem[i])).first();
				try {
					await this.roleModel.query().where('id', role.id).delete();
				} catch (e) {}
			}
			
			return {
				code: '2000',
				message: 'Role success deleted',
				data: [],
			}
		} else {
			return {
				code: '4004',
				message: 'Role not found',
				data: [],
			}
		}
	}

	async getRole(req: any): Promise<any> {
		let newAuth = new CheckAuth();
		let checkAuth = await newAuth.get('Role', 'read', req.user.data)
		if (!checkAuth) {
			return {
				code: '4003',
				message: 'User cannot access this module',
				data: []
			}
		}

		const formData = req.body;

		let datas = null;
		let sessionRole = req.user.data.roles;
		let result = [];

		if (formData.phrase) {
			if (sessionRole[0] == 'superadmin') {
				datas = await this.roleModel.query().where('role_title', 'LIKE', '%' + formData.phrase + '%').limit(20);
			} else {
				datas = await this.roleModel.query().where('role_title', 'LIKE', '%' + formData.phrase + '%').whereNot('role_slug', 'superadmin').limit(20);
			}
		} else {
			if (sessionRole[0] == 'superadmin') {
				datas = await this.roleModel.query().limit(20);
			} else {
				datas = await this.roleModel.query().whereNot('role_slug', 'superadmin').limit(20);
			}
		}

		for(let i in datas){
			result.push({
				value: datas[i]['id'],
				label: datas[i]['role_title'],
			});
		}

		return {
			code: '2000',
			message: 'Role found',
			data: result,
		}
	}

	async getModuleList(req: any): Promise<any> {
		let newAuth = new CheckAuth();
		let checkAuth = await newAuth.get('Role', 'read', req.user.data)
		if (!checkAuth) {
			return {
				code: '4003',
				message: 'User cannot access this module',
				data: []
			}
		}
		
		const formData = req.body;

		let lfiles = [];
		let directoryPath = path.join(process.cwd(), '/src/app/Controllers');
		let files = fs.readdirSync(directoryPath).map(f => f.replace('Controller.ts', '').replace('Controller.spec.ts', ''));
		lfiles.push(...files)
		
		let allFiles = [];
		for (let i = 0; i < lfiles.length; i++) {
			if (lfiles[i] == 'App' || lfiles[i] == 'Auth') {
			} else {
				allFiles.push(lfiles[i]);
			}
		}

		return {
			code: '2000',
			message: 'Module list found',
			data: allFiles,
		}
	}
}

import { Injectable } from '@nestjs/common';
import { 
	InjectModel,
	synchronize,
} from 'nestjs-objection';
import bcrypt from 'bcrypt';
import { User as UserModel } from '../Models/UserModel';
import { RoleUser as RoleUserModel } from '../Models/RoleUserModel';
import { QueryBuilder } from '../Helpers/DatatableBuilder';
import { Hash } from '../Helpers/Hash';
import { CheckAuth } from '../Helpers/CheckAuth';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(UserModel) private readonly userModel: typeof UserModel,
		@InjectModel(RoleUserModel) private readonly roleUserModel: typeof RoleUserModel,
	) {}

	async getByEmail(username: string): Promise<any> {
		const user = await this.userModel.query().where('email', username).first();
		if (!user) {
			return this.getByUsername(username);
		}
		const roles = await user.$relatedQuery('roles').select('id','role_title','role_slug', 'role_access').orderBy('id', 'DESC');
		const users_roles = [];
		for(let i in roles) {
			users_roles.push(roles[i]['role_slug']);
		}
		user.roles = users_roles;
		return user;
	}

	async getByUsername(username: string): Promise<any> {
		const user = await this.userModel.query().where('username', username).first();
		if (!user) {
			return null;
		}
		const roles = await user.$relatedQuery('roles').select('id','role_title','role_slug', 'role_access').orderBy('id', 'DESC');
		const users_roles = [];
		for(let i in roles) {
			users_roles.push(roles[i]['role_slug']);
		}
		user.roles = users_roles;
		return user;
	}

	// async datatable(req: any): Promise<any> {
	// 	let newAuth = new CheckAuth();
	// 	let checkAuth = await newAuth.get('User', 'read', req.user.data)
	// 	if (!checkAuth) {
	// 		return {
	// 			code: '4003',
	// 			message: 'User cannot access this module',
	// 			data: []
	// 		}
	// 	}

	// 	const formData = req.body;
	// 	let tableDefinition = null;

	// 	if (req.user.data.roles.includes('superadmin')) {
	// 		tableDefinition = {
	// 			sTableName: 'users',
	// 			sSelectSql: ["users.id", "users.username", "users.email", "users.fullname", "users.user_type", "users.user_role", "users.block"],
	// 			aSearchColumns: ["users.username", "users.email", "users.fullname", "users.user_type", "users.user_role", "users.block"],
	// 			sFromSql: "users"
	// 		};
	// 	} else {
	// 		tableDefinition = {
	// 			sTableName: 'users',
	// 			sSelectSql: ["users.id", "users.username", "users.email", "users.fullname", "users.user_type", "users.user_role", "users.block"],
	// 			aSearchColumns: ["users.username", "users.email", "users.fullname", "users.user_type", "users.user_role", "users.block"],
	// 			sFromSql: "users",
	// 			sWhereAndSql: 'users.id = "'+ req.user.id +'"'
	// 		};
	// 	}
		
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

	// 	const Database = this.userModel.knex();
	// 	let select = await Database.raw(queries.select);
	// 	let recordsTotal = await Database.raw(queries.recordsTotal);
	// 	let recordsFiltered = queries.recordsFiltered ? await Database.raw(queries.recordsFiltered) : null;

	// 	let MyHash = new Hash();
	// 	let fdata = [];
	// 	let no = 0;
	// 	let userType = ['Employee','Management'];
	// 	for(let x in select[0]) {
	// 		let id = select[0][x]['id'];
	// 		let check = '';
	// 		let action = '';
	// 		if (select[0][x]['id'] == req.user.id) {
	// 			check = "";
	// 			action = "<div class='text-center'>\
	// 				<div class='btn-group btn-group-sm'>\
	// 					<a href='javascript:void(0);' data-href='/module/user/edit?id="+ MyHash.encrypt(id.toString()) +"' data-as='/user/edit/"+ MyHash.encrypt(id.toString()) +"' class='btn btn-sm btn-primary btn-edit' title='Edit'><i class='bi bi-pencil'></i></a>\
	// 				</div>\
	// 			</div>\n";
	// 		} else {
	// 			check = "<div class='text-center'>\
	// 				<input type='checkbox' id='titleCheckdel' />\
	// 				<input type='hidden' class='deldata' name='item[]' value='"+ MyHash.encrypt(id.toString()) +"' disabled />\
	// 			</div>\n";
	// 			action = "<div class='text-center'>\
	// 				<div class='btn-group btn-group-sm'>\
	// 					<a href='javascript:void(0);' data-href='/module/user/edit?id="+ MyHash.encrypt(id.toString()) +"' data-as='/user/edit/"+ MyHash.encrypt(id.toString()) +"' class='btn btn-sm btn-primary btn-edit' title='Edit'><i class='bi bi-pencil'></i></a>\
	// 					<a href='javascript:void(0);' class='btn btn-sm btn-danger alertdel' id='"+ MyHash.encrypt(id.toString()) +"' title='Delete'><i class='bi bi-trash'></i></a>\
	// 				</div>\
	// 			</div>\n";
	// 		}
	// 		fdata.push([
	// 			check,
	// 			select[0][x]['id'],
	// 			select[0][x]['username'],
	// 			select[0][x]['email'],
	// 			select[0][x]['fullname'],
	// 			userType[Number(select[0][x]['user_type'])-1],
	// 			select[0][x]['block'],
	// 			action
	// 		]);
	// 		no++;
	// 	}
		
	// 	let data = {
	// 		draw: formData.draw,
	// 		recordsTotal: JSON.stringify(recordsTotal[0][0]['COUNT(users.id)']),
	// 		recordsFiltered: (queries.recordsFiltered) ? JSON.stringify(recordsFiltered[0][0]['COUNT(users.id)']) : JSON.stringify(recordsTotal[0][0]['COUNT(users.id)']),
	// 		data: fdata
	// 	};
		
	// 	return data;
	// }

	async create(req: any): Promise<any> {
		let newAuth = new CheckAuth();
		let checkAuth = await newAuth.get('User', 'create', req.user.data)
		if (!checkAuth) {
			return {
				code: '4003',
				message: 'User cannot access this module',
				data: []
			}
		}

		const { fullname, username, email, password, user_type, user_role } = req.body;

		const salt = await bcrypt.genSalt(10);
    	const passwordHash = await bcrypt.hash(password, salt);

		let formData = {
			username: username,
			email: email,
			fullname: fullname,
			password: passwordHash,
			user_type: Number(user_type),
			user_role: Number(user_role),
			social_token: '',
			activation_key: passwordHash,
			block: 'N',
			forget_key: null,
			created_by: req.user.id,
			updated_by: req.user.id,
		};

		try {
			let newuser = await this.userModel.query().insert(formData);
			
			await this.roleUserModel.query().insert({
				role_id: Number(user_role),
				user_id: newuser.id,
				created_by: req.user.id,
				updated_by: req.user.id,
			});

			return {
				code: '2000',
				message: 'User success created',
				data: [],
			};
		} catch (e) {
			return {
				code: '4004',
				message: 'User error created',
				data: [],
			};
		}
	}

	async edit(req: any): Promise<any> {
		let newAuth = new CheckAuth();
		let checkAuth = await newAuth.get('User', 'update', req.user.data)
		if (!checkAuth) {
			return {
				code: '4003',
				message: 'User cannot access this module',
				data: []
			}
		}

		const formData = req.body;
		
		let user = null;
		let sessionUser = req.user.data.roles;
		let MyHash = new Hash();

		if (req.user.id == '1') {
			user = await this.userModel.query().select('users.*', 'roles.role_title').leftJoin('roles', 'users.user_role', 'roles.id').where('users.id', MyHash.decrypt(formData.id)).first();
		} else {
			if (req.user.id == MyHash.decrypt(formData.id)) {
				user = await this.userModel.query().select('users.*', 'roles.role_title').leftJoin('roles', 'users.user_role', 'roles.id').where('users.id', MyHash.decrypt(formData.id)).first();
			} else {
				if (sessionUser[0] == 'superadmin') {
					user = await this.userModel.query().select('users.*', 'roles.role_title').leftJoin('roles', 'users.user_role', 'roles.id').where('users.id', MyHash.decrypt(formData.id)).first();
				} else {
					user = false;
				}
			}
		}
		if (user) {
			user.password = null;
			return {
				code: '2000',
				message: 'User found',
				data: user,
			};
		} else {
			return {
				code: '4004',
				message: 'User not found',
				data: [],
			};
		}
	}

	async update(params: any, req: any): Promise<any> {
		let newAuth = new CheckAuth();
		let checkAuth = await newAuth.get('User', 'update', req.user.data)
		if (!checkAuth) {
			return {
				code: '4003',
				message: 'User cannot access this module',
				data: []
			}
		}

		const { fullname, username, email, password, user_type, user_role, block } = req.body;

		let user = null;
		let sessionUser = req.user.data.roles;
		let MyHash = new Hash();

		if (req.user.id == '1') {
			user = await this.userModel.query().where('id', MyHash.decrypt(params.id));
		} else {
			if (req.user.id == await MyHash.decrypt(params.id)) {
				user = await this.userModel.query().where('id', MyHash.decrypt(params.id));
			} else {
				if (sessionUser[0] == 'superadmin') {
					user = await this.userModel.query().where('id', MyHash.decrypt(params.id));
				} else {
					user = false;
				}
			}
		}

		const salt = await bcrypt.genSalt(10);
    	const passwordHash = await bcrypt.hash(password, salt);

		try {
			if (user) {
				if (password == '' || password == null) {
					await this.userModel.query().where('id', MyHash.decrypt(params.id)).update({
						username: username,
						email: email,
						fullname: fullname,
						user_type: Number(user_type),
						user_role: Number(user_role),
						block: block,
						updated_by: req.user.id,
					});
				} else {
					await this.userModel.query().where('id', MyHash.decrypt(params.id)).update({
						username: username,
						email: email,
						fullname: fullname,
						password: passwordHash,
						user_type: Number(user_type),
						user_role: Number(user_role),
						block: 'N',
						updated_by: req.user.id,
					});
				}

				await this.roleUserModel.query().where('user_id', MyHash.decrypt(params.id)).update({
					role_id: Number(user_role),
					user_id: Number(await MyHash.decrypt(params.id)),
					updated_by: req.user.id,
				});

				return {
					code: '2000',
					message: 'User success updated',
					data: [],
				};
			} else {
				return {
					code: '4004',
					message: 'User not found',
					data: [],
				};
			}
		} catch (e) {
			return {
				code: '4004',
				message: 'User error updated',
				data: [],
			};
		}
	}

	async delete(req: any): Promise<any> {
		let newAuth = new CheckAuth();
		let checkAuth = await newAuth.get('User', 'delete', req.user.data)
		if (!checkAuth) {
			return {
				code: '4003',
				message: 'User cannot access this module',
				data: []
			}
		}

		const formData = req.body;

		let user = null;
		let sessionUser = req.user.data.roles;
		let MyHash = new Hash();

		if (MyHash.decrypt(formData.id) != req.user.id) {
			if (req.user.id == '1') {
				user = await this.userModel.query().where('id', MyHash.decrypt(formData.id)).first();
			} else {
				if (req.user.id == MyHash.decrypt(formData.id)) {
					user = await this.userModel.query().where('id', MyHash.decrypt(formData.id)).first();
				} else {
					if (sessionUser[0] == 'superadmin') {
						user = await this.userModel.query().where('id', MyHash.decrypt(formData.id)).first();
					} else {
						user = false;
					}
				}
			}
			if (user) {
				try {
					await this.userModel.query().where('id', user.id).delete();
					
					return {
						code: '2000',
						message: 'User success deleted',
						data: [],
					}
				} catch (e) {
					return {
						code: '4004',
						message: 'User error deleted',
						data: [],
					}
				}
			} else {
				return {
					code: '4004',
					message: 'User not found',
					data: [],
				}
			}
		} else {
			return {
				code: '4004',
				message: 'User not found',
				data: [],
			}
		}
	}

	async multiDelete(req: any): Promise<any> {
		let newAuth = new CheckAuth();
		let checkAuth = await newAuth.get('User', 'delete', req.user.data)
		if (!checkAuth) {
			return {
				code: '4003',
				message: 'User cannot access this module',
				data: []
			}
		}

		const formData = req.body;

		let user = null;
		let sessionUser = req.user.data.roles;
		let MyHash = new Hash();

		if (formData.totaldata != '0') {
			let dataitem = JSON.parse(formData.item)
			for (let i in dataitem) {
				if (MyHash.decrypt(dataitem[i]) != req.user.id) {
					if (req.user.id == '1') {
						user = await this.userModel.query().where('id', MyHash.decrypt(dataitem[i])).first();
						try {
							await this.userModel.query().where('id', user.id).delete();
						} catch (e) {}
					} else {
						if (req.user.id == MyHash.decrypt(dataitem[i])) {
							user = await this.userModel.query().where('id', MyHash.decrypt(dataitem[i])).first();
							try {
								await this.userModel.query().where('id', user.id).delete();
							} catch (e) {}
						} else {
							if (sessionUser[0] == 'superadmin') {
								user = await this.userModel.query().where('id', MyHash.decrypt(dataitem[i])).first();
								try {
									await this.userModel.query().where('id', user.id).delete();
								} catch (e) {}
							} else {
								user = false;
							}
						}
					}
				}
			}
			
			return {
				code: '2000',
				message: 'User success deleted',
				data: [],
			}
		} else {
			return {
				code: '4004',
				message: 'User not found',
				data: [],
			}
		}
	}
}

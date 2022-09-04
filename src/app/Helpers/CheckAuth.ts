import { Injectable } from '@nestjs/common';
import _lo from 'lodash';
import { RoleUser as RoleUserModel } from '../Models/RoleUserModel';

@Injectable()
export class CheckAuth {
	async get(mod: any, permit: any, auth: any): Promise<any> {
		let roleStatus = false;
		let userRoles = await RoleUserModel.query()
			.select('role_user.*', 'roles.role_access')
			.where('role_user.user_id', auth.id)
			.leftJoin('roles', 'role_user.role_id', 'roles.id')
			.first();
		let roleState = userRoles['role_access'] == null ? null : JSON.parse(userRoles['role_access']);
		let isRole = '';
		if (!roleState) {
			roleStatus = false;
		} else {
			if (permit == 'create') {
				isRole = _lo.find(roleState, { 'component': mod, 'create': '1' });
			} else if (permit == 'read') {
				isRole = _lo.find(roleState, { 'component': mod, 'read': '1' });
			} else if (permit == 'update') {
				isRole = _lo.find(roleState, { 'component': mod, 'update': '1' });
			} else if (permit == 'delete') {
				isRole = _lo.find(roleState, { 'component': mod, 'delete': '1' });
			} else {
				isRole = null;
			}
			if (isRole) {
				roleStatus = true;
			} else {
				roleStatus = false;
			}
		}
		return roleStatus;
	}
}

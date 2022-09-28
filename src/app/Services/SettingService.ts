import { Injectable } from '@nestjs/common';
import { 
	InjectModel,
} from 'nestjs-objection';
import { Setting as SettingModel } from '../Models/SettingModel';
import { Hash } from '../Helpers/Hash';
import { CheckAuth } from '../Helpers/CheckAuth';

@Injectable()
export class SettingService {
	constructor(
		@InjectModel(SettingModel) private readonly settingModel: typeof SettingModel
	) {}

	async getByGroup(req: any): Promise<any> {
		let newAuth = new CheckAuth();
		let checkAuth = await newAuth.get('Setting', 'read', req.user.data)
		if (!checkAuth) {
			return {
				code: '4003',
				message: 'User cannot access this module',
				data: []
			}
		}

		const formData = req.body;
		
		let settings = await this.settingModel.query().select('settings.*').where('settings.groups', formData.groups);
		
		if (settings) {
			return {
				code: '2000',
				message: 'Setting found',
				data: settings,
			};
		} else {
			return {
				code: '4004',
				message: 'Setting not found',
				data: [],
			};
		}
	}

	async edit(req: any): Promise<any> {
		let newAuth = new CheckAuth();
		let checkAuth = await newAuth.get('Setting', 'update', req.user.data)
		if (!checkAuth) {
			return {
				code: '4003',
				message: 'User cannot access this module',
				data: []
			}
		}

		const formData = req.body;
		let MyHash = new Hash();
		
		let setting = await this.settingModel.query().select('settings.*').where('settings.id', MyHash.decrypt(formData.id)).first();
		
		if (setting) {
			return {
				code: '2000',
				message: 'Setting found',
				data: setting,
			};
		} else {
			return {
				code: '4004',
				message: 'Setting not found',
				data: [],
			};
		}
	}

	async update(param: any, req: any): Promise<any> {
		let newAuth = new CheckAuth();
		let checkAuth = await newAuth.get('Setting', 'update', req.user.data)
		if (!checkAuth) {
			return {
				code: '4003',
				message: 'User cannot access this module',
				data: []
			}
		}

		const { groups, options, value } = req.body;
		let MyHash = new Hash();

		let setting = await this.settingModel.query().where('id', MyHash.decrypt(param.id)).where('groups', groups).first();

		try {
			if (setting) {
				await this.settingModel.query().where('id', setting.id).update({
					options: options,
					value: value,
					updated_by: req.user.id,
				});

				return {
					code: '2000',
					message: 'Setting success updated',
					data: [],
				};
			} else {
				return {
					code: '4004',
					message: 'Setting not found',
					data: [],
				};
			}
		} catch (e) {
			return {
				code: '4004',
				message: 'Setting error updated',
				data: [],
			};
		}
	}
}

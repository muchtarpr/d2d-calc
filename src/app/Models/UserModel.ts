import { 
	Model, Column, Relation, Table, relationTypes, columnTypes, Modifier
} from 'nestjs-objection';
import { Role as RoleModel } from './RoleModel';

@Table({ tableName: 'users' })
export class User extends Model {
	@Column({ type: columnTypes.increments })
	id: number;
	@Column({ type: columnTypes.string })
	username: string;
	@Column({ type: columnTypes.string })
	email: string;
	@Column({ type: columnTypes.string })
	password: string;
	@Column({ type: columnTypes.string })
	fullname: string;
	@Column({ type: columnTypes.integer })
	user_type: number;
	@Column({ type: columnTypes.integer })
	user_role: number;
	@Column({ type: columnTypes.text })
	social_token: string;
	@Column({ type: columnTypes.string })
	login_source: string;
	@Column({ type: columnTypes.string })
	block: string;
	@Column({ type: columnTypes.string })
	activation_key: string;
	@Column({ type: columnTypes.string })
	forget_key: string;
	@Column({ type: columnTypes.string })
	player_id: string;
	@Column({ type: columnTypes.string })
	player_id_mobile: string;
	@Column({ type: columnTypes.string })
	telephone: string;
	@Column({ type: columnTypes.string })
	telephone_otp: string;
	@Column({ type: columnTypes.integer })
	telephone_verified: number;
	@Column({ type: columnTypes.string })
	current_token: string;
	@Column({ type: columnTypes.integer })
	created_by: number;
	@Column({ type: columnTypes.integer })
	updated_by: number;
	@Column({ type: columnTypes.datetime })
	created_at: string;
	@Column({ type: columnTypes.datetime })
	updated_at: string;

	@Modifier()
	$beforeInsert() {
		this.created_at = new Date().toISOString();
	}

	@Modifier()
	$beforeUpdate() {
		this.updated_at = new Date().toISOString();
	}

	@Relation({
		modelClass: RoleModel,
		relation: relationTypes.HasManyRelation,
		join: { from: 'users.user_role', to: 'roles.id' },
	})
	roles: RoleModel[];
}

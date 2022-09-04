import { 
	Model, Column, Relation, Table, relationTypes, columnTypes, Modifier
} from 'nestjs-objection';
import { User as UserModel } from './UserModel';
import { Role as RoleModel } from './RoleModel';

@Table({ tableName: 'role_user' })
export class RoleUser extends Model {
	@Column({ type: columnTypes.increments })
	id: number;
	@Column({ type: columnTypes.integer })
	role_id: number;
	@Column({ type: columnTypes.integer })
	user_id: number;
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
		modelClass: UserModel,
		relation: relationTypes.BelongsToOneRelation,
		join: { from: 'role_user.user_id', to: 'users.id' },
	})
	user: UserModel;

	@Relation({
		modelClass: RoleModel,
		relation: relationTypes.BelongsToOneRelation,
		join: { from: 'role_user.role_id', to: 'roles.id' },
	})
	roles: RoleModel;
}

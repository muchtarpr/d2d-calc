import { 
	Model, Column, Relation, Table, relationTypes, columnTypes, Modifier
} from 'nestjs-objection';
import { User as UserModel } from './UserModel';

@Table({ tableName: 'roles' })
export class Role extends Model {
	@Column({ type: columnTypes.increments })
	id: number;
	@Column({ type: columnTypes.string })
	role_title: string;
	@Column({ type: columnTypes.string })
	role_slug: string;
	@Column({ type: columnTypes.text })
	role_access: string;
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
		relation: relationTypes.HasManyRelation,
		join: { from: 'roles.id', to: 'users.user_role' },
	})
	users: UserModel[];
}

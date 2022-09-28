import { 
	Model, Column, Relation, Table, relationTypes, columnTypes, Modifier
} from 'nestjs-objection';

@Table({ tableName: 'settings' })
export class Setting extends Model {
	@Column({ type: columnTypes.increments })
	id: number;
	@Column({ type: columnTypes.string })
	groups: string;
	@Column({ type: columnTypes.string })
	options: string;
	@Column({ type: columnTypes.text })
	value: string;
	@Column({ type: columnTypes.string })
	serialized: number;
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
}

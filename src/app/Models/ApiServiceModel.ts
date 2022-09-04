import { 
	Model, Column, Relation, Table, relationTypes, columnTypes
} from 'nestjs-objection';

@Table({ tableName: 'api_services' })
export class ApiService extends Model {
	@Column({ type: columnTypes.increments })
	id: number;
	@Column({ type: columnTypes.string })
	client_name: string;
	@Column({ type: columnTypes.string })
	client_key: string;
	@Column({ type: columnTypes.string })
	client_secret: string;
	@Column({ type: columnTypes.string })
	permissions: string;
	@Column({ type: columnTypes.string })
	status: string;
	@Column({ type: columnTypes.integer })
	created_by: number;
	@Column({ type: columnTypes.integer })
	updated_by: number;
	@Column({ type: columnTypes.datetime })
	created_at: string;
	@Column({ type: columnTypes.datetime })
	updated_at: string;
}

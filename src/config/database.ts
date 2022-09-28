import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
	mysql: {
		client: 'mysql2',
		connection: {
			host: process.env.DB_HOST || 'localhost',
			port: parseInt(process.env.DB_PORT) || 3306,
			user: process.env.DB_USER || 'root',
			password: process.env.DB_PASSWORD || '',
			database: process.env.DB_DATABASE || 'gkube',
		},
		pool: { min: 2, max: 50, propagateCreateError: false }
	}
}));
import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
	mysql: {
		type: 'mysql' as 'mysql',
		host: process.env.DB_HOST || 'localhost',
		port: parseInt(process.env.DB_PORT) || 3306,
		username: process.env.DB_USER || 'root',
		password: process.env.DB_PASSWORD || '',
		database: process.env.DB_DATABASE || 'gkube',
		entities: [__dirname + '/app/Models/**/*.entity{.ts,.js}'],
		synchronize: false,
		autoLoadEntities: true
	}
}));
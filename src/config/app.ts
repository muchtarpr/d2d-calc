import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
	name: 'GKUBE',
	appKey: process.env.APP_KEY,
	nodeEnv: process.env.NODE_ENV,
}));
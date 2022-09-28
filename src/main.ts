import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieSession from 'cookie-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import { MainModule } from './module';
import { join } from 'path';

declare const module: any;

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(
		MainModule.initialize()
	);
	app.use(cookieParser(process.env.APP_KEY));
	app.use(cookieSession({
		name: 'gkube-session',
		keys: [process.env.APP_KEY],
		maxAge: 24 * 60 * 60 * 1000,
		httpOnly: true,
		signed: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production' ? true : false,
	}));
	app.use(passport.initialize())
	app.use(passport.session())
	app.use(helmet({
		contentSecurityPolicy: false,
		crossOriginEmbedderPolicy: false,
		crossOriginResourcePolicy: { policy: 'same-origin' },
	}));
	app.use(cors({
		origin: '*',
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		preflightContinue: false,
		optionsSuccessStatus: 204,
	}));
	app.use(bodyParser.urlencoded({
		extended: true,
	}));
	app.use(bodyParser.json({
		limit: '20mb',
		strict: true,
	}));
	app.use(bodyParser.raw({
		limit: '20mb',
	}));
	app.use(bodyParser.text({
		limit: '20mb',
	}));
	app.disable('x-powered-by');
	app.useStaticAssets(join(__dirname, '..', 'public'));
	await app.listen(process.env.PORT, process.env.HOST);

	if (process.env.NODE_ENV == 'development') {
		if (module.hot) {
			module.hot.accept();
			module.hot.dispose(() => app.close());
		}
	}
}

bootstrap();

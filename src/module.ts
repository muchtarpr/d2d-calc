import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ObjectionModule, Model } from 'nestjs-objection';
import { join } from 'path';
import appConfig from './config/app';
import dbConfig from './config/database';
import Next from 'next';
import { RenderModule } from 'nest-next';
import { AppModule } from './app/Modules/AppModule';
import { ApiModule } from './app/Modules/ApiModule';
import { AuthModule } from './app/Modules/AuthModule';
import { UserModule } from './app/Modules/UserModule';
import { RoleModule } from './app/Modules/RoleModule';
import { SettingModule } from './app/Modules/SettingModule';
import { ApiService as ApiServiceModel } from './app/Models/ApiServiceModel';
import { User as UserModel } from './app/Models/UserModel';
import { Role as RoleModel } from './app/Models/RoleModel';
import { RoleUser as RoleUserModel } from './app/Models/RoleUserModel';
import { Setting as SettingModel } from './app/Models/SettingModel';
import { ChatModule } from './app/Modules/ChatModule';
import { PrescriptionModule } from './app/Modules/PrescriptionModule';
import { MasterModule } from './app/Modules/MasterModule';
import { FileModule } from './app/Modules/FileModule';

declare const module: any;

export class MainModule {
	public static initialize(): DynamicModule {
		let renderModule = null;

		if (appConfig().nodeEnv == 'development') {
			renderModule =
				module.hot?.data?.renderModule ??
				RenderModule.forRootAsync(
					Next({
						dev: false,
						dir: join(__dirname, '../next'),
					}),
					{ passthrough404: true, viewsDir: '' },
				);

			if (module.hot) {
				module.hot.dispose((data: any) => {
					data.renderModule = renderModule;
				});
			}
		} else {
			renderModule = RenderModule.forRootAsync(
				Next({
					dev: true,
					dir: join(__dirname, '../next'),
				}),
				{ passthrough404: true, viewsDir: '' },
			);
		}

		return {
			module: AppModule,
			imports: [
				ConfigModule.forRoot({
					load: [appConfig, dbConfig],
					isGlobal: true,
					expandVariables: true,
				}),
				ObjectionModule.forRootAsync({
					useFactory: () => ({
						Model,
						config: {
							...dbConfig().mysql,
							//...knexSnakeCaseMappers(),
						},
					}),
				}),
				renderModule,
				ObjectionModule.forFeature([
					ApiServiceModel,
					UserModel,
					RoleModel,
					RoleUserModel,
					SettingModel,
				]),
				ApiModule,
				AuthModule,
				UserModule,
				RoleModule,
				SettingModule,
				AppModule,
				ChatModule,
				PrescriptionModule,
				MasterModule,
				FileModule,
			],
			exports: [ObjectionModule],
		};
	}
}

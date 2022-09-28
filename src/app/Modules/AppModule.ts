import { Module } from '@nestjs/common';
import { AppController } from '../Controllers/AppController';
import { AppService } from '../Services/AppService';
import { ApiModule } from '../Modules/ApiModule';

@Module({
	imports: [ApiModule],
	controllers: [AppController],
	providers: [AppService],
	exports: [AppService],
})

export class AppModule {}

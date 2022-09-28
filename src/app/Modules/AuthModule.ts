import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '../Controllers/AuthController';
import { AuthService } from '../Services/AuthService';
import { SessionSerializer } from '../Services/SessionSerializerService';
import { UserModule } from '../Modules/UserModule';
import { LocalStrategy } from '../Strategy/LocalStrategy';

@Module({
	imports: [UserModule, PassportModule.register({ session: true })],
	controllers: [AuthController],
	providers: [AuthService, LocalStrategy, SessionSerializer],
	exports: [AuthService, PassportModule.register({ session: true })],
})

export class AuthModule {}

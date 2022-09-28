import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ChatController } from '../Controllers/ChatController';
import { ChatService } from '../Services/ChatService';

@Module({
	imports: [HttpModule],
	controllers: [ChatController],
	providers: [ChatService],
	exports: [ChatService],
})
export class ChatModule {}

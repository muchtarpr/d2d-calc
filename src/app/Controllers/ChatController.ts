import {
	Controller,
	Body,
	Get,
	Post,
	Header,
	Headers,
	HttpCode,
	Param,
	Request,
	Response,
} from '@nestjs/common';
import { ChatService } from '../Services/ChatService';

@Controller()
export class ChatController {
	constructor(private readonly chatService: ChatService) {}

	@HttpCode(200)
	@Get('/api/v1/chat/detail')
	@Header('Content-type', 'application/json')
	async getChatDetail(@Request() req: any): Promise<any> {
		return this.chatService.getDetail();
	}

	@HttpCode(200)
	@Get('/api/v1/consul/user/:orderNumber/:type')
	@Header('Content-type', 'application/json')
	async getConsulUser(@Param() param: any, @Request() req: any, @Headers() header: any): Promise<any> {
		return this.chatService.getConsulUser(param, req, header);
	}

	@HttpCode(200)
	@Get('/api/v1/consul/verify/:token')
	@Header('Content-type', 'application/json')
	async postChatVerify(@Param() param: any, @Request() req: any): Promise<any> {
		return this.chatService.postChatVerify(param?.token);
	}

	@HttpCode(200)
	@Get('/api/v1/consul/detail/:orderNumber')
	@Header('Content-type', 'application/json')
	async getConsulDetail(@Param() param: any, @Request() req: any, @Headers() header: any): Promise<any> {
		return this.chatService.getConsulDetail(param?.orderNumber, header);
	}
}

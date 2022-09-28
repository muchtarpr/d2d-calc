
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();
		const status = exception.getStatus();
		const exp = exception.getResponse();

		response.status(status).json({
			code: status,
			message: exp['error'] ? exp['error'] : 'Error ' + status,
			data: exp['message'] ? exp['message'] : {},
		});
	}
}


import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform {
	async transform(value: any, metadata: ArgumentMetadata) {
		if (!value) {
			throw new BadRequestException('No data submitted');
		}
	  
		const { metatype } = metadata;
		if (!metatype || !this.toValidate(metatype)) {
			return value;
		}

		const object = plainToClass(metatype, value);
		const errors = await validate(object);
		if (errors.length > 0) {
			throw new HttpException({
				error: 'Input data validation failed',
				message:  this.buildError(errors),
			}, HttpStatus.BAD_REQUEST);
		}
		return value;
	}

	private buildError(errors: any) {
		const result = {};
		for(let i in errors) {
			let prop = errors[i]['property'];
			let constraints = errors[i]['constraints'];
			let messages = [];
			for(let j in constraints) {
				messages.push(constraints[j]);
			};
			result[prop] = messages;
		};
		return result;
	}

	private toValidate(metatype: any): boolean {
		const types = [String, Boolean, Number, Array, Object];
		return !types.find((type) => metatype === type);
	}
}

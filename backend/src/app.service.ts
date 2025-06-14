import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthCheck() {
    return {
      statusCode: HttpStatus.OK,
      message: 'My Tube server is running...',
      success: true,
      data: null,
    };
  }
}

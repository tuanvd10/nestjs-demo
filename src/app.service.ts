import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AppService {
  getHello(request: Request): string {
    return 'Hello World!' + request.query.data;
  }
}

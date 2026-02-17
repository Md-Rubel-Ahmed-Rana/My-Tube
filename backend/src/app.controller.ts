import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/")
  healthCheckRoot() {
    return this.appService.healthCheck();
  }

  @Get("/health")
  healthCheck() {
    return this.appService.healthCheck();
  }
}

import { Global, Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";

import { AllExceptionFilter } from "./all_exception.filter";
import { LoggerService } from "./logger/logger.service";

@Global()
@Module({ providers: [{ provide: APP_FILTER, useClass: AllExceptionFilter }, LoggerService], exports: [LoggerService] })
export class InfraModule {}

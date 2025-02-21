import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiFoundResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { ApplicationTenantDBService } from '../services/application_tenant_db.service';
import { ApplicationTenantDB, ApplicationTenantDBDTO } from '../dtos/application_tenant_db.dto';
import { ERROR_APPLICATION_TENANT_DB_NOT_FOUND, ERROR_APPLLICATION_TENANT_DB_EXISTS } from '../constants/application_tenant_db.constants';
import { AdminGuard } from '@shared/guards/admin.guard';

@ApiTags('application/tenant/db')
@Controller('application/tenant/db')
@UseGuards(AdminGuard)
export class ApplicationTenantDBController {
  constructor(private readonly applicationTenantDBSrv: ApplicationTenantDBService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Register a new application tenant db.',
    description: 'This endpoint register a new application tenant db.',
  })
  @ApiBody({
    description: 'The registration details for the new application tenant db.',
  })
  @ApiCreatedResponse({
    description: 'The application tenant db was successfully registered.',
  })
  @ApiBadRequestResponse({
    description: ERROR_APPLLICATION_TENANT_DB_EXISTS,
  })
  async register(@Body() registerBodyDto: ApplicationTenantDBDTO): Promise<ApplicationTenantDB> {
    return this.applicationTenantDBSrv.register(registerBodyDto);
  }

  @Get('list')
  @ApiOperation({
    summary: 'Get the list of application tenant dbs',
    description: 'This endpoint get the list of application tenant dbs'
  })
  @ApiFoundResponse({
    status: 200,
    description: 'The list of application tenant dbs was returned'
  })
  async list(): Promise<ApplicationTenantDB[]> {
    return this.applicationTenantDBSrv.list();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a application tenant db',
    description: 'This endpoint get a application tenant db'
  })
  @ApiFoundResponse({
    status: 200,
    description: 'The application tenant db was succesfully founded'
  })
  @ApiNotFoundResponse({
    description: ERROR_APPLICATION_TENANT_DB_NOT_FOUND
  })
  async find(@Param('id') id: string): Promise<ApplicationTenantDB | undefined> {
    return this.applicationTenantDBSrv.findById(id);
  }
}
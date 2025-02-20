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

import { ApplicationService } from '../services/application.service';
import { Application, ApplicationDTO } from '../dtos/application.dto';
import { ERROR_APPLICATION_NOT_FOUND, ERROR_APPLLICATION_EXISTS } from '../constants/application.constants';
import { AdminGuard } from '@shared/guards/admin.guard';

@ApiTags('application')
@Controller('application')
@UseGuards(AdminGuard)
export class ApplicationController {
  constructor(private readonly applicationSrv: ApplicationService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Register a new application.',
    description: 'This endpoint register a new application.',
  })
  @ApiBody({
    description: 'The registration details for the new application.',
    type: Application,
  })
  @ApiCreatedResponse({
    description: 'The application was successfully registered.',
    type: Application,
  })
  @ApiBadRequestResponse({
    description: ERROR_APPLLICATION_EXISTS,
  })
  async register(@Body() registerBodyDto: ApplicationDTO): Promise<Application> {
    return this.applicationSrv.register(registerBodyDto);
  }

  @Get('list')
  @ApiOperation({
    summary: 'Get the list of applications',
    description: 'This endpoint get the list of applications'
  })
  @ApiFoundResponse({
    status: 200,
    description: 'The list of applications was returned'
  })
  async list(): Promise<Application[]> {
    return this.applicationSrv.list();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a application',
    description: 'This endpoint get a application'
  })
  @ApiFoundResponse({
    status: 200,
    description: 'The application was succesfully founded'
  })
  @ApiNotFoundResponse({
    description: ERROR_APPLICATION_NOT_FOUND
  })
  async find(@Param('id') id: string): Promise<Application | undefined> {
    return this.applicationSrv.findById(id);
  }
}
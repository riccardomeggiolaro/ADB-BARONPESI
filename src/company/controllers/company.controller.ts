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

import { CompanyService } from '../services/company.service';
import { Company, CompanyDTO } from '../dtos/company.dto';
import { ERROR_COMPANY_EXISTS, ERROR_COMPANY_NOT_FOUND } from '../constants/company.constants';
import { AdminGuard } from '@shared/guards/admin.guard';

@ApiTags('company')
@Controller('company')
@UseGuards(AdminGuard)
export class CompanyController {
  constructor(private readonly companySrv: CompanyService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Register a new company.',
    description: 'This endpoint register a new company.',
  })
  @ApiBody({
    description: 'The registration details for the new company.',
    type: Company,
  })
  @ApiCreatedResponse({
    description: 'The company was successfully registered.',
    type: Company,
  })
  @ApiBadRequestResponse({
    description: ERROR_COMPANY_EXISTS,
  })
  async register(@Body() registerBodyDto: CompanyDTO): Promise<Company> {
    return this.companySrv.register(registerBodyDto);
  }

  @Get('list')
  @ApiOperation({
    summary: 'Get the list of companies',
    description: 'This endpoint get the list of companies'
  })
  @ApiFoundResponse({
    status: 200,
    description: 'The list of companies was returned'
  })
  async list(): Promise<Company[]> {
    return this.companySrv.list();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a company',
    description: 'This endpoint get a company'
  })
  @ApiFoundResponse({
    status: 200,
    description: 'The company was succesfully founded'
  })
  @ApiNotFoundResponse({
    description: ERROR_COMPANY_NOT_FOUND
  })
  async find(@Param('id') id: string): Promise<Company | undefined> {
    return this.companySrv.findById(id);
  }
}

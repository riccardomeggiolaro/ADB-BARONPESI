import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiFoundResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '@shared/guards/admin.guard';
import { AccessAppService } from '../services/access_app.service';
import { AccessApp, AccessAppDTO } from '../dtos/access_app.dto';
import { ERROR_ACCESS_APP_EXISTS, ERROR_ACCESS_APP_NOT_FOUND } from '../constants/access_app.constants';

@ApiTags('access-app')
@Controller('access-app')
@UseGuards(AdminGuard)
export class AccessAppController {
    constructor(private readonly accessAppSrv: AccessAppService) {}

    @Post('register')
    @ApiOperation({
        summary: 'Assign application tenant db to user.',
        description: 'This endpoint assign an application tenant db to an user.',
    })
    @ApiBody({
      description: 'The registration details for the new user.',
      type: AccessAppDTO,
    })
    @ApiOkResponse({
        description: 'The access app was successfully registered.',
    })
    @ApiBadRequestResponse({
        description: ERROR_ACCESS_APP_EXISTS,
    })
    async assign(@Body() registerBodyDTO: AccessAppDTO): Promise<AccessApp> {
        return await this.accessAppSrv.register(registerBodyDTO);
    }

    @Get('list')
    @ApiOperation({
        summary: 'Get the list of access apps',
        description: 'This endpoint get the list of access apps'
    })
    @ApiFoundResponse({
        status: 200,
        description: 'The list of access apps was returned'
    })
    async list(): Promise<AccessApp[]> {
        return await this.accessAppSrv.list();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Get an access app',
        description: 'This endpoint get an access app'
    })
    @ApiFoundResponse({
        status: 200,
        description: 'The access app was succesfully founded'
    })
    @ApiNotFoundResponse({
        description: ERROR_ACCESS_APP_NOT_FOUND
    })
    async find(@Param('id') id: string): Promise<AccessApp | undefined> {
        return await this.accessAppSrv.findById(id);
    }
}
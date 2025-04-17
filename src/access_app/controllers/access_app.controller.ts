import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiFoundResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '@shared/guards/admin.guard';
import { AccessAppService } from '../services/access_app.service';
import { AccessApp, AccessAppDTO, CanAccessApp } from '../dtos/access_app.dto';
import { ERROR_ACCESS_APP_EXISTS, ERROR_ACCESS_APP_NOT_FOUND } from '../constants/access_app.constants';
import { AuthUser } from '@shared/decorators';
import { User } from 'src/identity/user/dtos/user.dto';

@ApiTags('access-app')
@Controller('access-app')
export class AccessAppController {
    constructor(private readonly accessAppSrv: AccessAppService) {}

    @Post('register')
    @UseGuards(AdminGuard)
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
    @UseGuards(AdminGuard)
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
    @UseGuards(AdminGuard)
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

    @Get('can-access/:applicationCode')
    @ApiOperation({
        summary: 'Get an access app by application code and user id',
        description: 'This endpoint get an access app by application code and user id'
    })
    @ApiFoundResponse({
        status: 200,
        description: 'The access app was succesfully founded'
    })
    @ApiNotFoundResponse({
        description: ERROR_ACCESS_APP_NOT_FOUND
    })
    async findByUserIdAndApplicationCode(@AuthUser() user: User, @Param('applicationCode') applicationCode: string): Promise<CanAccessApp | undefined> {
        const accessApp = await this.accessAppSrv.findByUserIdAndApplicationCode(user.id, applicationCode);
        return {
            id: accessApp!.user!.id,
            firstName: accessApp!.user!.firstName,
            lastName: accessApp!.user!.lastName,
            email: accessApp!.user!.email,
            picture: accessApp!.user!.picture,
            createdAt: accessApp!.user!.createdAt.toString(),
            updatedAt: accessApp!.user!.updatedAt.toString(),
            password: accessApp!.user!.password,
            role: String(accessApp!.role),
            isActive: accessApp!.isActive,
            database_connection: accessApp!.application_tenant_db?.database_connection,
            application: accessApp!.application_tenant_db?.application,
            company: accessApp!.application_tenant_db?.company,
            applicationFunctionalData: accessApp!.applicationFunctionalData!,
        };
    }

    @Delete(':id')
    @UseGuards(AdminGuard)
    @ApiOperation({
        summary: 'Delete an access app',
        description: 'This endpoint delete an access app'
    })
    @ApiFoundResponse({
        status: 200,
        description: 'The access app was succesfully deleted'
    })
    @ApiNotFoundResponse({
        description: ERROR_ACCESS_APP_NOT_FOUND
    })
    async delete(@Param('id') id: string): Promise<AccessApp | undefined> {
        return await this.accessAppSrv.deleteById(id);
    }
}
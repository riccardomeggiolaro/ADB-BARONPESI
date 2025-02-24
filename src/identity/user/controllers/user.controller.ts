import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import {
    ApiAcceptedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AdminGuard } from '@shared/guards/admin.guard';
import { UserService } from '../services/user.service';
import { ERROR_USER_NOT_FOUND } from 'src/identity/auth/constants/auth.constants';
import { IsActiveDTO, User } from '../dtos/user.dto';

@ApiTags('user')
@Controller('user')
@UseGuards(AdminGuard)
export class UserController {
    constructor(private readonly userSrv: UserService) {}

    @Get('list')
    @ApiOperation({
        summary: 'Get the list of user.',
        description: 'This endpoint get the list of user.',
    })
    async list(): Promise<User[]> {
        return await this.userSrv.list();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Get a user.',
        description: 'This endpoint get a user.'
    })
    @ApiOkResponse({
        description: 'The user was successfully found.',
    })
    @ApiNotFoundResponse({
        description: ERROR_USER_NOT_FOUND,
    })
    async find(@Param('id') id: string): Promise<User> {
        return this.userSrv.findByIdOrThrow(id);
    }

    @Delete('delete/:id')
    @ApiOperation({
        summary: 'Delete a user.',
        description: 'This endpoint delete a user.'
    })
    @ApiAcceptedResponse({
        description: 'The user was succesfully deleted.',
    })
    @ApiNotFoundResponse({
        description: ERROR_USER_NOT_FOUND,
    })
    async delete(@Param('id') id: string): Promise<{ deleted: User }> {
        const deleted: User = await this.userSrv.deleteById(id);
        return { deleted }
    }

    @Patch('is-active')
    @ApiOperation({
        summary: 'Set isActive a user',
        description: 'This endpoint set isActive in a user'
    })
    @ApiAcceptedResponse({
        description: 'The user was succesfully set in isActive'
    })
    @ApiNotFoundResponse({
        description: ERROR_USER_NOT_FOUND
    })
    async disabled(@Body() isActiveDTO: IsActiveDTO): Promise<User | undefined> {
        return await this.userSrv.isACtive(isActiveDTO);     
    }
}
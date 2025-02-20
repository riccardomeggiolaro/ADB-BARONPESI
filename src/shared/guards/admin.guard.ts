/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/identity/user/dtos/user.dto';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user; // Assuming you have user info attached to the request

        // Check if the user is an admin
        if (user && user.role === Role.ADMIN) {
            return true;
        }

    throw new ForbiddenException('Permission denied: this operation is reserved for administrators only.');        
    }
}
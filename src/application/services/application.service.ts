import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { isDefined } from 'class-validator';
import { PrismaMySqlService } from 'src/config/database/mysql/prisma.mysql.service';
import { Application as PrismaApplication } from '@prisma/client';
import { Application, ApplicationDTO } from '../dtos/application.dto';
import { ERROR_APPLICATION_NOT_FOUND, ERROR_APPLLICATION_EXISTS } from '../constants/application.constants';

@Injectable()
export class ApplicationService {
  constructor(private readonly prisma: PrismaMySqlService) {}

  async register(data: ApplicationDTO): Promise<Application> {
    const existingApplication: Application | undefined = await this.findByCode(data.code);

    if (isDefined(existingApplication)) {
      throw new BadRequestException(ERROR_APPLLICATION_EXISTS);
    }

    const newApplication: PrismaApplication = await this.prisma.application.create({data});

    return new Application(newApplication);
  }

  async findById(id: string): Promise<Application | undefined> {
    const application: PrismaApplication | null = await this.prisma.application.findUnique({
      where: { id },
    });

    if (!isDefined(application)) {
      throw new NotFoundException(ERROR_APPLICATION_NOT_FOUND);
    }

    return new Application(application);
  }

  async findByCode(code: string): Promise<Application | undefined> {
    const application: PrismaApplication | null = await this.prisma.application.findFirst({
      where: { code },
    });

    return isDefined(application) ? new Application(application) : undefined;
  }

  async list(): Promise<Application[]> {
    return await this.prisma.application.findMany();
  }
}
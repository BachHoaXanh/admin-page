import { Injectable } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Information } from './entities/information.entity';
import { CreateInformationDto } from './dto/create-information.dto';
import { UpdateInformationDto } from './dto/update-information.dto';

@Crud({
    model: { type: Information },
    dto: {
        create: CreateInformationDto,
        update: UpdateInformationDto,
    },
})
@Injectable()
export class InformationService extends TypeOrmCrudService<Information> {

    constructor(@InjectRepository(Information) information: Repository<Information>) {
        super(information);
    }

}

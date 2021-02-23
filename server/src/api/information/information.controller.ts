import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import { Information } from './entities/information.entity';
import { CreateInformationDto } from './dto/create-information.dto';
import { UpdateInformationDto } from './dto/update-information.dto';
import { InformationService } from './information.service';

@Crud({
    model: {
        type: Information,
    },
    validation: {
        validationError: {
            target: false,
            value: false,
        },
    },
    routes: {
        exclude: ['createManyBase'],
    },
    dto: {
        create: CreateInformationDto,
        update: UpdateInformationDto,
        replace: UpdateInformationDto,
    },
    query: {
        sort: [{
            field: 'updatedAt',
            order: 'DESC',
        }],
    },
})
@ApiTags('Information')
@Controller('api/information')
export class InformationController {

    constructor(public service: InformationService) {}

}

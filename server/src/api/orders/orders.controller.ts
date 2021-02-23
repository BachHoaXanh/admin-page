import { Body, Controller, Param, Patch, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudRequest, CrudRequestInterceptor, ParsedRequest } from '@nestjsx/crud';
import { OrdersService } from './orders.service';
import { Orders } from './entities/orders.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersInterface } from './interfaces/orders.interface';
import { SetStatusOrderDto } from './dto/set-status-order.dto';

@Crud({
    model: {
        type: Orders,
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
        create: CreateOrderDto,
        update: UpdateOrderDto,
        replace: UpdateOrderDto,
    },
    query: {
        sort: [{
            field: 'updatedAt',
            order: 'DESC',
        }],
    },
})
@ApiTags('Orders')
@Controller('/api/orders')
export class OrdersController {

    constructor(public service: OrdersService) {}

    @Patch('status/:id')
    @UseInterceptors(CrudRequestInterceptor)
    async setStatus(@Param('id') id: number, @Body() body: SetStatusOrderDto,
               @ParsedRequest() req: CrudRequest): Promise<OrdersInterface> {
        return this.service.updateOne(req, { status: body.status });
    }

}

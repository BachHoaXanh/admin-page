import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { Crud, CrudRequest, CrudRequestInterceptor, ParsedRequest } from '@nestjsx/crud';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { Products } from './entities/products.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { editFileName, imageFileFilter } from '../../common/upload/file-upload.utils';

@Crud({
    model: {
        type: Products,
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
        create: CreateProductDto,
        update: UpdateProductDto,
        replace: UpdateProductDto,
    },
})
@ApiTags('Products')
@Controller('api/products')
export class ProductsController {

    constructor(public service: ProductsService) {}

    @Post()
    @UseInterceptors(
        CrudRequestInterceptor,
        FilesInterceptor('images', 10, {
            storage: diskStorage({
                destination: './upload/products',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    async create(@UploadedFiles() files, @Body() body: CreateProductDto, @ParsedRequest() req: CrudRequest) {
        const images: string[] = [];

        files.forEach((file) => {
            images.push(file.path);
        });

        return this.service.createOne(req, { ...body, images });
    }

}

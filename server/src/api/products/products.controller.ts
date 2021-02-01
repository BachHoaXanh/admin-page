import { Body, Controller, Param, Post, Put, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { Crud, CrudRequest, CrudRequestInterceptor, ParsedRequest } from '@nestjsx/crud';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { Products } from './entities/products.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { editFileName, imageFileFilter, removeFile } from '../../common/upload/file-upload.utils';

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
            images.push(JSON.parse(JSON.stringify({
                originalname: file.originalname,
                filename: file.filename,
                mimetype: file.mimetype,
                path: file.path.toString(),
            })));
        });

        return this.service.createOne(req, { ...body, images });
    }

    @Put(':id')
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
    async update(@Param('id') id: number, @UploadedFiles() files,
                 @Body() body: CreateProductDto, @ParsedRequest() req: CrudRequest) {
        const product = await this.service.findOne({ id });
        let newImages: string[] = [];

        // If new Images
        if (files.length !== 0) {
            const oldImages = JSON.parse(JSON.stringify(product.images));

            // delete old images
            oldImages.forEach((image) => removeFile(image.path.replace('/\\/g', '/')));

            files.forEach((file) => {
                newImages.push(JSON.parse(JSON.stringify({
                    originalname: file.originalname,
                    filename: file.filename,
                    mimetype: file.mimetype,
                    path: file.path,
                })));
            });
        }
        newImages = newImages.length !== 0 ? newImages : product.images;

        return this.service.updateOne(req, { ...product, ...body, images: newImages });
    }

}

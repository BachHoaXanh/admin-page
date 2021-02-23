import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InformationController } from './information.controller';
import { InformationService } from './information.service';
import { Information } from './entities/information.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Information])],
    controllers: [InformationController],
    providers: [InformationService],
    exports: [InformationService],
})
export class InformationModule {}

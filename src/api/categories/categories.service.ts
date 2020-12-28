import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesService {

    get() {
        return 1;
    }

    list() {
        return 2;
    }

    create() {
        return 'new';
    }

    update() {
        return 'updated';
    }

    delete() {
        return 'deleted';
    }

}

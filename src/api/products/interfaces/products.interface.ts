export interface ProductsInterface {

    readonly categoryId: number;

    readonly name: string;

    readonly code: string;

    readonly price: number;

    readonly saleOff: number;

    readonly description?: string;

    readonly shortDescription?: string;

}

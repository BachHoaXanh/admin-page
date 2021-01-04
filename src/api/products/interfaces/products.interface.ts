export interface ProductsInterface {

    readonly categoryId: number;

    readonly name: string;

    readonly code: string;

    readonly price: number;

    readonly saleOff: number;

    readonly description?: string;

    readonly shortDescription?: string;

    readonly mfg: Date;

    readonly exp: Date;

    readonly provider: string;

    readonly origination: string;

    readonly createdAt: string;

    readonly updatedAt: string;

}

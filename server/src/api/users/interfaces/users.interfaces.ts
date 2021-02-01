export interface UsersInterfaces {

  readonly id: number;

  readonly email: string;

  readonly password: string;

  readonly firstName: string;

  readonly lastName: string;

  readonly phone: string;

  readonly address: string;

  readonly gender: string;

  readonly token?: string;

  readonly isActive: boolean;

  readonly createdAt: string;

  readonly updatedAt: string;

}

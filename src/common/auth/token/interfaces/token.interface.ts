export interface TokenInterface {
  token: string;
}

export interface SignOptionsTokenInterface {
  subject: string,
  audience: string,
  expiresIn: string,
  algorithm: string,
}

export interface VerifyOptionsTokenInterface {
  subject: string,
  audience: string,
  expiresIn?: string,
  algorithm: [string],
}

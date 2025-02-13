export interface RegisterRequest {
  identification: string;
  firstName: string;
  secondName?: string;
  firstLastName: string;
  secondLastName?: string;
  phoneNumber?: string;
  email: string;
  password: string;
}

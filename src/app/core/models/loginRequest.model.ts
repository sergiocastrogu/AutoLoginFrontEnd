export class LoginModelRequest{
  Username: string;
  Password: string;
  constructor(Username: string, Password: string){
    this.Username = Username;
    this.Password = Password;
  }
}

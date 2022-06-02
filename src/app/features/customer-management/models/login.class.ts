export class Login {
  id: string;
  userName: string;
  password: string;

  constructor(params: any) {
    this.id = params?.id;
    this.userName = params?.userName;
    this.password = params?.password;
  }
}

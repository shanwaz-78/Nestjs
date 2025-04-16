export class RegisterDTO {
  email!: string;
  password!: string;
}

export class LoginDTO extends RegisterDTO {}

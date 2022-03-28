// export interface Customer {
//   id: string;
//   code: string;
//   lastName: string;
//   firstName: string;
//   email: string;
//   address?: string;
//   company?: string;
//   gender: boolean;
//   phone?: string;
//   image?: string;
// }

export class Customer {
  id: string;
  code: string;
  lastName: string;
  firstName: string;
  email: string;
  address?: string;
  // address1?: string;
  address2?: string;
  company?: string;
  gender: boolean;
  phone?: string;
  image?: string;

  constructor(params: any) {
    this.id = params.id;
    this.code = params.code;
    this.lastName = params.lastName;
    this.firstName = params.firstName;
    this.email = params.email;
    this.gender = params.gender;
    this.phone = params.phone;
    this.address = params?.address[0].numberAddress;
    this.address2 = params?.address?.abcAddress;
    // this.address1 = params && params.address && params.address[0]?.abcAddress;
  }
}

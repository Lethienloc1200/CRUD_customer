// export interface Customer {
//   id: string;
//   code: string;
//   lastName: string;
//   firstName: string;
//   email: string;
//   address?: Date;
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
  address: string;
  company?: string;
  gender: boolean;
  phone?: string;
  image?: string;
  addressDetail?: any;
  number?: string;
  name?: string;
  something?: string;

  constructor(params: any) {
    this.id = params?.id;
    this.code = params?.code;
    this.lastName = params?.lastName;
    this.firstName = params?.firstName;
    this.email = params?.email;
    this.gender = params?.gender;
    this.image = params?.image;
    this.phone = params?.phone; //?????code
    this.address = params?.address;
    this.addressDetail = params && params?.addressDetail;
  }
}

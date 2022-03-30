export interface Customer {
  id: string;
  code: string;
  lastName: string;
  firstName: string;
  email: string;
  address?: Date;
  company?: string;
  gender: boolean;
  phone?: string;
  image?: string;
}

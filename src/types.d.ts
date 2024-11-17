export interface IContact {
  id?: string;
  name: string;
  phone: string;
  email: string;
  photo: string
}

export interface IContactForm {
  name: string;
  phone: string;
  email: string;
  photo: string
}

export interface IContactApi {
  [id: string]: IContact;
}

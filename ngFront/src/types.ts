export interface User {
  id: string;
  phoneNumber: string;
  email: string;
  city: string;
  country: Country;
  bio: string;
}

export enum UserRole {
  Employer,
  Jobseeker,
  BaseUser,
}

export interface Country {
  id: number;
  countryCode: string;
  name: string;
  phoneCode: string;
  currencyCode: string;
  currencySymbol: string;
}

export interface City {
  id: string;
  name: string;
}

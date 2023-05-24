import { Dayjs } from 'dayjs';

export type TGender = 'Male' | 'Female';

export interface IGenderOptions {
  id: string;
  name: string;
}

export interface ICity {
  id: string;
  name: string;
}

export interface ISpecialty {
  id: string;
  name: string;
  params?: {
    gender?: TGender;
    maxAge?: number;
    minAge?: number;
  };
}

export interface IDoctor {
  id: string;
  name: string;
  surname: string;
  specialityId: string;
  isPediatrician: boolean;
  cityId: string;
}

export interface IAppointmentFormData {
  name: string;
  birthdayDate: Dayjs | null;
  sex: string;
  city: string;
  doctorSpecialty: string;
  doctor: string;
  email: string;
  phoneNumber: string;
}

type SelectOption = ICity & IDoctor & ISpecialty & IGenderOptions;

export type TSelectOptions = Partial<SelectOption>[];

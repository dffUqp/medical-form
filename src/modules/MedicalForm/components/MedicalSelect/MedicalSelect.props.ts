import {
  IAppointmentFormData,
  IDoctor,
  ISpecialty,
  TSelectOptions,
} from '../../interfaces';

type TMedicalSelectStaticProps = {
  options: TSelectOptions;
  label: string;
};

type TMedicalSelectProps = (
  | {
      name: 'doctor';
      specialties: ISpecialty[];
      doctors?: never;
    }
  | {
      name: 'doctorSpecialty';
      doctors: IDoctor[];
      specialties?: never;
    }
  | {
      name: keyof IAppointmentFormData;
      doctors?: never;
      specialties?: never;
    }
) &
  TMedicalSelectStaticProps;

export default TMedicalSelectProps;

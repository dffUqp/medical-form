import { useMemo } from 'react';
import dayjs from 'dayjs';
import {
  IAppointmentFormData,
  IDoctor,
  ISpecialty,
  TSelectOptions,
} from '../interfaces';
import { filterDoctors, filterDoctorSpecialties } from '../utils';

type TFilteredDataProps = {
  name: keyof IAppointmentFormData;
  options: TSelectOptions;
  values: IAppointmentFormData;
  specialties?: ISpecialty[];
  doctors?: IDoctor[];
};

const useFilteredOptions = ({
  name,
  values,
  options,
  doctors,
  specialties,
}: TFilteredDataProps): TSelectOptions => {
  const patientAge = useMemo(
    () => dayjs().diff(values.birthdayDate, 'year'),
    [values.birthdayDate]
  );

  if (name === 'doctor' && specialties) {
    const formattedOptions = options.map((option) => ({
      ...option,
      name: `${option.name} ${option.surname}`,
    }));

    return filterDoctors(
      formattedOptions as IDoctor[],
      values,
      patientAge,
      specialties
    );
  }

  if (name === 'doctorSpecialty' && doctors) {
    return filterDoctorSpecialties(
      options as ISpecialty[],
      values,
      patientAge,
      doctors
    );
  }

  return options;
};

export default useFilteredOptions;

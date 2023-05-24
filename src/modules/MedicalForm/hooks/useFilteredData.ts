import dayjs from 'dayjs';
import { useMemo } from 'react';
import filterDoctorSpecialty from '../utils/filterDoctorSpecialty';
import filterDoctor from '../utils/filterDoctor';
import {
  IAppointmentFormData,
  IDoctor,
  ISpecialty,
  TSelectOptions,
} from '../interfaces';

type IFilteredDataProps = {
  options: TSelectOptions;
  name: string;
  doctors?: IDoctor[];
  specialties?: ISpecialty[];
  values: IAppointmentFormData;
};

const useFilteredData = ({
  name,
  values,
  options,
  doctors,
  specialties,
}: IFilteredDataProps): TSelectOptions => {
  const formattedOption = useMemo(
    () =>
      name === 'doctor'
        ? options.map((option) => ({
            ...option,
            name: `${option.name} ${option.surname}`,
          }))
        : options,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [name]
  );

  const patientAge = useMemo(
    () => values.birthdayDate && dayjs().diff(values.birthdayDate, 'year'),
    [values.birthdayDate]
  );

  if (doctors) {
    return filterDoctorSpecialty(
      formattedOption as ISpecialty[],
      values,
      patientAge,
      doctors
    );
  }

  if (specialties) {
    return filterDoctor(
      formattedOption as IDoctor[],
      values,
      patientAge,
      specialties as ISpecialty[]
    );
  }

  return formattedOption;
};

export default useFilteredData;

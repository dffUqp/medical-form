import dayjs from 'dayjs';
import { useMemo } from 'react';
import filterDoctorSpecialty from '../utils/filterDoctorSpecialty';
import filterDoctor from '../utils/filterDoctor';
import { IAppointmentFormData, IDoctor, TSelectOptions } from '../interfaces';

type IFilteredDataProps = {
  options: TSelectOptions;
  name: string;
  doctors?: IDoctor[];
  values: IAppointmentFormData;
};

const useFilteredData = ({
  name,
  values,
  options,
  doctors,
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

  if (name === 'doctorSpecialty') {
    return filterDoctorSpecialty(formattedOption, values, patientAge, doctors);
  }

  if (name === 'doctor') {
    return filterDoctor(formattedOption, values, patientAge);
  }

  return formattedOption;
};

export default useFilteredData;

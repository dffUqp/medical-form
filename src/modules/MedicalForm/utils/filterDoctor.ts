import { IAppointmentFormData, TSelectOptions } from '../interfaces';

const filterDoctor = (
  formattedOption: TSelectOptions,
  values: IAppointmentFormData,
  patientAge: number | null
) => {
  let filteredOptions = formattedOption;

  if (values.city) {
    filteredOptions = filteredOptions.filter((option) => {
      return option.cityId === values.city;
    });
  }

  if (values.doctorSpecialty) {
    filteredOptions = filteredOptions.filter((option) => {
      return option.specialityId === values.doctorSpecialty;
    });
  }

  if (patientAge) {
    filteredOptions = filteredOptions.filter((option) => {
      return option.isPediatrician === patientAge < 16;
    });
  }

  return filteredOptions;
};

export default filterDoctor;

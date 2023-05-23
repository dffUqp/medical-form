import { IAppointmentFormData, TSelectOptions } from '../interfaces';

// Temporary decision
const onlyFemaleSpecialtyIds = ['9', '2'];
const onlyMaleSpecialtyIds = ['3'];

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

  if (values.sex) {
    filteredOptions = filteredOptions.filter((option) => {
      if (values.sex === 'Male') {
        return !onlyFemaleSpecialtyIds.includes(option?.specialityId ?? '');
      }

      return !onlyMaleSpecialtyIds.includes(option?.specialityId ?? '');
    });
  }

  return filteredOptions;
};

export default filterDoctor;

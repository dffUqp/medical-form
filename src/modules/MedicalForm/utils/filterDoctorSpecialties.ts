import { IAppointmentFormData, IDoctor, ISpecialty } from '../interfaces';

const filterDoctorSpecialties = (
  formattedOption: ISpecialty[],
  values: IAppointmentFormData,
  patientAge: number,
  doctors: IDoctor[]
) => {
  let filteredOptions = formattedOption;

  if (values.sex) {
    filteredOptions = filteredOptions.filter((option) => {
      if (option.params?.gender === values.sex) {
        return true;
      }

      if (!option.params?.gender) {
        return true;
      }

      return false;
    });
  }

  if (patientAge >= 0) {
    filteredOptions = filteredOptions.filter((option) => {
      if (option.params?.maxAge) {
        return patientAge < option.params?.maxAge;
      }
      if (option.params?.minAge) {
        return patientAge > option.params?.minAge;
      }
      return true;
    });
  }

  if (values.city) {
    const doctorsInCurrentCity = doctors.filter((value) => {
      if (Number.isNaN(patientAge) || patientAge < 0) {
        return value.cityId === values.city;
      }

      return (
        value.cityId === values.city && value.isPediatrician === patientAge < 16
      );
    });

    filteredOptions = filteredOptions.filter((option) => {
      return doctorsInCurrentCity?.some(
        (value) => value.specialityId === option.id
      );
    });
  }

  return filteredOptions;
};

export default filterDoctorSpecialties;

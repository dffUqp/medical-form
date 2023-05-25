import { IAppointmentFormData, IDoctor, ISpecialty } from '../interfaces';

const filterDoctor = (
  formattedOption: IDoctor[],
  values: IAppointmentFormData,
  patientAge: number | null,
  specialties: ISpecialty[]
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

  if (patientAge != null) {
    filteredOptions = filteredOptions.filter((option) => {
      const doctorSpecialty = specialties.find(
        (spec) => spec.id === option.specialityId
      );

      if (doctorSpecialty?.params?.maxAge) {
        return patientAge < doctorSpecialty.params?.maxAge;
      }
      if (doctorSpecialty?.params?.minAge) {
        return patientAge > doctorSpecialty.params?.minAge;
      }

      return option.isPediatrician === patientAge < 16;
    });
  }

  if (values.sex) {
    filteredOptions = filteredOptions.filter((option) => {
      const doctorSpecialty = specialties.find(
        (spec) => spec.id === option.specialityId
      );

      if (doctorSpecialty?.params?.gender === values.sex) {
        return true;
      }

      if (!doctorSpecialty?.params?.gender) {
        return true;
      }

      return false;
    });
  }

  return filteredOptions;
};

export default filterDoctor;

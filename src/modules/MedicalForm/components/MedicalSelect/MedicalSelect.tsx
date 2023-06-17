import { useEffect } from 'react';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  SelectChangeEvent,
} from '@mui/material';
import { useField, useFormikContext } from 'formik';

import type TMedicalSelectProps from './MedicalSelect.props';

import { IAppointmentFormData } from '../../interfaces';
import useFilteredOptions from '../../hooks/useFilteredData';

const MedicalSelect = ({
  options,
  name,
  doctors,
  specialties,
  label,
}: TMedicalSelectProps) => {
  const [field, meta] = useField(name);
  const { values, setFieldValue } = useFormikContext<IAppointmentFormData>();
  const {
    sex: currentSex,
    birthdayDate: currentBirthdayDate,
    doctorSpecialty: currentDoctorSpecialty,
    doctor: currentDoctor,
    city: currentCity,
  } = values;
  const filteredOptions = useFilteredOptions({
    name,
    values,
    options,
    doctors,
    specialties,
  });
  const isError = meta.touched && meta.error;

  useEffect(() => {
    const hasFilteredOptionsCurrentValue = filteredOptions.find(
      (option) => option.id === field.value
    );

    if (!hasFilteredOptionsCurrentValue) {
      setFieldValue(name, '');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentSex,
    currentBirthdayDate,
    currentDoctorSpecialty,
    currentDoctor,
    currentCity,
  ]);

  const onChange = (e: SelectChangeEvent<string>) => {
    if (name === 'doctor') {
      const fullDoctorInfo = filteredOptions.find(
        (value) => value.id === e.target.value
      );

      if (!currentCity) {
        setFieldValue('city', fullDoctorInfo?.cityId);
      }

      if (!currentDoctorSpecialty) {
        setFieldValue('doctorSpecialty', fullDoctorInfo?.specialityId);
      }
    }

    field.onChange(e);
  };

  return (
    <FormControl fullWidth error={!!isError} size="small">
      <InputLabel id={`${label}simple-select`}>{label}</InputLabel>
      <Select
        {...field}
        onChange={onChange}
        labelId={`${label}simple-select`}
        label={label}
        id="demo-simple-select"
        defaultValue=""
      >
        {filteredOptions.map((option) => (
          <MenuItem key={option.name} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{isError || ' '}</FormHelperText>
    </FormControl>
  );
};

export default MedicalSelect;

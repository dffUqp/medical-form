import { useEffect } from 'react';
import {
  Select,
  MenuItem,
  InputLabel,
  IconButton,
  FormControl,
  FormHelperText,
  SelectChangeEvent,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
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
  const { values, setFieldValue, setFieldTouched } =
    useFormikContext<IAppointmentFormData>();
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
    if ((name !== 'doctor' && name !== 'doctorSpecialty') || !field.value) {
      return;
    }

    const hasFilteredOptionsCurrentValue = filteredOptions.find(
      (option) => option.id === field.value
    );

    if (!hasFilteredOptionsCurrentValue) {
      setFieldTouched(name, false);
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

  const handleOptionChange = (event: SelectChangeEvent<string>) => {
    if (name === 'doctor') {
      const fullDoctorInfo = filteredOptions.find(
        (value) => value.id === event.target.value
      );

      if (!currentCity) {
        setFieldValue('city', fullDoctorInfo?.cityId);
      }

      if (!currentDoctorSpecialty) {
        setFieldValue('doctorSpecialty', fullDoctorInfo?.specialityId);
      }
    }

    field.onChange(event);
  };

  const handleClearOption = () => {
    setFieldTouched(name, false);
    setFieldValue(name, '');
  };

  return (
    <FormControl fullWidth error={!!isError} size="small">
      <InputLabel id={`${label}simple-select`}>{label}</InputLabel>
      <Select
        {...field}
        onChange={handleOptionChange}
        labelId={`${label}-id`}
        label={label}
        disabled={!filteredOptions.length}
        endAdornment={
          <IconButton
            sx={{
              display: field.value ? 'flex' : 'none',
              marginRight: '7px',
            }}
            onClick={handleClearOption}
          >
            <ClearIcon fontSize="small" />
          </IconButton>
        }
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

import { useEffect, useCallback } from 'react';

import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  SelectChangeEvent,
} from '@mui/material';
import { useField, useFormikContext } from 'formik';
import { IAppointmentFormData, IDoctor, TSelectOptions } from '../interfaces';
import useFilteredData from '../hooks/useFilteredData';

type TMedicalSelectProps = {
  options: TSelectOptions;
  name: string;
  doctors?: IDoctor[];
  label: string;
};

const MedicalSelect = ({
  options,
  name,
  doctors,
  label,
}: TMedicalSelectProps) => {
  const [field, meta] = useField(name);
  const { values, setFieldValue } = useFormikContext<IAppointmentFormData>();
  const filteredOptions = useFilteredData({ name, values, options, doctors });

  useEffect(() => {
    if (!filteredOptions.find((option) => option.id === field.value)) {
      setFieldValue(name, '', false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    values.sex,
    values.birthdayDate,
    values.doctorSpecialty,
    values.doctor,
    values.city,
  ]);

  const isError = meta.touched && meta.error;

  const onChange = useCallback((e: SelectChangeEvent<string>) => {
    if (name === 'doctor') {
      const doctor = options?.find((value) => value.id === e.target.value);
      if (!values.city) {
        setFieldValue('city', doctor?.cityId);
      }

      if (!values.doctorSpecialty) {
        setFieldValue('doctorSpecialty', doctor?.specialityId);
      }
    }

    field.onChange(e);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <FormHelperText>{isError || ''}</FormHelperText>
    </FormControl>
  );
};

export default MedicalSelect;

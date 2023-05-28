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
import {
  IAppointmentFormData,
  IDoctor,
  ISpecialty,
  TSelectOptions,
} from '../interfaces';
import useFilteredData from '../hooks/useFilteredData';

type TMedicalSelectStaticProps = {
  options: TSelectOptions;
  label: string;
};

type TMedicalSelectProps = (
  | {
      name: 'doctor';
      specialties: ISpecialty[];
      doctors?: never;
    }
  | {
      name: 'doctorSpecialty';
      doctors: IDoctor[];
      specialties?: never;
    }
  | {
      name: keyof IAppointmentFormData;
      doctors?: never;
      specialties?: never;
    }
) &
  TMedicalSelectStaticProps;

const MedicalSelect = ({
  options,
  name,
  doctors,
  specialties,
  label,
}: TMedicalSelectProps) => {
  const [field, meta] = useField(name);
  const { values, setFieldValue } = useFormikContext<IAppointmentFormData>();
  const filteredOptions = useFilteredData({
    name,
    values,
    options,
    doctors,
    specialties,
  });

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
      <FormHelperText>{isError || ' '}</FormHelperText>
    </FormControl>
  );
};

export default MedicalSelect;

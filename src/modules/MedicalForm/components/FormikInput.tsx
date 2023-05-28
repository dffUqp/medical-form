import { TextField } from '@mui/material';
import { FieldHookConfig, useField } from 'formik';

type FormikInputProps = {
  label: string;
} & FieldHookConfig<string>;

const FormikInput = ({ label, ...props }: FormikInputProps) => {
  const [field, meta] = useField(props);
  const isError = meta.touched && meta.error;

  return (
    <TextField
      {...field}
      id={`${label}-outlined-size-small`}
      label={label}
      size="small"
      type="text"
      InputLabelProps={{ shrink: true }}
      error={!!isError}
      helperText={isError || ' '}
    />
  );
};

export default FormikInput;

import { useField, useFormikContext } from 'formik';
import UkraineTelInput from 'src/components/UkraineTelInput';

type FormikNumberInputProps = {
  label: string;
  name: string;
};

const FormikNumberInput = ({ label, name }: FormikNumberInputProps) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const isError = meta.touched && meta.error;

  return (
    <UkraineTelInput
      value={field.value}
      onChange={(value) => setFieldValue(name, value)}
      id="number-outlined-size-small"
      label="Phone Number"
      size="small"
      InputLabelProps={{ shrink: true }}
      error={!!isError}
      helperText={isError || ''}
    />
  );
};

export default FormikNumberInput;

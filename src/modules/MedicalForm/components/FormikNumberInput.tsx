import { useField, useFormikContext } from 'formik';
import UkraineTelInput from 'src/components/UkraineTelInput';

type FormikNumberInputProps = {
  name: string;
};

const FormikNumberInput = ({ name }: FormikNumberInputProps) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const isError = meta.touched && meta.error;

  return (
    <UkraineTelInput
      value={field.value}
      onChange={(value) => setFieldValue(name, value)}
      error={!!isError}
      helperText={isError || ''}
    />
  );
};

export default FormikNumberInput;

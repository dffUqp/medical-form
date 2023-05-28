import { useField, useFormikContext } from 'formik';
import MuiDatePicker from 'src/components/MuiDatePicker';

type TFormikDatePickerProps = {
  name: string;
  label: string;
};

const FormikDatePicker = ({ name, label }: TFormikDatePickerProps) => {
  const [field, meta] = useField(name);
  const isError = meta.touched && meta.error;
  const { setFieldValue, setFieldTouched } = useFormikContext();

  return (
    <MuiDatePicker
      label={label}
      value={field.value}
      onChange={(val) => setFieldValue(name, val)}
      disableFuture
      slotProps={{
        textField: {
          helperText: isError || ' ',
          error: !!isError,
          onBlur: () => setFieldTouched(name),
          id: 'outlined-size-small',
          size: 'small',
          InputLabelProps: { shrink: true },
        },
      }}
    />
  );
};

export default FormikDatePicker;

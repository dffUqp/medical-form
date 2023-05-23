import { MuiTelInput, MuiTelInputProps } from 'mui-tel-input';

const UkraineTelInput = (props: MuiTelInputProps) => {
  return (
    <MuiTelInput
      defaultCountry="UA"
      onlyCountries={['UA']}
      placeholder="Type your number"
      id="number-outlined-size-small"
      label="Phone Number"
      size="small"
      InputLabelProps={{ shrink: true }}
      forceCallingCode
      disableDropdown
      {...props}
    />
  );
};

export default UkraineTelInput;

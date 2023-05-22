import { MuiTelInput, MuiTelInputProps } from 'mui-tel-input';

const UkraineTelInput = (props: MuiTelInputProps) => {
  return (
    <MuiTelInput
      defaultCountry="UA"
      onlyCountries={['UA']}
      placeholder="Type your number"
      forceCallingCode
      disableDropdown
      {...props}
    />
  );
};

export default UkraineTelInput;

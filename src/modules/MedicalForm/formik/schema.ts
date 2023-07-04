import dayjs from 'dayjs';
import { regExp } from 'src/lib';
import { object, string } from 'yup';

const contactsSchema = string().test(
  'Email or phone',
  'At least one of the email or phone is required',
  (_, testContext) => {
    const { phoneNumber, email } = testContext.parent;

    return email || phoneNumber;
  }
);

const dateSchema = string().test(
  'Age not more than 110',
  'Invalid Date',
  (_, testContext) => {
    const currentDate = dayjs();
    const patientAge = currentDate.diff(testContext.originalValue, 'year');

    return patientAge >= 0 && patientAge <= 110;
  }
);

const validationSchema = object().shape({
  name: string().matches(regExp.name, 'Invalid name').required('Required'),
  birthdayDate: dateSchema.nullable().required('Required'),
  sex: string().required('Required'),
  city: string().required('Required'),
  doctorSpecialty: string(),
  doctor: string().required('Required'),
  email: contactsSchema.matches(regExp.mail, 'Invalid email'),
  phoneNumber: contactsSchema
    .transform((value) =>
      value.replace(value?.split(' ')[0], '').replace(/ /g, '')
    )
    .matches(regExp.nineDigits, 'Phone number must contain 9 digits'),
});

export default validationSchema;

import dayjs from 'dayjs';
import { object, string } from 'yup';

const contactsSchema = string().test(
  'Email or phone',
  'At least one of the email or phone is required',
  (_, testContext) => {
    return testContext.parent.email || testContext.parent.phoneNumber;
  }
);

const dateSchema = string().test(
  'Age not more than 110',
  'Invalid Date',
  (_, testContext) => {
    const currentDate = dayjs();
    const patientAge = currentDate.diff(testContext.originalValue, 'year');

    return patientAge <= 110;
  }
);

const validationSchema = object().shape({
  name: string()
    .matches(/^[aA-zZ\s]+$/, 'Only English letters are allowed')
    .min(2, 'Name must be at least 2 characters')
    .required('Required'),
  birthdayDate: dateSchema.nullable().required('Required'),
  sex: string().required('Required'),
  city: string().required('Required'),
  doctorSpecialty: string(),
  doctor: string().required('Required'),
  email: contactsSchema.email('Invalid email'),
  phoneNumber: contactsSchema
    .min(8, 'Phone number must be at least 8 digits')
    .max(18, 'Phone number must be at most 18 digits'),
});

export default validationSchema;

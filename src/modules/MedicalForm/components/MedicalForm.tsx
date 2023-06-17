import { Formik, Form } from 'formik';
import { Button, Paper, CircularProgress } from '@mui/material';
import CustomScrollContainer from 'src/components/CustomScrollContainer';
import useFetch from 'src/hooks/useFetch';
import { urls } from 'src/lib';

import FormikInput from './FormikInput';
import FormikDatePicker from './FormikDatePicker';
import MedicalSelect from './MedicalSelect';
import { ICity, IDoctor, ISpecialty } from '../interfaces';
import FormikNumberInput from './FormikNumberInput';

import { initialValues, validationSchema } from '../formik';

const GENDER_OPTIONS = [
  { name: 'Male', id: 'Male' },
  { name: 'Female', id: 'Female' },
];

const MedicalForm = () => {
  const { data: doctorSpecialty } = useFetch<ISpecialty[]>(
    urls.getDoctorSpecialty
  );
  const { data: cities } = useFetch<ICity[]>(urls.getCity);
  const { data: doctors } = useFetch<IDoctor[]>(urls.getDoctors);
  const isLoading = !doctorSpecialty || !cities || !doctors;

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        resetForm();
        console.log(values);
      }}
    >
      {({ isValid }) => (
        <CustomScrollContainer>
          <Form>
            <Paper
              sx={{
                display: 'flex',
                width: '100%',
                flexDirection: 'column',
                padding: '20px',
                borderRadius: '5px',
                gap: '20px',
              }}
            >
              <FormikInput
                name="name"
                label="Name"
                type="text"
                placeholder="e.g., John Doe"
              />

              <FormikDatePicker name="birthdayDate" label="Birthday Date" />

              <MedicalSelect name="sex" options={GENDER_OPTIONS} label="Sex" />

              <MedicalSelect name="city" options={cities} label="City" />

              <MedicalSelect
                name="doctorSpecialty"
                options={doctorSpecialty}
                doctors={doctors}
                label="Doctor Specialty"
              />

              <MedicalSelect
                name="doctor"
                specialties={doctorSpecialty}
                label="Doctors"
                options={doctors}
              />

              <FormikInput
                name="email"
                label="Email"
                placeholder="e.g., john.doe@email.com"
              />

              <FormikNumberInput name="phoneNumber" />

              <Button type="submit" disabled={!isValid}>
                Submit
              </Button>
            </Paper>
          </Form>
        </CustomScrollContainer>
      )}
    </Formik>
  );
};

export default MedicalForm;

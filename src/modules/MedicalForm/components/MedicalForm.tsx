import { Formik, Form } from 'formik';
import { Button, Paper, CircularProgress, LinearProgress } from '@mui/material';
import useFetch from 'src/hooks/useFetch';
import { urls } from 'src/lib';

import FormikInput from './FormikInput';
import FormikDatePicker from './FormikDatePicker';
import MedicalSelect from './MedicalSelect';
import { ICity, IDoctor, ISpecialty } from '../interfaces';
import FormikNumberInput from './FormikNumberInput';

import { initialValues, validationSchema } from '../formik';

const MedicalForm = () => {
  const { data: doctorSpecialty } = useFetch<ISpecialty[]>(
    urls.getDoctorSpecialty
  );
  const { data: cities } = useFetch<ICity[]>(urls.getCity);
  const { data: doctors } = useFetch<IDoctor[]>(urls.getDoctors);

  if (!doctorSpecialty || !cities || !doctors) {
    return <CircularProgress />;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          resetForm();
          setSubmitting(false);
        }, 400);
        console.log(values);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Paper
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              width: '550px',
              padding: '20px',
              borderRadius: '5px',
            }}
          >
            <FormikInput name="name" label="Name" type="text" />

            <FormikDatePicker name="birthdayDate" label="Birthday Date" />

            <MedicalSelect
              name="sex"
              options={[
                { name: 'Male', id: 'Male' },
                { name: 'Female', id: 'Female' },
              ]}
              label="Sex"
            />

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

            <FormikInput name="email" label="Email" />

            <FormikNumberInput name="phoneNumber" />

            {isSubmitting && <LinearProgress />}
            <Button disabled={isSubmitting} type="submit">
              Submit
            </Button>
          </Paper>
        </Form>
      )}
    </Formik>
  );
};

export default MedicalForm;

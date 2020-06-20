import Layout1 from '../components/layouts/layout1';
import { FC } from 'react';
import { Container } from '../components/common/gridSystem';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { TextField } from '../components/common/inputs';
import { RegisterMutationVariables } from '../graphql/generated/graphqlTypes';
import { useMutation } from '@apollo/react-hooks';
import { registerMutation } from '../graphql/mutation/user/register';
import { object, string, ref } from 'yup';

interface RegisterForm {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

const Register: FC = () => {
  const [callRegister] = useMutation(registerMutation, {
    onError: err => {
      console.log('this error happened:', err);
    }
  });

  const onSubmit = async (data: RegisterForm, { resetForm }: FormikHelpers<any>) => {
    const variables: RegisterMutationVariables = {
      data: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password
      }
    };

    return callRegister({ variables }).then(data => {
      if (data) resetForm();
    });
  };

  const initialValues: RegisterForm = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  };

  const validationObject = {
    email: string().required().email(),
    firstName: string().required().min(2).max(50),
    lastName: string().required().min(2).max(50),
    password: string().required(),
    confirmPassword: string()
      .required()
      .when('password', {
        is: password => !!password,
        then: string().oneOf([ref('password'), undefined])
      })
  };

  return (
    <Layout1>
      <Container alignItems="center">
        <h1>Register</h1>

        <Formik
          initialValues={initialValues}
          validationSchema={object(validationObject)}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field name="email" placeholder="email" label="Email" component={TextField} />
              <Field name="firstName" label="First Name" component={TextField} />
              <Field name="lastName" label="Last Name" component={TextField} />
              <Field
                name="password"
                placeholder="your password"
                label="Password"
                component={TextField}
                type="password"
              />
              <Field
                name="confirmPassword"
                placeholder="confirm password"
                label="Confirm Password"
                component={TextField}
                type="password"
              />

              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </Container>
    </Layout1>
  );
};

export default Register;

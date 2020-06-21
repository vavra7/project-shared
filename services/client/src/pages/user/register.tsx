import { useMutation } from '@apollo/react-hooks';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { FC } from 'react';
import { object, ref, string } from 'yup';
import { Container } from '../../components/common/gridSystem';
import { TextField } from '../../components/common/inputs';
import Layout1 from '../../components/layouts/layout1';
import { RegisterMutationVariables } from '../../graphql/generated/graphqlTypes';
import { registerMutation } from '../../graphql/mutation/user/register';

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
      console.log(err.graphQLErrors[0]);
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

  const validationSchema = object({
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
  });

  return (
    <Layout1>
      <Container alignItems="center">
        <h1>Register</h1>

        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field component={TextField} label="Email" name="email" placeholder="email" />
              <Field component={TextField} label="First Name" name="firstName" />
              <Field component={TextField} label="Last Name" name="lastName" />
              <Field
                component={TextField}
                label="Password"
                name="password"
                placeholder="your password"
                type="password"
              />
              <Field
                component={TextField}
                label="Confirm Password"
                name="confirmPassword"
                placeholder="confirm password"
                type="password"
              />

              <button disabled={isSubmitting} type="submit">
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

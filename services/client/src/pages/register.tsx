import Layout1 from '../components/layouts/layout1';
import { FC } from 'react';
import { Container } from '../components/common/gridSystem';
import { Formik, Form, Field } from 'formik';
import { TextField } from '../components/common/inputs';
import { RegisterInput } from '../graphql/generated/graphqlTypes';
import { useMutation } from '@apollo/react-hooks';
import { registerMutation } from '../graphql/mutation/user/register';

const Register: FC = () => {
  const [register] = useMutation(registerMutation);

  const onSubmit = (data: RegisterInput) => {
    register({ variables: { data } });
  };

  return (
    <Layout1>
      <Container alignItems="center">
        <h1>Register</h1>

        <Formik
          initialValues={{ email: '', firstName: '', lastName: '', password: '' }}
          onSubmit={onSubmit}
        >
          {() => (
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

              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </Container>
    </Layout1>
  );
};

export default Register;

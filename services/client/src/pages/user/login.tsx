import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { routes } from '@project-shared/shared';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { object, string } from 'yup';
import { Container } from '../../components/common/gridSystem';
import { TextField } from '../../components/common/inputs';
import Layout1 from '../../components/layouts/layout1';
import {
  LoginMutation,
  LoginMutationVariables,
  MeQuery
} from '../../graphql/generated/graphqlTypes';
import { loginMutation } from '../../graphql/mutation/user/login';
import { meQuery } from '../../graphql/query/user/me';

type LoginForm = LoginMutationVariables;

const Login: FC = () => {
  const router = useRouter();

  const [callLogin] = useMutation(loginMutation, {
    onCompleted: (data: LoginMutation) => {
      if (data.login) {
        callMe();
      }
    }
  });

  const [callMe] = useLazyQuery(meQuery, {
    onCompleted: (data: MeQuery) => {
      if (data.me) router.push(routes.home());
    }
  });

  const initialValues: LoginForm = {
    email: '',
    password: ''
  };

  const validationSchema = object({
    email: string().required().email(),
    password: string().required()
  });

  const onSubmit = (data: LoginForm) => {
    return callLogin({ variables: data });
  };

  return (
    <Layout1>
      <Container alignItems="center">
        <h1>Login</h1>

        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field component={TextField} label="Email" name="email" />
              <Field component={TextField} label="Password" name="password" type="password" />

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

export default Login;

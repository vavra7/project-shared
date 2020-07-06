import { useMutation } from '@apollo/react-hooks';
import { routes } from '@project-shared/shared';
import { Field, Form, Formik } from 'formik';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { object, string } from 'yup';
import { Container } from '../components/common/gridSystem';
import { TextField } from '../components/common/inputs';
import Layout1 from '../components/layouts/layout1';
import { AlertTypeEnum } from '../graphql/store/types';
import { loginMutation } from '../graphql/user/mutation/login';
import { meQuery } from '../graphql/user/query/me';
import { LoginMutation, LoginMutationVariables, MeQuery } from '../graphql/user/types';
import alerts from '../lib/alerts';
import Apollo from '../lib/apollo';
import { t, trp } from '../lib/translations';

type LoginForm = LoginMutationVariables;

const Login: NextPage = () => {
  const router = useRouter();

  const [callLogin] = useMutation<LoginMutation, LoginMutationVariables>(loginMutation, {
    update: (store, { data }) => {
      if (!data?.login) return;

      store.writeQuery<MeQuery>({
        query: meQuery,
        data: {
          me: {
            ...data.login
          }
        }
      });
    },
    onCompleted: (data: LoginMutation) => {
      if (!data?.login) {
        alerts.add({
          title: 'Incorrect login or password',
          type: AlertTypeEnum.Error
        });

        return;
      } else {
        alerts.add({
          title: 'Successfully logged in',
          type: AlertTypeEnum.Success
        });

        router.push(...trp({ tRoutes: routes.homePage }));
      }
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
        <h1>{t('login.title')}</h1>

        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field component={TextField} label={t('login.loginForm.email')} name="email" />
              <Field
                component={TextField}
                label={t('login.loginForm.password')}
                name="password"
                type="password"
              />

              <button disabled={isSubmitting} type="submit">
                {t('buttons.submit')}
              </button>
            </Form>
          )}
        </Formik>
      </Container>
    </Layout1>
  );
};

Login.getInitialProps = () => {
  const apolloClient = Apollo.getClient();

  return {
    apolloCache: apolloClient.extract()
  };
};
export default Login;

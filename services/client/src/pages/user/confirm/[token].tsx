import { Container } from '../../../components/common/gridSystem';
import { Component, ReactNode } from 'react';
import { NextPageContext } from 'next';

interface InitialProps {
  token: string;
}

class Confirm extends Component<InitialProps> {
  static getInitialProps = (ctx: NextPageContext): InitialProps => {
    const token = ctx.query.token as string;
    const initialProps: InitialProps = {
      token
    };

    return initialProps;
  };

  render(): ReactNode {
    return (
      <Container>
        <pre>{JSON.stringify(this.props, null, 2)}</pre>

        <div>Confirm</div>
      </Container>
    );
  }
}

export default Confirm;

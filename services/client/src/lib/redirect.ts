import { NextPageContext } from 'next';
import Router from 'next/router';

export default (ctx: NextPageContext, location: string): void => {
  const isServer: boolean = typeof window === 'undefined';

  if (isServer) {
    ctx.res?.writeHead(303, { location });
    ctx.res?.end();
  } else {
    Router.replace(location);
  }
};

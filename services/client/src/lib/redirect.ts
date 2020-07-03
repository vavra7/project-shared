import { NextPageContext } from 'next';
import Router from 'next/router';
import { AlertInput } from '../graphql/store/types';
import alerts from './alerts';

const isServer: boolean = typeof window === 'undefined';

export function redirectWithAlert(
  ctx: NextPageContext,
  location: string,
  alertInput: AlertInput
): void {
  if (isServer) {
    const locationWithAlert = new URLSearchParams();
    locationWithAlert.append('alert', JSON.stringify(alertInput));

    ctx.res?.writeHead(303, { Location: location + '?' + locationWithAlert.toString() });
    ctx.res?.end();
  } else {
    Router.replace(location);
    alerts.add(alertInput);
  }
}

export function redirect(ctx: NextPageContext, location: string): void {
  if (isServer) {
    ctx.res?.writeHead(303, { Location: location });
    ctx.res?.end();
  } else {
    Router.replace(location);
  }
}

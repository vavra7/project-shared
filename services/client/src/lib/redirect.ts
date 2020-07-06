import { NextPageContext } from 'next';
import { LinkProps } from 'next/link';
import Router from 'next/router';
import { AlertInput } from '../graphql/store/types';
import alerts from './alerts';

export type RedirectProps = [LinkProps['href'], LinkProps['as']];

const isServer: boolean = typeof window === 'undefined';

const location = (redirectProps: RedirectProps): string => {
  return typeof redirectProps[0] === 'string' ? redirectProps[0] : (redirectProps[1] as string);
};

/**
 * Conditional redirect server side or client side
 *
 * @param ctx
 * @param redirectProps
 * @param alertInput
 */
export function redirectWithAlert(
  ctx: NextPageContext,
  redirectProps: RedirectProps,
  alertInput: AlertInput
): void {
  if (isServer) {
    const locationWithAlert = new URLSearchParams();
    locationWithAlert.append('alert', JSON.stringify(alertInput));

    ctx.res?.writeHead(303, {
      Location: location(redirectProps) + '?' + locationWithAlert.toString()
    });
    ctx.res?.end();
  } else {
    Router.replace(...redirectProps);
    alerts.add(alertInput);
  }
}

/**
 * Conditional redirect server side or client side
 *
 * @param ctx
 * @param redirectProps
 */
export function redirect(ctx: NextPageContext, redirectProps: RedirectProps): void {
  if (isServer) {
    ctx.res?.writeHead(303, {
      Location: location(redirectProps)
    });
    ctx.res?.end();
  } else {
    Router.replace(...redirectProps);
  }
}

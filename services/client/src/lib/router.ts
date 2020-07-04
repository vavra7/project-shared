import { LangRoutes, Route } from '@project-shared/shared';
import { LinkProps } from 'next/link';
import { RedirectProps } from './redirect';

const langCode = 'en';

type RouteSpec = {
  langRoutes: LangRoutes;
  params?: { [key: string]: string };
};

export function localizedLinkProps(routeSpec: RouteSpec): LinkProps {
  const route: Route = routeSpec.langRoutes[langCode];
  const linkProps: LinkProps = {
    href: route.href
  };

  if (routeSpec.params && route.as) {
    linkProps.as = route.as(routeSpec.params);
  }

  return linkProps;
}

export function localizedRedirectProps(routeSpec: RouteSpec): RedirectProps {
  const _localizedLinkProps = localizedLinkProps(routeSpec);

  return [_localizedLinkProps.href, _localizedLinkProps.as];
}

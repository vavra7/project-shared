import { Route, TranslatableRoute } from '@project-shared/shared';
import { NextPageContext } from 'next';
import { LinkProps } from 'next/link';
import {
  LanguageEnum,
  LanguageQuery,
  SetLanguageMutation,
  SetLanguageMutationVariables
} from '../graphql/store/modelGenerated';
import { setLanguageMutation } from '../graphql/store/mutation/setLanguage';
import { languageQuery } from '../graphql/store/query/language';
import translations from '../translations';
import Apollo from './apollo';
import { RedirectProps } from './redirect';

type LocationSrc = {
  tRoutes: TranslatableRoute;
  params?: { [key: string]: string };
  language?: LanguageEnum;
};

export default class Translation {
  /**
   * Retrieves current language from store
   */
  private static getLanguage(): LanguageEnum {
    const apolloClient = Apollo.getClient();
    const { language } = apolloClient.readQuery<LanguageQuery>({ query: languageQuery })!;

    return language;
  }

  /**
   * Extract from pathname whether contains '/en'. Then sets language into store accordingly.
   *
   * @param pathname
   */
  public static extractLanguage(pathname: NextPageContext['pathname']) {
    const apolloClient = Apollo.getClient();
    const regExp = new RegExp(`^/${LanguageEnum.En}/|/${LanguageEnum.En}$`);
    const isEn = Boolean(pathname.match(regExp));
    const language = isEn ? LanguageEnum.En : LanguageEnum.Cs;

    apolloClient.mutate<SetLanguageMutation, SetLanguageMutationVariables>({
      mutation: setLanguageMutation,
      variables: {
        language
      }
    });
  }

  /**
   * Provides translation
   *
   * @param path path of translation
   * @param params
   */
  public static translation(path: string, params?: { [key: string]: string }): string {
    const langTranslations = translations[this.getLanguage()];

    let translation: string = path.split('.').reduce((prevVal: any, currentVal: string) => {
      return (prevVal && prevVal[currentVal]) || null;
    }, langTranslations);

    if (translation && params) {
      for (const key in params) {
        translation = translation.replace(`{${key}}`, params[key]);
      }
    }

    if (!translation) {
      console.warn('Did not find "%s" translation for path: "%s".', this.getLanguage(), path);

      return path;
    } else {
      return translation;
    }
  }

  /**
   * Provides translated Link Props
   *
   * @param locationSrc
   */
  public static translatedLinkProps(locationSrc: LocationSrc): LinkProps {
    const route: Route = locationSrc.language
      ? locationSrc.tRoutes[locationSrc.language]
      : locationSrc.tRoutes[this.getLanguage()];
    const linkProps: LinkProps = {
      href: route.href
    };

    if (locationSrc.params && route.as) {
      linkProps.as = route.as(locationSrc.params);
    }

    return linkProps;
  }

  /**
   * Translated Redirect Props
   *
   * @param locationSrc
   */
  public static translatedRedirectProps(locationSrc: LocationSrc): RedirectProps {
    const _translatedLinkProps = this.translatedLinkProps(locationSrc);

    return [_translatedLinkProps.href, _translatedLinkProps.as];
  }
}

export const t = (path: string, params?: { [key: string]: string }): string =>
  Translation.translation(path, params);

export const tlp = (locationSrc: LocationSrc): LinkProps =>
  Translation.translatedLinkProps(locationSrc);

export const trp = (locationSrc: LocationSrc): RedirectProps =>
  Translation.translatedRedirectProps(locationSrc);

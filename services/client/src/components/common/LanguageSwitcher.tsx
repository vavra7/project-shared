import { routes, TranslatableRoute } from '@project-shared/shared';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { PureComponent } from 'react';
import { languageQuery } from '../../graphql/store/query/language';
import { LanguageEnum, LanguageQuery } from '../../graphql/store/types';
import Apollo from '../../lib/apollo';
import { tlp } from '../../lib/translations';

class LanguageSwitcher extends PureComponent {
  language: LanguageEnum;
  translatableRoute: TranslatableRoute | undefined;

  constructor(props: any) {
    super(props);

    this.language = this.getLanguage();
    this.translatableRoute = this.findTranslatableRoute(this.language, props.router.pathname);
  }

  getLanguage(): LanguageEnum {
    const apolloClient = Apollo.getClient();
    const { language } = apolloClient.readQuery<LanguageQuery>({ query: languageQuery })!;

    return language;
  }

  findTranslatableRoute(language: LanguageEnum, pathname: string): TranslatableRoute | undefined {
    for (const key in routes) {
      if (((routes as any)[key] as TranslatableRoute)[language].href === pathname) {
        return (routes as any)[key] as TranslatableRoute;
      }
    }
  }

  render() {
    if (!this.translatableRoute) return;

    let cs;
    let en;

    if (LanguageEnum.Cs === this.language) {
      cs = <span className="fw-bolder">cs</span>;
    } else {
      cs = (
        <span>
          <Link {...tlp({ tRoutes: this.translatableRoute, language: LanguageEnum.Cs })}>
            <a onClick={() => (this.language = LanguageEnum.Cs)}>cs</a>
          </Link>
        </span>
      );
    }

    if (LanguageEnum.En === this.language) {
      en = <span className="fw-bolder">en</span>;
    } else {
      en = (
        <span>
          <Link {...tlp({ tRoutes: this.translatableRoute, language: LanguageEnum.En })}>
            <a onClick={() => (this.language = LanguageEnum.En)}>en</a>
          </Link>
        </span>
      );
    }

    return (
      <div>
        {cs} / {en}
      </div>
    );
  }
}

export default withRouter(LanguageSwitcher as any);

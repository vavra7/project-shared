import { routes, Routes, TranslatableRoute } from '@project-shared/shared';
import { flowRight as compose } from 'lodash';
import { WithRouterProps } from 'next/dist/client/with-router';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { PureComponent } from 'react';
import { LanguageEnum, LanguageProps, withLanguage } from '../../graphql/store/modelGenerated';
import { tlp } from '../../lib/translations';

type LanguageSwitcherProps = WithRouterProps & LanguageProps;

class LanguageSwitcher extends PureComponent<LanguageSwitcherProps> {
  translatableRoute: TranslatableRoute | undefined;

  constructor(props: LanguageSwitcherProps) {
    super(props);
    this.translatableRoute = this.findTranslatableRoute();
  }

  findTranslatableRoute(): TranslatableRoute | undefined {
    const language = this.props.data.language!;
    const pathname = this.props.router.pathname;

    let key: keyof Routes;
    for (key in routes) {
      if (routes[key][language].href === pathname) {
        return (routes as any)[key];
      }
    }
  }

  render() {
    if (!this.translatableRoute) return;

    let cs;
    let en;

    if (LanguageEnum.Cs === this.props.data.language) {
      cs = <span className="fw-bolder">cs</span>;
    } else {
      cs = (
        <span>
          <Link {...tlp({ tRoutes: this.translatableRoute, language: LanguageEnum.Cs })}>
            <a>cs</a>
          </Link>
        </span>
      );
    }

    if (LanguageEnum.En === this.props.data.language) {
      en = <span className="fw-bolder">en</span>;
    } else {
      en = (
        <span>
          <Link {...tlp({ tRoutes: this.translatableRoute, language: LanguageEnum.En })}>
            <a>en</a>
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

export default compose(withRouter, withLanguage())(LanguageSwitcher);

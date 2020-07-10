import { Alert, LanguageEnum } from '../graphql/store/modelGenerated';

export interface AppStore {
  language: LanguageEnum;
  alerts: Alert[];
}

export const initialState: AppStore = {
  language: LanguageEnum.Cs,
  alerts: []
};

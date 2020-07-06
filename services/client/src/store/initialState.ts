import { Alert, LanguageEnum } from '../graphql/store/types';

export interface AppStore {
  language: LanguageEnum;
  alerts: Alert[];
}

export const initialState: AppStore = {
  language: LanguageEnum.Cs,
  alerts: []
};

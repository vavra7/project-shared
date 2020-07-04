import translations from '../translations';

export function t(path: string, params?: { [key: string]: string }): string {
  const langCode = 'en';
  const langTranslations = translations[langCode];

  let translation: string = path.split('.').reduce((prevVal: any, currentVal: string) => {
    return (prevVal && prevVal[currentVal]) || null;
  }, langTranslations);

  if (translation && params) {
    for (const key in params) {
      translation = translation.replace(`{${key}}`, params[key]);
    }
  }

  return translation;
}

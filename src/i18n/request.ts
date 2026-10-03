import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

// Static imports required — dynamic imports are not supported in Edge runtime
import en from '../../messages/en.json';
import hi from '../../messages/hi.json';
import bn from '../../messages/bn.json';
import mr from '../../messages/mr.json';
import te from '../../messages/te.json';
import ta from '../../messages/ta.json';
import gu from '../../messages/gu.json';
import ur from '../../messages/ur.json';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const messageMap: Record<string, any> = { en, hi, bn, mr, te, ta, gu, ur };

export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as never)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: messageMap[locale] ?? messageMap['en']
  };
});

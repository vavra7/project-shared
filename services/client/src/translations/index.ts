import alertsCs from './cs/common/alerts.json';
import buttonsCs from './cs/common/buttons.json';
import loginCs from './cs/login.json';
import alertsEn from './en/common/alerts.json';
import buttonsEn from './en/common/buttons.json';
import loginEn from './en/login.json';

const cs = {
  common: {
    alerts: alertsCs,
    buttons: buttonsCs
  },
  login: loginCs
};

const en = {
  common: {
    buttons: buttonsEn,
    alerts: alertsEn
  },
  login: loginEn
};

export default {
  cs,
  en
};

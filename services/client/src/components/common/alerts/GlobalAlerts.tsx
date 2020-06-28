import { useQuery } from '@apollo/react-hooks';
import { AnimatePresence } from 'framer-motion';
import { FC } from 'react';
import { alertsQuery } from '../../../graphql/store/query/alerts';
import { AlertsQuery } from '../../../graphql/store/types';
import Alert from './Alert';

const style = {
  right: 0,
  maxWidth: '100%'
};

const GlobalAlerts: FC = () => {
  const { data } = useQuery<AlertsQuery>(alertsQuery);
  const displayedAlerts = data!.alerts.filter(alert => alert!.display);

  return (
    <div className="global-alerts p-fixed" id="global-alerts" style={style}>
      <AnimatePresence>
        {displayedAlerts.map(alert => (
          <Alert {...(alert as any)} key={'alert_' + alert!.id} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default GlobalAlerts;

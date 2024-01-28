import { useState } from 'react';

export enum AlertMessageType {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  INFO = 'info',
}

export interface AlertMessageProps {
  message: string;
  type: AlertMessageType;
}

const useAlertMessage = () => {
  const [alertMessage, setAlertMessage] = useState<AlertMessageProps | null>(
    null
  );

  const showAlertMessage = (message: string, type: AlertMessageType) => {
    setAlertMessage({ message, type });
  };

  const hideAlertMessage = () => {
    setAlertMessage(null);
  };

  return {
    alertMessage,
    showAlertMessage,
    hideAlertMessage,
  };
};

export default useAlertMessage;

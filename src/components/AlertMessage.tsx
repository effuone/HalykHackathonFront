import React from 'react';
import { Snackbar, Alert, IconButton } from '@mui/material';
import { Info as InfoIcon, Close as CloseIcon } from '@mui/icons-material';
import { AlertMessageType } from '@/lib/hooks/useAlertMessage';

interface AlertMessageProps {
  message: string;
  type: AlertMessageType;
  onClose: () => void;
}

const AlertMessage: React.FC<AlertMessageProps> = ({
  message,
  type,
  onClose,
}) => {
  const getSeverity = (type: AlertMessageType) => {
    switch (type) {
      case AlertMessageType.SUCCESS:
        return 'success';
      case AlertMessageType.WARNING:
        return 'warning';
      case AlertMessageType.ERROR:
        return 'error';
      case AlertMessageType.INFO:
      default:
        return 'info';
    }
  };

  return (
    <Snackbar
      open={true}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        severity={getSeverity(type)}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={onClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        icon={<InfoIcon fontSize="inherit" />}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertMessage;

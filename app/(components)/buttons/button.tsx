import React from 'react';
import { Button as MuiButton, ButtonProps } from '@mui/material';
import { palette } from '../../theme/tokens';

export const OrangeButton: React.FC<ButtonProps> = ({ 
  children, 
  size = 'small',
  ...props 
}) => {
  return (
    <MuiButton
      size={size}
      fullWidth
      className="orange-button"
      {...props}

        sx={{
            backgroundColor: palette.accent[500],
            color: '#FFFFFF',
            '&:hover': {
            backgroundColor: palette.accent[600],
            },
            '&.Mui-disabled': {
            backgroundColor: '#FFCCBC',
            color: '#BDBDBD',
            },
        }}


    >
      {children}
    </MuiButton>
  );
};

export default OrangeButton;

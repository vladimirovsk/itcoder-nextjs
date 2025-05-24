import React from 'react';
import { Button as MuiButton, ButtonProps } from '@mui/material';

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
            backgroundColor: '#F58D1E',
            color: '#FFFFFF',
            '&:hover': {
            backgroundColor: '#e17a0e',
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

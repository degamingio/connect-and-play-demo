'use client';
import { Box, Button, TextField, useTheme } from '@mui/material';
import { useState } from 'react';

const SecretInput = ({ handleSecret }: { handleSecret: (secret: string) => void }) => {
  const [inputValue, setInputValue] = useState('');
  const theme = useTheme();
  return (
    <Box flexDirection="row">
      <TextField
        onChange={(event) => setInputValue(event.target.value)}
        type="password"
        autoComplete="off"
        name="secret"
        color="success"
        variant="outlined"
        placeholder="enter the secret"
        size="small"
        sx={{
          borderColor: 'primary.main',
          bgcolor: theme.app?.elevation1,
          mr: 3,
          '& .MuiInputBase-input.Mui-disabled': {
            WebkitTextFillColor: theme.app?.primaryContent,
          },
          input: {
            color: theme.app?.primaryContent,
            borderColor: 'primary.main',
          },
        }}
      />
      <Button variant="contained" onClick={() => handleSecret(inputValue)}>
        Login
      </Button>
    </Box>
  );
};

export default SecretInput;

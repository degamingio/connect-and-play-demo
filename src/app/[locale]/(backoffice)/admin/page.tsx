'use client';

import { Box, CircularProgress, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import RevenueShareAccordions from './RevenueShareAccordions';
import { ErrorResponse, RevenueShareResponse } from './RevenueShareDataModel';
import RevenueSummary from './RevenueSummary';
import SecretInput from './SecretInput';

const Admin = () => {
  const [data, setData] = useState<RevenueShareResponse | ErrorResponse>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = (secret?: string) => {
    const _secret = secret ? secret : window.localStorage.getItem('CAP_API_SECRET') || '';
    setLoading(true);
    const result = fetch(`${process.env.NEXT_PUBLIC_API_URL}/backoffice/status`, {
      method: 'GET',
      headers: {
        secret: _secret,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) window.localStorage.setItem('CAP_API_SECRET', _secret);
        setData(data);
        setLoading(false);
      });
    return result;
  };

  // Type guard function to check if the response is an error
  function isError(
    response: RevenueShareResponse | ErrorResponse | undefined,
  ): response is ErrorResponse {
    return response !== undefined && (response as ErrorResponse).error !== undefined;
  }

  return (
    <Box
      flexDirection="column"
      sx={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: 'background.default',
        pt: 5,
        px: {
          sm: 10,
          md: 10,
        },
      }}
    >
      <Typography variant="h2" color="success.main">
        Revenue Share
      </Typography>

      {/* Only call isError if data is defined */}
      {data && isError(data) && (
        <SecretInput handleSecret={(secret) => fetchData(secret)} />
      )}

      {loading && <CircularProgress color="success" />}

      {/* Ensure data is defined and not an error before trying to access its properties */}
      {data && !isError(data) && (
        <>
          <Paper elevation={1} sx={{ mb: 3, p: 3 }}>
            <RevenueSummary data={data.overall} />
          </Paper>
          <RevenueShareAccordions data={data} />
        </>
      )}
    </Box>
  );
};

export default Admin;

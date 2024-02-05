'use client';

import SiweUserContext from '@/state/SiweUserContext';
import { UserContext } from '@/state/UserContext';
import { Stack, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { useFormik } from 'formik';
import { useTranslations } from 'next-intl';
import { useContext, useEffect, useState } from 'react';

const UserName = ({ setShowModal }: { setShowModal: (b: boolean) => void }) => {
  const { user, updateUser } = useContext(UserContext);
  const { ensureAuthenticated } = useContext(SiweUserContext);
  const [loading, setLoading] = useState(true);

  const t = useTranslations();
  const theme = useTheme();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...(user || {}),
    },
    onSubmit: async (values) => {
      await updateUser(values);
      setShowModal(false);
    },
  });

  useEffect(() => {
    setLoading(true);
    ensureAuthenticated()
      .then(() => {
        setLoading(false);
      })
      .catch(() => setShowModal(false));
  }, [ensureAuthenticated, setShowModal]);

  return (
    <Stack gap={2}>
      <Typography variant="h6" fontWeight={700}>
        {t('components.username.title')}
      </Typography>
      <TextField
        disabled={loading}
        type="text"
        autoComplete="off"
        onChange={formik.handleChange}
        value={formik.values.name}
        name="name"
        color="primary"
        variant="outlined"
        fullWidth
        sx={{
          input: { color: theme.app?.primaryAccent },
          bgcolor: theme.app?.elevation3,
        }}
        placeholder={t('components.username.placeholder')}
      />
      <Stack direction="row" gap={2} justifyContent="flex-end">
        <Button onClick={() => formik.submitForm()} type="submit" variant="contained">
          {t('components.username.save')}
        </Button>
        <Button onClick={() => setShowModal(false)}>
          {t('components.username.cancelEdit')}
        </Button>
      </Stack>
    </Stack>
  );
};

export default UserName;

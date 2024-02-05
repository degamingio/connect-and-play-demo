'use client';

import Close from '@mui/icons-material/Close';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { useContext, useEffect, useState } from 'react';

import { UserContext } from '@/state/UserContext';

import { DynamicShortenBitcoinAddress } from '../General/ShortenBitcoinAddress';
import UserName from './Name';
import { useSearchParams } from 'next/navigation';

const PlayerCard = () => {
  const queryAddress = useSearchParams().get('a') || undefined;
  const { user } = useContext(UserContext);
  const t = useTranslations();
  const [showNameChangeModal, setShowNameChangeModal] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    setWalletAddress(user?.walletAddress || '');
  }, [user]);

  const isMe =
    !queryAddress || (status === 'connected' && queryAddress === walletAddress);
  return (
    <Card
      sx={{
        flexBasis: '272px',
        flexShrink: 1,
        flexGrow: 1,
        borderRadius: 2,
        backgroundColor: (theme) => theme.app?.elevation3,
        overflow: 'hidden',
      }}
    >
      <CardContent
        sx={{
          overflow: 'hidden',
          display: 'grid',
        }}
      >
        <Typography
          color={(theme) =>
            user?.name ? theme.app?.primaryAccent : theme.app?.secondaryContent
          }
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          variant="h6"
          fontWeight={700}
        >
          {user?.name || t('components.playercard.noName')}
        </Typography>
        <DynamicShortenBitcoinAddress
          address={walletAddress!}
          variant="body1"
          whiteSpace="nowrap"
          fontWeight={400}
        />
      </CardContent>
      {isMe && (
        <CardActions sx={{ p: 2 }}>
          <Button
            onClick={() => setShowNameChangeModal(true)}
            color="primary"
            variant="contained"
            size="small"
          >
            {t('components.playercard.edit')}
          </Button>
          <Dialog
            open={showNameChangeModal}
            onClose={() => setShowNameChangeModal(false)}
            maxWidth="xs"
            fullWidth
            color="dark"
          >
            <IconButton
              onClick={() => setShowNameChangeModal(false)}
              sx={{ position: 'absolute', right: 8, top: 8 }}
            >
              <Close color="primary" />
            </IconButton>
            <DialogContent>
              <UserName setShowModal={setShowNameChangeModal} />
            </DialogContent>
          </Dialog>
        </CardActions>
      )}
    </Card>
  );
};

export default PlayerCard;

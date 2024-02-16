'use client';

import GameFrame from '@/components/Game/GameFrame';
import { AppConfig } from '@/config/AppConfig';
import { getBearerToken } from '@/libs/bearerToken';
import { useBankroll } from '@/state/BankrollContext';
import SiweUserContext, { SiweStatus } from '@/state/SiweUserContext';
import { UserContext } from '@/state/UserContext';
import { FormControlLabel, Stack, Switch, useMediaQuery, useTheme } from '@mui/material';
import { useContext, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAccount } from 'wagmi';

const Game = ({ selectedGame }: { selectedGame: (typeof AppConfig.activeGames)[0] }) => {
  const theme = useTheme();
  const { balanceIsUpdating, user } = useContext(UserContext);
  const { status: accountStatus, isConnecting, address } = useAccount();
  const [frameKey, setFrameKey] = useState(uuidv4());
  const lastAccountStatus = useRef(accountStatus);
  const { status: siweStatus } = useContext(SiweUserContext);
  const isBigScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const { bankroll } = useBankroll();
  const [fund, setFund] = useState(
    user?.funds?.find(
      (f) =>
        f.chainId === bankroll?.chainId &&
        f.targetAddress === bankroll?.contractAddress &&
        f.tokenAddress === bankroll?.tokenAddress,
    ),
  );
  const [gameUrl, setGameUrl] = useState('');
  const [latestQuery, setLatestQuery] = useState('');
  const canBeReal = !!(siweStatus === SiweStatus.authenticated && fund?._id);
  const [realMode, setRealMode] = useState(!!canBeReal);
  const actualRealMode = canBeReal && realMode;

  useEffect(() => {
    if (lastAccountStatus.current !== accountStatus || balanceIsUpdating) {
      setFrameKey(uuidv4());
    }
    lastAccountStatus.current = accountStatus;
  }, [accountStatus, isConnecting, balanceIsUpdating]);

  useEffect(() => {
    if (!bankroll) return;
    const fund = user?.funds?.find(
      (f) =>
        f.chainId === bankroll.chainId &&
        f.targetAddress === bankroll.contractAddress &&
        f.tokenAddress === bankroll.tokenAddress,
    );
    if (fund) setFund(fund);
  }, [user, bankroll]);

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';

    const funMode = `funMode=${!actualRealMode}`;
    const lang = `&lang=eng`;
    const device = `&device=${isBigScreen ? 'DESKTOP' : 'MOBILE'}`;
    const gameCode = `&gameCode=${selectedGame.slug}`;
    const accountFundId = `&accountFundId=${fund?._id}`;
    const operatorCode = `&operatorCode=${AppConfig.operatorCode}`;

    const queries = `${funMode}${lang}${device}${gameCode}${accountFundId}${operatorCode}`;
    if (latestQuery === queries) return;
    setLatestQuery(queries);

    const bearerToken = getBearerToken();

    fetch(`${baseUrl}/games/launch?${queries}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: bearerToken ? `Bearer ${bearerToken} siwe` : '',
      },
    })
      .then((res) => res.json())
      .then(({ url }) => {
        setGameUrl(url);
      });
  }, [fund, bankroll, selectedGame, frameKey, actualRealMode]);

  if (!selectedGame) return null;
  return (
    <>
      <GameFrame url={gameUrl} gameName={selectedGame.name} />
      <Stack px={{ xs: 1, sm: 0 }} direction="row" gap={1} alignItems="center">
        <FormControlLabel
          sx={{
            m: 0,
            ':before': {
              content: '"Real mode"',
              display: 'block',
              color: actualRealMode
                ? theme.app?.secondaryAccent
                : theme.app?.primaryContent,
              opacity: actualRealMode ? 1 : 0.5,
            },
            '.MuiFormControlLabel-label': {
              opacity: actualRealMode ? 0.5 : 1,
            },
          }}
          labelPlacement="start"
          label="Fun mode"
          value={actualRealMode}
          disabled={!canBeReal}
          onChange={() => setRealMode(!realMode)}
          control={
            <Switch
              checked={actualRealMode}
              color="success"
              sx={{ '.MuiSwitch-track': { bgcolor: '#fff' } }}
            />
          }
        />
      </Stack>
    </>
  );
};

export default Game;

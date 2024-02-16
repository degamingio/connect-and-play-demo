import LiveBets from '@/components/LiveBets/LiveBets';
import GameCards from '@/components/StartPage/GameCards';
import { AppConfig } from '@/config/AppConfig';

const Home = () => {
  return (
    <>
      <GameCards />
      <LiveBets operatorCode={AppConfig.operatorCode} />
    </>
  );
};

export default Home;

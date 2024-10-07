import GeneralGridView from '@/components/home-page/main-content-div/GeneralGridView';
import TouristHomePageNavigation from './TouristHomePageNavigation';

interface TouristHomePageProps {
  loggedIn: boolean;
}

export default function TouristHomePage(TouristHomePageProps : TouristHomePageProps) {
  return (
    <>
      <TouristHomePageNavigation loggedIn={TouristHomePageProps.loggedIn}/>
      <GeneralGridView />
    </>
  );
}
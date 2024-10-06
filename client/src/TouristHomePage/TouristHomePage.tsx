import GeneralGridView from '@/components/home-page/main-content-div/GeneralGridView';
import TouristHomePageNavigation from './TouristHomePageNavigation';

export default function TouristHomePage() {
  return (
    <div>
      <TouristHomePageNavigation />
      <GeneralGridView />
    </div>
  );
}
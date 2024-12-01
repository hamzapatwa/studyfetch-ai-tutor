// app/page.tsx

import Sidebar from 'src/components/Sidebar';
import HomePageContent from 'src/components/HomePageContent';

export default function HomePage() {
  return (
    <div className="flex h-screen">
      <Sidebar /> {/* Removed onCreateNewSet prop */}
      <HomePageContent />
    </div>
  );
}
'use client';

import { useEffect, useState } from 'react';

import { fetchAdminProfile } from '@/api/adminApi';
import { formatDateForUX } from '@/lib/dateUtils';
import { AdminProfile } from '@/types/admin.interface';
import { Clock, Eye, File, TrendingDown } from 'lucide-react';
import { Section } from '../components/template/TopbarMenu';
import { useVisitedSection } from '../context/VisitedSectionContext';
import IndicatorCard from './components/IndicatorCard';
import VisitorChart from './components/VisitorChart';

const section: Section = {
  items: [],
  page: {
    path: '/admin/dashboard/accueil',
    name: 'Accueil dashboard',
  },
};

const Index: React.FC = () => {
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profileData = await fetchAdminProfile();
        console.log(profileData)
        setProfile(profileData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);
  
  // Update the section for breadcrumb into topbarMenu
  const { setVisitedSection } = useVisitedSection();

  useEffect(() => {
    setVisitedSection(section);
  }, [setVisitedSection]);

  if (loading) {
    return (
      <div className="flex size-full items-center justify-center">
        <div
          className="inline-block size-12 animate-spin rounded-full border-[3px] border-current border-t-transparent text-foreground"
          role="status"
          aria-label="loading"
        ></div>
      </div>
    );
  }

  return (
    <div className='size-full flex flex-col gap-6'>
      <div>
        <h1 className="text-3xl text-foreground font-bold">Bonjour {profile?.firstname} !</h1>
        <p className="text-sm italic">
          Dernière connexion le {profile && formatDateForUX(profile.last_login)}
        </p>
      </div>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <IndicatorCard title='Total des visites' icon={<Eye />} value={130} analyze='+10% par rapport au mois dernier' />
          <IndicatorCard title='Taux de Rebond' icon={<TrendingDown />} value={55} analyze='-2% par rapport au mois dernier' />
          <IndicatorCard title='Pages par session' icon={<File />} value={3} analyze='+5% par rapport au mois dernier' />
          <IndicatorCard title='Durée moy. session' icon={<Clock />} value='146 sec' analyze='+17sec par rapport au mois dernier' />
        </div>
      </div>
      <div className='w-full mx-auto'>
        <VisitorChart />
      </div>
    </div>
  );
};

export default Index;

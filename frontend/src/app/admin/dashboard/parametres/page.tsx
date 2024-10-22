'use client';

import { useEffect, useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { fetchAdminSettings } from '@/api/adminApi';
import { AdminSettings } from '@/types/admin.interface';

import { Section } from '../components/template/TopbarMenu';
import { useVisitedSection } from '../context/VisitedSectionContext';

import ProfileInformation from './components/ProfileInformation';
import SecuritySettings from './components/SecuritySettings';

const section: Section = {
  items: [
    {
      path: '/admin/dashboard/accueil',
      name: 'Dashboard',
    },
  ],
  page: {
    path: '/admin/dashboard/parametres',
    name: 'Paramètres',
  },
};

const ProfileSettings: React.FC = () => {
  // Update the section for breadcrumb into topbarMenu
  const { setVisitedSection } = useVisitedSection();

  useEffect(() => {
    setVisitedSection(section);
  }, [setVisitedSection]);

  const [profileSettings, setProfileSettings] = useState<AdminSettings>({
    email: '',
    two_fa_enabled: false,
    firstname: '',
    lastname: '',
    role: '',
    biography: '',
    avatar: '',
    last_login: '',
  });
  const [loading, setLoading] = useState<boolean>(true);

  // Call API
  useEffect(() => {
    const loadProfileSettings = async () => {
      try {
        const profileSettingsData = await fetchAdminSettings();
        setProfileSettings(profileSettingsData);
      } catch (error) {
        console.error('Erreur lors du chargement des réalisations :', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfileSettings();
  }, []);

  // To switch section tab
  const [sectionValue, setSectionValue] = useState<string>('du Profil');

  const handleSwitchSection = (value: string) => {
    setSectionValue(value);
  };

  // To update new value of settings
  const handleChangeSettings = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setProfileSettings((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Loading to wait data initializing
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
    <>
      <div className="flex size-full items-center justify-center">
        <Tabs defaultValue="profile" className="size-full">
          <div className="flex items-center justify-between">
            <TabsList className="grid w-max grid-cols-2">
              <TabsTrigger
                value="profile"
                onClick={() => handleSwitchSection('du Profil')}
                className="px-12"
              >
                Profil
              </TabsTrigger>
              <TabsTrigger
                value="security"
                onClick={() => handleSwitchSection('de Sécurité')}
                className="px-12"
              >
                Sécurité
              </TabsTrigger>
            </TabsList>
            <h2 className="text-xl font-semibold max-sm:hidden">
              Paramètres {sectionValue}
            </h2>
          </div>
          <TabsContent value="profile">
            <ProfileInformation
              profileSettings={profileSettings}
              handleChangeSettings={handleChangeSettings}
            />
          </TabsContent>
          <TabsContent value="security">
            <SecuritySettings profileSettings={profileSettings} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default ProfileSettings;

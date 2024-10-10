'use client';

import { Pencil } from 'lucide-react';
import { useEffect } from 'react';

import { AutosizeTextarea } from '@/components/ui/autosize-textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { Section } from '../../components/topbarMenu';
import { useVisitedSection } from '../../VisitedSectionContext';

const section: Section = {
  items: [
    {
      path: '/admin/dashboard',
      name: 'Dashboard',
    },
  ],
  page: {
    path: '/admin/dashboard/:id/parametres',
    name: 'Paramètres du profil',
  },
};

const ProfileSettings: React.FC = () => {
  // Update the section for breadcrumb into topbarMenu
  const { setVisitedSection } = useVisitedSection();

  useEffect(() => {
    setVisitedSection(section);
  }, [setVisitedSection]);

  return (
    <div className="flex size-full items-center justify-center">
      <Tabs defaultValue="account" className="size-full">
        <div className="flex items-center justify-between">
          <TabsList className="grid w-1/3 grid-cols-2">
            <TabsTrigger value="account">Informations</TabsTrigger>
            <TabsTrigger value="password">Sécurité</TabsTrigger>
          </TabsList>
          <h2 className="text-xl font-semibold">Paramètres du profil</h2>
        </div>
        <TabsContent value="account" className="pb-4">
          <Card>
            <CardHeader>
              <CardTitle>Informations</CardTitle>
              <CardDescription>
                Apportez des modifications à vos informations ici. Cliquez sur
                enregistrer lorsque vous avez terminé.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-evenly">
              <div className="w-1/2 space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="email">Adresse mail</Label>
                  <Input
                    id="email"
                    defaultValue="john.doe@gmail.com"
                    className="w-1/2"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="role">Rôle</Label>
                  <Input
                    id="role"
                    placeholder="Ex: Responsable Marketing, Consultant(e), Analyste, Artiste, Ingénieur(e)"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="biography">Biographie</Label>
                  <AutosizeTextarea
                    id="biography"
                    maxHeight={200}
                    placeholder="Décrivez votre parcours professionnel, vos compétences clés, et ce qui vous passionne dans votre domaine. Ex: Plus de 10 ans d'expérience dans le secteur, spécialisé(e) dans l'optimisation de processus et l'innovation technologique."
                  />
                </div>
                <Button>Enregistrer les modifications</Button>
              </div>
              <div className="w-[2px] bg-muted-foreground/30" />
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="relative">
                  <Avatar className="size-52">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="absolute right-3 top-3 z-50 rounded-full text-foreground"
                        >
                          <Pencil className="size-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Modifier la photo de profil</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <h2 className="text-lg font-semibold">Alexis Estrine</h2>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Sécurité</CardTitle>
              <CardDescription>
                Modifiez vos paramètres de sécurité ici. Assurez-vous de cliquer
                sur enregistrer après avoir effectué vos changements pour
                sécuriser votre compte.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex size-full justify-evenly">
                <div className="w-1/3 space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="current">Ancien mot de passe</Label>
                    <Input id="current" type="password" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="new">Nouveau mot de passe</Label>
                    <Input id="new" type="password" />
                  </div>
                  <Button>Enregistrer le mot de passe</Button>
                </div>
                <div className="w-[2px] bg-muted-foreground/30" />
                <div className="h-full w-1/3">
                  <h2 className="text-lg">Authentification 2FA</h2>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileSettings;

import Image from 'next/image';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Login: React.FC = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 w-screen">
        <Image
          src="https://images.unsplash.com/photo-1620121478247-ec786b9be2fa?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          fill
          alt="Image"
          className="object-cover"
        />
      </div>
      <Card className="relative z-10 w-[350px]">
        <CardHeader>
          <CardTitle className="text-3xl">Connexion Admin</CardTitle>
          <CardDescription>
            Veuillez entrer vos identifiants pour accéder au panel
            d'administration.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Entrez votre email"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Entrez votre mot de passe"
                  required
                />
              </div>
            </div>
          </form>
          <p className="cursor-pointer text-sm text-foreground hover:underline">
            Mot de passe oublié ?
          </p>
        </CardContent>
        <CardFooter>
          <Button type="submit">Connexion</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;

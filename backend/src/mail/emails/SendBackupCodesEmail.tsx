import { Tailwind } from "@react-email/tailwind";
import { tailwindConfig } from "../config/tailwind.config";
import * as React from "react";

interface MailProps {
  name: string;
  appName: string;
  appUrl: string;
  backupCodes: string[];
}

const main = "bg-gray-100 font-sans py-6 px-2";
const container = "max-w-lg mx-auto bg-white rounded-lg shadow-lg overflow-hidden";
const header = "bg-brand text-white text-center py-8 px-4 flex flex-col items-center gap-8";
const logo = "w-1/2 min-md:w-1/3";
const headerText = "text-2xl font-semibold m-0";
const content = "p-8 flex flex-col gap-8";
const paragraph = "text-base leading-6 text-gray-700 m-0";
const btnContainer = "text-center my-4";
const button = "bg-brand px-6 py-4 rounded-md shadow-md no-underline text-slate-50 text-wrap block leading-7";
const footer = "text-gray-600 text-sm text-center py-4 border-t border-gray-200";
const copyright = "text-sm leading-6 text-gray-700 m-0";

const SendBackupCodesEmail = (
  { name, appName, appUrl, backupCodes }: MailProps
) => {
  const connexionLink = `${appUrl}/admin/connexion`;

  return (
    <Tailwind
      config={tailwindConfig}
    >
      <div className={main}>
        <div className={container}>
          <div className={header}>
            <div className={logo}>
              <img src={`${appUrl}/assets/images/logo-cropped.svg`} alt={`Logo de ${appName}`} />
            </div>
            <h1 className={headerText}>Vos Codes de Secours 2FA</h1>
          </div>
          <div className={content}>
            <p className={paragraph}>Bonjour {name},</p>
            <p className={paragraph}>
              Pour renforcer la sécurité de votre compte {appName}, nous vous avons généré des codes de secours uniques que vous pouvez utiliser si vous perdez l'accès à votre authentification 2FA.
            </p>
            <p className={paragraph}>
              <strong>Voici vos codes de secours :</strong>
            </p>
            <ul className={paragraph}>
              {backupCodes.map((code, index) => (
                <li key={index} className="text-base text-gray-700">
                  {code}
                </li>
              ))}
            </ul>
            <p className={paragraph}>
              Nous vous recommandons de conserver ces codes dans un endroit sûr.
            </p>
            <p className={paragraph}>
            <strong>Important</strong> : Si vous avez perdu l'accès à votre système 2FA et que vous recevez cet email, il est conseillé de <strong>désactiver puis réactiver</strong> votre authentification 2FA pour réinitialiser votre accès. Cela vous permettra de configurer à nouveau votre 2FA.
            </p>
            <div className={btnContainer}>
              <a href={connexionLink} className={button}>
                Se connecter
              </a>
            </div>
            <p className={paragraph}>
              Bien à vous,
              <br />
              L'équipe {appName}
            </p>
          </div>
          <div className={footer}>
            <p className={copyright}>&copy; {new Date().getFullYear()} {appName}. Tous droits réservés.</p>
          </div>
        </div>
      </div>
    </Tailwind>
  );
};

export default SendBackupCodesEmail;

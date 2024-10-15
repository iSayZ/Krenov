export interface AdminProfile {
    firstname: string;
    lastname: string;
    role: string;
    biography: string;
    avatar: string;
    last_login: string;
}

export interface AdminSettings extends AdminProfile {
    email: string;
    two_fa_enabled: boolean;
}
  
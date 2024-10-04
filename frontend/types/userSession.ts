interface CustomSession {
    user: CustomUser;
    expires: string;
}

interface CustomUser {
    id: string;
    name?: string | null;
    email: string;
    profile_image?: string | null;
    token?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
    needsVerification: boolean;
    email_verified_at: string | null;
}

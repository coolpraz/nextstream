"use client"

import { signOut } from "next-auth/react";

const LogoutButton = () => {
    // const router = useRouter();

    return <button onClick={() => signOut()}>Sign Out</button>
};

export default LogoutButton;

"use client";

import { useSession, signOut } from "next-auth/react";

export default function SettingsPage() {
    const session = useSession();
    
    const 
    return (
        <div>
            {JSON.stringify(session)}
            <button onClick={onClick}>
                Sign Out
            </button>
        </div>
    );
}

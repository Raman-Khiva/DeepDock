"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import api from "../lib/api/axios";

export default function useSyncUser() {
    const { getToken, userId, isLoaded, isSignedIn } = useAuth();

    useEffect(() => {
        if (!isLoaded || !isSignedIn || !userId) return;

        async function syncUser() {
            try {
                const token = await getToken();
                if (!token) return;

                await api.post(
                    "/user/sync",
                    { clerkId: userId },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                console.log("User synced successfully ✅");
            } catch (err) {
                console.error("Sync failed ❌", err);
            }
        }

        syncUser();
    }, [isLoaded, isSignedIn, userId]);
}
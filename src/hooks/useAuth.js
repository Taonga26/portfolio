import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export default function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        async function getUser() {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (mounted) {
                setUser(user);
                setLoading(false);
            }
        }

        getUser();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null);
                setLoading(false);
            }
        );

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, []);

    async function login(email, password) {
        return await supabase.auth.signInWithPassword({
            email,
            password,
        });
    }

    async function logout() {
        return await supabase.auth.signOut();
    }

    return {
        user,
        loading,
        login,
        logout,
    };
}
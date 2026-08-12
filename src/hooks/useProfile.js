import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export default function useProfile() {

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        async function loadProfile() {

            setLoading(true);
            setError(null);

            const {
                data,
                error
            } = await supabase
                .from("profile")
                .select(`
                    *
                `)
                .limit(1)
                .maybeSingle();

            if (error) {
                setError(error);
                setLoading(false);
                return;
            }

            setProfile(data);
            setLoading(false);
        }

        loadProfile();

    }, []);

    return {
        profile,
        loading,
        error
    };
}
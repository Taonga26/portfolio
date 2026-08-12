import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export default function useAbout() {
    const [about, setAbout] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadAbout() {
            setLoading(true);

            const { data, error } = await supabase
                .from("about")
                .select("*")
                .single();

            if (error) {
                setError(error);
            } else {
                setAbout(data);
            }

            setLoading(false);
        }

        loadAbout();
    }, []);

    return { about, loading, error };
}
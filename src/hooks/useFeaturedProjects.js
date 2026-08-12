import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export default function useFeaturedProjects() {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        async function load() {

            setLoading(true);

            const {
                data,
                error
            } = await supabase
                .from("projects")
                .select(`
                    *,
                    project_technologies(
                        technologies(
                            id,
                            name,
                            icon
                        )
                    )
                `)
                .eq("published", true)
                .eq("featured", true)
                .order("sort_order");

            if (error) {
                console.error(
                    "Failed to load featured projects:",
                    error
                );

                setError(error);
                setProjects([]);
            } else {
                setProjects(data ?? []);
            }

            setLoading(false);
        }

        load();

    }, []);

    return {
        projects,
        loading,
        error
    };
}
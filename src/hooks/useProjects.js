import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export default function useProjects() {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function load() {

            const { data, error } = await supabase
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
                .order("sort_order");

            if (!error) {
                setProjects(data);
            }

            setLoading(false);
        }

        load();

    }, []);

    return { projects, loading };
}
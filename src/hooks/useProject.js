import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export default function useProject(id) {

    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (!id) return;

        async function load() {

            const { data, error } = await supabase
                .from("projects")
                .select(`
                    *,
                    project_images(
                        id,
                        image_path,
                        caption,
                        display_order
                    ),
                    project_technologies(
                        technologies(
                            id,
                            name,
                            icon
                        )
                    )
                )
                `)
                .eq("id", id)
                .single();

            if (!error) {
                setProject(data);
            }

            setLoading(false);
        }

        load();

    }, [id]);

    return { project, loading };
}
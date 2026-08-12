import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export default function useSkills() {
    const [skills, setSkills] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            const { data, error } = await supabase
                .from("skills")
                .select("*")
                .order("category")
                .order("name");

            if (error) {
                console.error(error);
                setLoading(false);
                return;
            }

            const grouped = data.reduce((acc, skill) => {
                if (!acc[skill.category]) {
                    acc[skill.category] = [];
                }

                acc[skill.category].push(skill);

                return acc;
            }, {});

            setSkills(grouped);
            setLoading(false);
        }

        load();
    }, []);

    return { skills, loading };
}
import {
    useEffect,
    useState
} from "react";

import { supabase }
    from "../utils/supabase";

import { getResumeUrl }
    from "../utils/storage";


export default function useResume() {

    const [resume, setResume] =
        useState(null);


    useEffect(() => {

        async function loadResume() {

            const {
                data,
                error
            } = await supabase
                .from("resume")
                .select(`
                    id,
                    file_name,
                    file_url,
                    updated_at
                `)
                .eq("active", true)
                .maybeSingle();


            if (error) {

                console.error(
                    "Failed to load resume:",
                    error
                );

                return;
            }


            if (!data) {

                setResume(null);

                return;
            }


            setResume({
                ...data,
                url: getResumeUrl(
                    data.file_url
                )
            });

        }


        loadResume();

    }, []);


    return resume;
}
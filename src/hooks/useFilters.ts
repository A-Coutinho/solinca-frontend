import { useEffect, useState } from "react";
import { getDdlItems } from "../helpers/HelperComponent";
import { DAYS, MediaSize, type MetaResponseType } from "../helpers/customTypes";

export function useFilters(metaResponse?: MetaResponseType) {
    const [gymSelected, setGymSelected] = useState("0");
    const [classSelected, setClassSelected] = useState("0");
    const [daySelected, setDaySelected] = useState("0");
    const [afterworkSelected, setAfterworkSelected] = useState(false);

    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < MediaSize.md);

    const [showFilters, setShowFilters] = useState<boolean>(false);

    /* ------------------ Resize Listener ------------------ */
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < MediaSize.md);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    /* ------------------ DDL Builders ------------------ */

    function getGymDDL() {
        if (!metaResponse?.gyms) return [];

        const values = metaResponse.gyms;
        const labels = metaResponse.gyms;

        return getDdlItems(values, labels, true);
    }

    function getClassDDL() {
        if (!metaResponse) return [];

        const values: string[] = [];
        const labels: string[] = [];

        metaResponse.classes_geral?.forEach((c) => {
            values.push(c);
            labels.push(c);
        });

        metaResponse.classes_water?.forEach((c) => {
            values.push(c);
            labels.push("*" + c);
        });

        return getDdlItems(values, labels, true);
    }

    function getDayDDL() {
        return getDdlItems(DAYS, DAYS, true);
    }

    /* ------------------ Toggle ------------------ */

    function toggleAfterwork(value: boolean) {
        setAfterworkSelected(value);
    }

    function toggleFiltersVisibility() {
        setShowFilters((prev) => !prev);
    }

    return {
        // selected values
        gymSelected,
        classSelected,
        daySelected,
        afterworkSelected,

        // setters
        setGymSelected,
        setClassSelected,
        setDaySelected,
        toggleAfterwork,

        // mobile
        isMobile,
        showFilters,
        toggleFiltersVisibility,

        // ddl
        getGymDDL,
        getClassDDL,
        getDayDDL,
    };
}

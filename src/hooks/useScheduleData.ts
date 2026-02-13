import { useEffect, useState } from "react";
import { getApi_afterwork, getApi_all, getApi_meta } from "../helpers/HelperComponent";
import type { ApiResponseType, MetaResponseType } from "../helpers/customTypes";

export function useScheduleData() {
    const [loading, setLoading] = useState(true);

    const [apiResponse, setApiResponse] = useState<ApiResponseType | undefined>(undefined);

    const [afterworkResponse, setAfterworkResponse] = useState<ApiResponseType | undefined>(undefined);

    const [metaResponse, setMetaResponse] = useState<MetaResponseType | undefined>(undefined);

    useEffect(() => {
        const getData = async () => {
            try {
                const [_apiAll, _apiMeta, _apiAfterwork] = await Promise.all([getApi_all(), getApi_meta(), getApi_afterwork()]);

                setApiResponse(_apiAll);
                setMetaResponse(_apiMeta);
                setAfterworkResponse(_apiAfterwork);

                if (_apiAll?.classes?.length) {
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error loading schedule data:", error);
                setLoading(false);
            }
        };

        getData();
    }, []);

    return {
        loading,
        apiResponse,
        afterworkResponse,
        metaResponse,
    };
}

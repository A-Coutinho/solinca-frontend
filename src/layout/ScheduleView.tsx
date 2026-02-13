import { CalendarComponent } from "../components/CalendarComponent";
import type { ApiResponseType } from "../helpers/customTypes";

type ScheduleViewProps = {
    apiResponse?: ApiResponseType;
    afterworkResponse?: ApiResponseType;
    afterworkSelected: boolean;

    classSelected: string;
    gymSelected: string;
    daySelected: string;
};

export function ScheduleView({ apiResponse, afterworkResponse, afterworkSelected, classSelected, gymSelected, daySelected }: ScheduleViewProps) {
    const activeResponse = afterworkSelected ? afterworkResponse : apiResponse;

    if (!activeResponse?.classes) return null;

    return <CalendarComponent apiresponse={activeResponse} classSelected={classSelected} gymSelected={gymSelected} daySelected={daySelected} />;
}

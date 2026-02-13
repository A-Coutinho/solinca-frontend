import styled from "styled-components";
import "./app.css";

import { InfoDisplay } from "./components/InfoDisplay";
import { useFilters } from "./hooks/useFilters";
import { useScheduleData } from "./hooks/useScheduleData";

import { FiltersBar } from "./layout/FiltersBar";
import { ScheduleView } from "./layout/ScheduleView";

/* ------------------ Styled ------------------ */

const LoadingContainer = styled.div`
    margin: auto;
    padding: 0;
    text-align: center;
    width: 100%;
    height: 100vh;
`;

function App() {
    const { loading, apiResponse, afterworkResponse, metaResponse } = useScheduleData();

    const filters = useFilters(metaResponse);

    if (loading) {
        return (
            <LoadingContainer>
                <InfoDisplay textToDisplay="Loading..." />
            </LoadingContainer>
        );
    }

    return (
        <div className="homePage">
            <FiltersBar {...filters} />

            <ScheduleView
                apiResponse={apiResponse}
                afterworkResponse={afterworkResponse}
                afterworkSelected={filters.afterworkSelected}
                classSelected={filters.classSelected}
                gymSelected={filters.gymSelected}
                daySelected={filters.daySelected}
            />
        </div>
    );
}

export default App;

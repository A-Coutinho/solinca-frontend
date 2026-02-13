import { useEffect, useState } from "react";
import styled from "styled-components";
import "./app.css";
import filterIcon from "./assets/filter.png";
import { CalendarComponent } from "./components/CalendarComponent";
import { CustomDropdown } from "./components/CustomDropdown";
import { InfoDisplay } from "./components/InfoDisplay";
import { ToggleComponent } from "./components/ToggleComponent";
import { getApi_afterwork, getApi_all, getApi_meta, getDdlItems } from "./helpers/HelperComponent";
import { DAYS, MediaSize, media, mediaSolinca, type ApiResponseType, type MetaResponseType } from "./helpers/customTypes";

const LoadingContainer = styled.div<{}>`
    margin: auto;
    padding: 0;
    text-align: center;
    width: 100%;
    height: 100vh;
`;
const DropdownContainer = styled.div<{}>`
    width: 100%;
    display: flex;

    @media (${media.largeDesktop}) {
    }
    @media (${media.desktop}) {
    }
    @media (${media.tablet}) {
    }
    @media (${media.phone}) {
        display: block;
    }
    @media (${media.smallphone}) {
    }
`;
const FilterIcon = styled.div<{}>`
    width: 60px;
    height: 60px;
    background-image: url(${filterIcon});
    background-size: 50px;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 25%;
    margin: 10px auto;
    border: ${mediaSolinca.calendarDayBorder};

    @media (${media.largeDesktop}) {
    }
    @media (${media.desktop}) {
    }
    @media (${media.tablet}) {
    }
    @media (${media.phone}) {
        display: block;
    }
    @media (${media.smallphone}) {
    }
`;

function App() {
    const [loading, setLoading] = useState(true);
    const [apiResponse, setApiResponse] = useState<ApiResponseType | undefined>(undefined);
    const [afterworkResponse, setAfterworkResponse] = useState<ApiResponseType | undefined>(undefined);
    const [metaresponse, setMetaResponse] = useState<MetaResponseType | undefined>(undefined);

    const [gymSelected, setGymSelected] = useState("0");
    const [classSelected, setClassSelected] = useState("0");
    const [daySelected, setDaySelected] = useState("0");
    const [afterworkSelected, setAfterworkSelected] = useState(false);

    // const [pageW, pageWSet] = useState<number>(window.innerWidth);
    const [isMobile, isMobileWSet] = useState<boolean>(window.innerWidth < MediaSize.md);
    const [showFilters, showFiltersSet] = useState<boolean>(false);

    useEffect(() => {
        return () => {};
    }, []);

    useEffect(() => {
        const getData = async () => {
            const _apiAll = await getApi_all();
            if (_apiAll && _apiAll.classes && _apiAll.classes.length > 0) setLoading(false);
            setApiResponse(_apiAll);
            const _apiMeta = await getApi_meta();
            setMetaResponse(_apiMeta);
            const _apiAfterwork = await getApi_afterwork();
            setAfterworkResponse(_apiAfterwork);
        };

        getData();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            // pageWSet(window.innerWidth);
            isMobileWSet(window.innerWidth < MediaSize.md);
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    //#region DDL
    function setDDL_gym() {
        const _value: string[] = [];
        const _label: string[] = [];

        metaresponse?.gyms.forEach((element) => {
            _value.push(element);
            _label.push(element);
        });

        return getDdlItems(_value, _label, true);
    }

    function onchangeDDL_gym(_value: string) {
        setGymSelected(_value);
    }

    function setDDL_class() {
        const _value: string[] = [];
        const _label: string[] = [];

        metaresponse?.classes_geral.forEach((element) => {
            _value.push(element);
            _label.push(element);
        });
        metaresponse?.classes_water.forEach((element) => {
            _value.push(element);
            _label.push("*" + element);
        });

        return getDdlItems(_value, _label, true);
    }

    function onchangeDDL_class(_value: string) {
        setClassSelected(_value);
    }

    function setDDL_day() {
        const _value: string[] = [];
        const _label: string[] = [];

        DAYS.forEach((element) => {
            _value.push(element);
            _label.push(element);
        });

        return getDdlItems(_value, _label, true);
    }

    function onchangeDDL_day(_value: string) {
        setDaySelected(_value);
    }
    //#endregion DDL

    function toggleNight(_input: boolean) {
        setAfterworkSelected(_input);
    }

    if (loading)
        return (
            <LoadingContainer>
                <InfoDisplay textToDisplay="Loading..."></InfoDisplay>
            </LoadingContainer>
        );

    return (
        <div className="homePage">
            {isMobile ? (
                <div onClick={() => showFiltersSet(!showFilters)}>
                    <FilterIcon></FilterIcon>
                </div>
            ) : null}
            {(isMobile && showFilters) || !isMobile ? (
                <DropdownContainer>
                    <ToggleComponent onClickAction={toggleNight} disabled={false} text="20H"></ToggleComponent>
                    <CustomDropdown ddItems={setDDL_day()} onChangeDrop={onchangeDDL_day} selectAll="Dia"></CustomDropdown>
                    <CustomDropdown ddItems={setDDL_gym()} onChangeDrop={onchangeDDL_gym} selectAll="Ginasio"></CustomDropdown>
                    <CustomDropdown ddItems={setDDL_class()} onChangeDrop={onchangeDDL_class} selectAll="Aulas"></CustomDropdown>
                </DropdownContainer>
            ) : null}
            {!afterworkSelected && apiResponse && apiResponse.classes ? (
                <>
                    <CalendarComponent apiresponse={apiResponse} classSelected={classSelected} gymSelected={gymSelected} daySelected={daySelected}></CalendarComponent>
                </>
            ) : null}
            {afterworkSelected && afterworkResponse && afterworkResponse.classes ? (
                <>
                    <CalendarComponent apiresponse={afterworkResponse} classSelected={classSelected} gymSelected={gymSelected} daySelected={daySelected}></CalendarComponent>
                </>
            ) : null}
        </div>
    );
}

export default App;

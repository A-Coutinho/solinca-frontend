import styled from "styled-components";
import { groupByTime } from "../helpers/HelperComponent";
import { DAYS, fontSizes, media, mediaSolinca, type ApiResponseType } from "../helpers/customTypes";
import { GymClassComponent } from "./GymClassComponent";

interface Props {
    apiresponse: ApiResponseType;
    gymSelected?: string;
    classSelected?: string;
    daySelected?: string;
}

/* ------------------ Styled ------------------ */

const Container = styled.div`
    width: 100%;
    display: flex;

    @media (${media.tablet}) {
        display: block;
    }
`;

const DayContainer = styled.div`
    width: 13%;
    height: fit-content;
    display: block;
    margin: 0 auto;

    @media (${media.tablet}) {
        width: 90%;
    }
`;

const DayName = styled.span`
    width: 100%;
    font-size: ${fontSizes.lg};
    text-align: center;
    display: block;
    text-transform: capitalize;
    margin: 10px 0;

    @media (${media.tablet}) {
        font-weight: bold;
        text-transform: uppercase;
        text-decoration: underline;
    }
`;

const TimeGroupWrapper = styled.div`
    margin-bottom: 10px;
`;

const TimeLabel = styled.div`
    font-weight: 600;
    font-size: ${fontSizes.md};
    margin: 15px 0 5px 0;
    padding-left: 6px;
    border-left: 3px solid #ccc;
    color: #444;
`;

const DayBorder = styled.div`
    width: 100%;
    border: ${mediaSolinca.calendarClassBorder};
    margin-bottom: 6px;
`;

const DayWrapper = styled.div`
    width: calc(100% - 10px);
    margin: 0 5px;
`;

/* ------------------ Component ------------------ */

export const CalendarComponentNew: React.FC<Props> = ({ apiresponse, classSelected, gymSelected, daySelected }) => {
    function getClassesForDay(_day: string) {
        let output = apiresponse.classes.filter((c) => c.day === _day);

        if (classSelected && classSelected !== "0") output = output.filter((c) => c.name === classSelected);

        if (gymSelected && gymSelected !== "0") output = output.filter((c) => c.gym === gymSelected);

        return output;
    }

    function renderDay(day: string) {
        const classes = getClassesForDay(day);
        const grouped = groupByTime(classes);

        if (grouped.length === 0) return null;

        return (
            <DayContainer key={day}>
                <DayName>{day}</DayName>

                {grouped.map((group) => (
                    <TimeGroupWrapper key={group.time}>
                        <TimeLabel>{group.time}</TimeLabel>

                        {group.items.map((item, i) => (
                            <DayBorder key={i}>
                                <DayWrapper>
                                    <GymClassComponent gymclass={item} />
                                </DayWrapper>
                            </DayBorder>
                        ))}
                    </TimeGroupWrapper>
                ))}
            </DayContainer>
        );
    }

    return <>{daySelected && daySelected !== "0" ? <Container>{renderDay(daySelected)}</Container> : <Container>{DAYS.map((day) => renderDay(day))}</Container>}</>;
};

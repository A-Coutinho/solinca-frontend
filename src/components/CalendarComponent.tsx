import styled from "styled-components";
import { DAYS, fontSizes, media, mediaSolinca, type ApiResponseType } from "../helpers/customTypes";
import { GymClassComponent } from "./GymClassComponent";

interface Props {
    apiresponse: ApiResponseType;
    gymSelected?: string;
    classSelected?: string;
    daySelected?: string;
}

const Container = styled.div<{}>`
    width: 100%;
    display: flex;

    @media (${media.largeDesktop}) {
    }
    @media (${media.desktop}) {
    }
    @media (${media.tablet}) {
        display: block;
    }
    @media (${media.phone}) {
    }
    @media (${media.smallphone}) {
    }
`;
const DayContainer = styled.div<{}>`
    width: 13%;
    height: fit-content;
    display: block;
    margin: 0 auto;

    @media (${media.largeDesktop}) {
    }
    @media (${media.desktop}) {
    }
    @media (${media.tablet}) {
        width: 90%;
    }
    @media (${media.phone}) {
    }
    @media (${media.smallphone}) {
    }
`;
const DayBorder = styled.div<{}>`
    width: 100%;
    height: fit-content;
    border: ${mediaSolinca.calendarClassBorder};

    @media (${media.largeDesktop}) {
    }
    @media (${media.desktop}) {
    }
    @media (${media.tablet}) {
    }
    @media (${media.phone}) {
    }
    @media (${media.smallphone}) {
    }
`;
const DayWrapper = styled.div<{}>`
    height: fit-content;
    width: calc(100% - 10px);
    margin: 0 5px;
    @media (${media.largeDesktop}) {
    }
    @media (${media.desktop}) {
    }
    @media (${media.tablet}) {
    }
    @media (${media.phone}) {
    }
    @media (${media.smallphone}) {
    }
`;

const DayName = styled.span<{}>`
    width: 100%;
    font-size: ${fontSizes.lg};
    text-align: center;
    display: block;
    text-transform: capitalize;
    margin: 10px 0;

    @media (${media.largeDesktop}) {
    }
    @media (${media.desktop}) {
    }
    @media (${media.tablet}) {
        font-weight: bold;
        text-transform: uppercase;
        text-decoration: underline;
    }
    @media (${media.phone}) {
    }
    @media (${media.smallphone}) {
    }
`;

export const CalendarComponent: React.FC<Props> = ({ apiresponse, classSelected, gymSelected, daySelected }) => {
    function getClassesForDay(_day: string) {
        let _output = apiresponse.classes.filter((c) => c.day === _day);
        if (classSelected !== "0") _output = _output.filter((c) => c.name === classSelected);
        if (gymSelected !== "0") _output = _output.filter((c) => c.gym === gymSelected);
        return _output;
    }

    return (
        <>
            {daySelected !== "0" ? (
                <Container>
                    <DayContainer>
                        <DayName >{daySelected}</DayName>
                        {getClassesForDay(daySelected!).map(function (item, i) {
                            return (
                                <DayBorder key={i}>
                                    <DayWrapper>
                                        <GymClassComponent gymclass={item}></GymClassComponent>
                                    </DayWrapper>
                                </DayBorder>
                            );
                        })}
                    </DayContainer>
                </Container>
            ) : (
                <Container>
                    {DAYS.map((day, index) => (
                        <DayContainer key={day}>
                            <DayName>{day}</DayName>
                            {getClassesForDay(DAYS[index]).map(function (item, i) {
                                return (
                                    <DayBorder key={i}>
                                        <DayWrapper>
                                            <GymClassComponent gymclass={item}></GymClassComponent>
                                        </DayWrapper>
                                    </DayBorder>
                                );
                            })}
                        </DayContainer>
                    ))}
                </Container>
            )}
        </>
    );
};

import styled from "styled-components";
import { fontSizes, media, type GymClassType } from "../helpers/customTypes";

interface Props {
    gymclass: GymClassType;
}

const Container = styled.div<{}>`
    width: 100%;
    height: auto;


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
const Wrapper = styled.div<{}>`
    width: 100%;
    height: fit-content;
    margin: auto;
    display: block;

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

const Span = styled.span<{ $title?: boolean }>`
    width: 100%;
    font-size: ${fontSizes.md};
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 3px 0;

    ${(props) => (props.$title ? "text-align: center;" : null)}
    ${(props) => (props.$title ? "font-weight: bold;" : null)}
    ${(props) => (props.$title ? "padding: 10px 0 5px 0;" : null)}

    @media (${media.largeDesktop}) {
    }
    @media (${media.desktop}) {
    }
    @media (${media.tablet}) {
        text-align: center;
    }
    @media (${media.phone}) {
        font-size: ${fontSizes.md};
    }
    @media (${media.smallphone}) {
        font-size: ${fontSizes.md};
    }
`;

export const GymClassComponent: React.FC<Props> = ({ gymclass }) => {
    return (
        <>
            <Container>
                <Wrapper>
                    <Span $title={true}>{gymclass.name} </Span>
                    <Span>{gymclass.gym} </Span>
                    <Span>{gymclass.time} </Span>
                    <Span>{gymclass.location}</Span>
                </Wrapper>
            </Container>
        </>
    );
};

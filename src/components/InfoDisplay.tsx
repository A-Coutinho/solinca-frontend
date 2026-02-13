import styled from "styled-components";
import { fontSizes, media } from "../helpers/customTypes";

interface Props {
    textToDisplay: string;
}

const Container = styled.div<{}>`
    width: 100vw;
    max-width: 100%;
    height: 100vh;
    display: flex;
`;

const InfoText = styled.span<{}>`
    display: block;
    width: fit-content;
    margin: auto;
    font-size: ${fontSizes.xxl};

    @media (${media.largeDesktop}) {
        font-size: ${fontSizes.xl};
    }
    @media (${media.desktop}) {
        font-size: ${fontSizes.xl};
    }
    @media (${media.tablet}) {
        font-size: ${fontSizes.lg};
    }
    @media (${media.phone}) {
        font-size: ${fontSizes.lg};
    }
    @media (${media.smallphone}) {
        font-size: ${fontSizes.md};
    }
`;

export const InfoDisplay: React.FC<Props> = ({ textToDisplay }) => {
    return (
        <>
            <Container>
                <InfoText>{textToDisplay}</InfoText>
            </Container>
        </>
    );
};

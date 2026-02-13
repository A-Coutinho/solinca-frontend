import { useEffect } from "react";
import styled from "styled-components";

interface Props {
    text?: string;
    onClickAction?: Function;
    disabled?: boolean;
}

const Container = styled.div<{}>`
    display: flex;
    width: fit-content;
`;

const Wrapper = styled.div<{}>`
    padding: 5px;
    margin: 5px;
    width: fit-content;
    height: fit-content;
    display: flex;
    margin: auto;
`;
const Toggle = styled.label<{}>`
    margin: auto;
`;
const Toggle_Input = styled.input.attrs({ type: "checkbox" })``;
const Toggle_Span = styled.span<{}>``;
const TextContainer = styled.div<{}>`
    margin: auto 10px;
`;
const TextSpan = styled.span<{}>``;

export const ToggleComponent: React.FC<Props> = ({ text, onClickAction, disabled }) => {
    function checkboxOnchange(_value: boolean) {
        if (onClickAction) onClickAction(_value);
    }

    useEffect(() => {
        return () => {};
    }, []);

    return (
        <>
            <Container>
                <Wrapper>
                    {text ? (
                        <TextContainer>
                            <TextSpan>{text}</TextSpan>
                        </TextContainer>
                    ) : null}
                    <Toggle className="switch">
                        <Toggle_Input disabled={disabled} onChange={(event) => checkboxOnchange(event.target.checked)}></Toggle_Input>
                        <Toggle_Span className="slider round"></Toggle_Span>
                    </Toggle>
                </Wrapper>
            </Container>
        </>
    );
};

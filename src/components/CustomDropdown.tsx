import React from "react";
import styled from "styled-components";
import type { DropdownItems } from "../helpers/customTypes";

interface Props {
    ddItems: DropdownItems[];
    onChangeDrop: Function;
    selectAll?: string;
}

const Container = styled.div<{}>`
    width: fit-content;
    padding: 10px;
`;

const CustomSelect = styled.select<{}>`
    width: 100%;
    padding: 10px;
`;

export const CustomDropdown: React.FC<Props> = ({ ddItems, onChangeDrop, selectAll }) => {
    return (
        <Container>
            <CustomSelect defaultValue={""} onChange={(event) => onChangeDrop(event.target.value)}>
                {selectAll ? (
                    <option key="All" value={0}>
                        {selectAll}
                    </option>
                ) : null}
                {ddItems?.map((item, index) => {
                    return (
                        <option key={index} value={item.value}>
                            {item.label}
                        </option>
                    );
                })}
            </CustomSelect>
        </Container>
    );
};

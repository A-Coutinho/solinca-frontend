import styled from "styled-components";
import filterIcon from "../assets/filter.png";
import { CustomDropdown } from "../components/CustomDropdown";
import { CustomMultipleDropdown } from "../components/CustomMultipleDropdown";
import { ToggleComponent } from "../components/ToggleComponent";
import { media, mediaSolinca } from "../helpers/customTypes";

/* ------------------ Styled ------------------ */

const DropdownContainer = styled.div`
    width: 100%;
    display: flex;

    @media (${media.phone}) {
        display: block;
    }
`;

const FilterIcon = styled.div`
    width: 60px;
    height: 60px;
    background-image: url(${filterIcon});
    background-size: 50px;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 25%;
    margin: 10px auto;
    border: ${mediaSolinca.calendarDayBorder};
`;

type FiltersBarProps = {
    isMobile: boolean;
    showFilters: boolean;
    toggleFiltersVisibility: () => void;

    afterworkSelected: boolean;
    toggleAfterwork: (value: boolean) => void;

    setGymSelected: (value: string[]) => void;
    setClassSelected: (value: string[]) => void;
    setDaySelected: (value: string) => void;

    getGymDDL: () => any[];
    getClassDDL: () => any[];
    getDayDDL: () => any[];
};

export function FiltersBar({
    isMobile,
    showFilters,
    toggleFiltersVisibility,

    toggleAfterwork,

    setGymSelected,
    setClassSelected,
    setDaySelected,

    getGymDDL,
    getClassDDL,
    getDayDDL,
}: FiltersBarProps) {
    return (
        <>
            {/* Mobile Button */}
            {isMobile && (
                <div onClick={toggleFiltersVisibility}>
                    <FilterIcon />
                </div>
            )}

            {/* Filters */}
            {(isMobile && showFilters) || !isMobile ? (
                <DropdownContainer>
                    <ToggleComponent onClickAction={toggleAfterwork} disabled={false} text="20H" />
                    <CustomDropdown ddItems={getDayDDL()} onChangeDrop={setDaySelected} selectAll="Dia" />
                    {/* <CustomDropdown ddItems={getGymDDL()} onChangeDrop={setGymSelected} selectAll="Ginasio" />
                    <CustomDropdown ddItems={getClassDDL()} onChangeDrop={setClassSelected} selectAll="Aulas" /> */}
                    <CustomMultipleDropdown ddItems={getClassDDL()} onChangeDrop={setClassSelected} placeholder="Aulas" />
                    <CustomMultipleDropdown ddItems={getGymDDL()} onChangeDrop={setGymSelected} placeholder="Ginásio" />{" "}
                </DropdownContainer>
            ) : null}
        </>
    );
}

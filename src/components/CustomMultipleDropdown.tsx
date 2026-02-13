import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import type { DropdownItems } from "../helpers/customTypes";

/* ------------------ Props ------------------ */

interface Props {
    ddItems: DropdownItems[];
    onChangeDrop: (values: string[]) => void;
    placeholder?: string;
}

/* ------------------ Styled ------------------ */

const Container = styled.div`
    position: relative;
    width: 200px;
    padding: 10px;
`;

const Trigger = styled.div`
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 6px;
    cursor: pointer;
    background: white;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
        border-color: #999;
    }
`;

const Dropdown = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: white;
    border: 1px solid #ccc;
    border-radius: 6px;
    margin-top: 5px;
    max-height: 250px;
    overflow-y: auto;
    z-index: 1000;
`;

const Option = styled.label`
    display: flex;
    align-items: center;
    padding: 8px 10px;
    cursor: pointer;

    &:hover {
        background: #f5f5f5;
    }
`;

const Checkbox = styled.input`
    margin-right: 8px;
`;

const Badge = styled.span`
    background: #333;
    color: white;
    font-size: 12px;
    padding: 2px 8px;
    border-radius: 20px;
`;

const Arrow = styled.span<{ $open: boolean }>`
    margin-left: 8px;
    font-size: 12px;
    transition: transform 0.2s ease;
    transform: rotate(${(props) => (props.$open ? "180deg" : "0deg")});
`;

/* ------------------ Component ------------------ */

export const CustomMultipleDropdown: React.FC<Props> = ({ ddItems, onChangeDrop, placeholder = "Select..." }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<string[]>([]);

    const ref = useRef<HTMLDivElement>(null);

    /* ---------- Close on outside click ---------- */
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    /* ---------- Handle Selection ---------- */
    function toggleValue(value: string) {
        let updated: string[];

        if (selected.includes(value)) {
            updated = selected.filter((v) => v !== value);
        } else {
            updated = [...selected, value];
        }

        setSelected(updated);
        onChangeDrop(updated);
    }

    function toggleSelectAll() {
        if (selected.length === ddItems.length) {
            setSelected([]);
            onChangeDrop([]);
        } else {
            const allValues = ddItems.map((i) => i.value);
            setSelected(allValues);
            onChangeDrop(allValues);
        }
    }

    /* ------------------ Render ------------------ */

    return (
        <Container ref={ref}>
            <Trigger onClick={() => setIsOpen(!isOpen)}>
                <span>{selected.length > 0 ? `${selected.length} selected` : placeholder}</span>

                <div style={{ display: "flex", alignItems: "center" }}>
                    {selected.length > 0 && <Badge>{selected.length}</Badge>}
                    <Arrow $open={isOpen}>▼</Arrow>
                </div>
            </Trigger>

            {isOpen && (
                <Dropdown>
                    <Option>
                        <Checkbox type="checkbox" checked={selected.length === ddItems.length} onChange={toggleSelectAll} />
                        Select All
                    </Option>

                    {ddItems.map((item) => (
                        <Option key={item.value}>
                            <Checkbox type="checkbox" checked={selected.includes(item.value)} onChange={() => toggleValue(item.value)} />
                            {item.label}
                        </Option>
                    ))}
                </Dropdown>
            )}
        </Container>
    );
};

import clsx from "clsx";
import { useCombobox } from "downshift";
import React, { Fragment, useEffect, useRef, useState } from "react";
// import "./styles.css";

const TEST_DATA = ["apple", "banana", "orange"];

interface Props {
    // className?: string;
    // items: string[];
    onChange: (value: string) => void;
    value?: string;
}
export const BillerSelect: React.FC<Props> = ({ onChange, value }) => {
    const [items, setItems] = useState(TEST_DATA);
    const [selectedItems, setSelectedItems] = useState<string>("");
    const [query, setQuery] = useState("");
    const [focused, setFocused] = useState(false);
    const input = useRef<HTMLInputElement | null>(null);
    const { isOpen, getLabelProps, getMenuProps, getInputProps, getComboboxProps, highlightedIndex, getItemProps, selectedItem, selectItem } = useCombobox({
        isOpen: focused,
        items,
        onInputValueChange: ({ inputValue }) => {
            setItems(TEST_DATA.filter((item) => item.toLowerCase().startsWith(inputValue?.toLowerCase() || "")));
        },
    });

    useEffect(() => {
        if (focused) {
            input.current?.focus();
        } else {
            input.current?.blur();
        }
    }, [focused]);

    useEffect(() => {
        if (selectedItem) {
            onChange(selectedItem);
            // console.log("🚀 ~ file: Billers.tsx ~ line 31 ~ useEffect ~ selectedItem", selectedItem);
            setSelectedItems(selectedItem);
            setFocused(false);
            setQuery("");
            selectItem(null as any);
        }
    }, [selectItem, selectedItem, input]);

    return (
        <Fragment>
            <div className="bpl-relative bpl-space-y-6">
                <div>
                    <div {...getComboboxProps()}>
                        <button
                            type="button"
                            className={`bpl-w-full bpl-justify-between bpl-items-center bpl-align-middle bpl-px-4 bpl-py-4 bpl-border bpl-border-transparent bpl-text-sm bpl-leading-5 bpl-font-semibold bpl-rounded-md bpl-bg-base-100 bpl-text-base-500 ${clsx(
                                {
                                    "bpl-flex": !focused,
                                    "bpl-hidden": focused,
                                }
                            )}`}
                            onClick={() => setFocused(true)}
                        >
                            <span>{selectedItems !== "" ? selectedItems : "Select Utility"}</span>
                            <span>
                                <svg className="bpl-fill-current" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                                    <path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z" />
                                </svg>
                            </span>
                        </button>

                        <input
                            placeholder="Add fruit by name"
                            {...getInputProps({
                                ref: input,
                                value: query,
                                // onBlur: () => setFocused(false),
                                // onFocus: () => setFocused(true),
                                onChange: (event: React.ChangeEvent<HTMLInputElement>) => setQuery(event.target.value),
                            })}
                            className={`bpl-rounded bpl-w-full bpl-p-4 bpl-form-input bpl-leading-5 ${!focused ? "bpl-hidden" : ""}`}
                        />
                    </div>
                    <ul
                        {...getMenuProps()}
                        className={`bpl-absolute bpl-rounded bpl-w-full bpl-bg-white bpl-border bpl-border-b-0 bpl-mt-2 ${!isOpen ? "bpl-hidden" : ""}`}
                    >
                        {isOpen &&
                            items.map((item: string, index: number) => (
                                <li
                                    className={`${
                                        highlightedIndex === index ? "bpl-bg-blue-600 bpl-text-white bpl-border-blue-600" : ""
                                    } bpl-px-3 bpl-py-2 bpl-border-b bpl-cursor-pointer`}
                                    key={`${item}${index}`}
                                    {...getItemProps({
                                        item,
                                        index,
                                        onMouseDown: (event: React.MouseEvent) => event.preventDefault(),
                                    })}
                                >
                                    {item}
                                </li>
                            ))}
                    </ul>
                </div>
                {/* <pre className="bpl-text-xs">selected: {selectedItems}</pre> */}
            </div>
        </Fragment>
    );
};

import React, { useState, useEffect } from "react";
import Select from "react-select";
import "../../style/order/style.scss"

interface Option {
    value: string;
    label: string;
}

const genderOptions = [
    { value: "processing", label: "processing" },
    { value: "confirmed", label: "confirmed" },
    { value: "cancelled", label: "cancelled" },
    { value: "completed", label: "completed" }

];

interface MySelectProps {
    value: string | undefined;
    onChange: (value: string) => void;
}

export const BookingSelect: React.FC<MySelectProps> = ({ value, onChange }) => {
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);

    useEffect(() => {
        if (value) {
            const option = genderOptions.find((option) => option.value === value);
            setSelectedOption(option || null);
        } else {
            setSelectedOption(null);
        }
    }, [value]);

    const handleChange = (selectedOption: Option | null) => {
        setSelectedOption(selectedOption);
        if (selectedOption) {
            onChange(selectedOption.value);
        } else {
            onChange("");
        }
    };

    const customStyles = {
        option: (provided: any) => ({
            ...provided,
            color: "black",


        })
    };

    return (
        <Select
            className="gender-select"
            options={genderOptions}
            value={selectedOption}
            onChange={handleChange}
            styles={customStyles}
        />
    );
};
// src/components/MinRatingFilter.tsx
import React from "react";

interface MinRatingFilterProps {
    value: number;
    onChange: (value: number) => void;
}

export function MinRatingFilter({ value, onChange }: MinRatingFilterProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        const num = Number(raw);

        if (Number.isNaN(num)) {
            onChange(0);
        } else {
            const clamped = Math.min(5, Math.max(0, num));
            onChange(clamped);
        }
    };

    return (
        <label style={{ fontSize: "0.9rem", marginLeft: "0.75rem" }}>
            Min rating:&nbsp;
            <input
                type="number"
                min={0}
                max={5}
                step={0.5}
                value={value}
                onChange={handleChange}
                style={{
                    width: "60px",
                    padding: "4px 6px",
                    borderRadius: 4,
                    border: "1px solid #ccc",
                    marginRight: "15px"
                   
                }}
            />
        </label>
    );
}

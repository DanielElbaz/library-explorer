// src/components/SortSelector.tsx
import React from "react";

export type SortOption =
  | "none"
  | "title-asc"
  | "title-desc"
  | "rating-asc"
  | "rating-desc";

interface SortSelectorProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function SortSelector({ value, onChange }: SortSelectorProps) {
  return (
    <select
    style={{padding:"6px",borderRadius:"8px", cursor:"pointer"}}
      value={value}
      onChange={(e) => onChange(e.target.value as SortOption)}
    >
      <option value="none">No sort</option>
      <option value="title-asc">Title A → Z</option>
      <option value="title-desc">Title Z → A</option>
      <option value="rating-desc">Rating High → Low</option>
      <option value="rating-asc">Rating Low → High</option>
    </select>
  );
}

import { Tag } from "../types";

interface TagFilterProps {
    selectedTag: Tag | "all";
    onChange: (tag: Tag | 'all') => void;
    tags: Tag[];
}

export function TagFilter({ selectedTag, onChange, tags }: TagFilterProps) {
    return (
        <select style={{padding:"8px", borderRadius:"8px"}}value={selectedTag} onChange={(e) => {
            onChange(e.target.value === 'all' ? 'all' : (e.target.value as Tag))
        }}>
            <option value='all'> All tags</option>
            {tags.map((tag) => (
                <option key={tag} value={tag}>
                    {tag}
                </option>
            ))}
        </select>
    )
}
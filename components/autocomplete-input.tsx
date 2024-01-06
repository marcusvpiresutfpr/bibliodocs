import React from "react";
import Fuse from "fuse.js";

import { ControllerRenderProps, FieldValues, SetFieldValue, Path } from 'react-hook-form';

type Props<TFieldValues extends FieldValues> = {
  categories: { name: string }[];
  setValue: SetFieldValue<TFieldValues>;
  field: ControllerRenderProps<TFieldValues, any>;
};

export default function AutocompleteInput<TFieldValues extends FieldValues>({
  categories,
  setValue,
  field
}: Props<TFieldValues>) {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [suggestions, setSuggestions] = React.useState<
    { item: { name: string }; score: number }[]
  >([]);

  const fuse = React.useMemo(
    () =>
      new Fuse(categories, {
        keys: ["name"],
        threshold: 0.6,
        includeScore: true,
      }),
    [categories]
  );

  React.useEffect(() => {
    setValue(field.name as Path<TFieldValues>, inputValue);
  }, [inputValue, setValue, field.name]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    const results = fuse.search(value);
    setSuggestions(results as any);
  };

  const handleSuggestionClick = (name: string) => {
    setInputValue(name);
    setSuggestions([]);
  };

  return (
    <div>
      <input
        {...field}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((result, index) => (
            <li key={index} onClick={() => handleSuggestionClick(result.item.name)}>
              {result.item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

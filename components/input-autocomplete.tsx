import React from "react";
import Fuse from "fuse.js";

import {
  ControllerRenderProps,
  FieldValues,
  SetFieldValue,
  Path,
} from "react-hook-form";

type Props<TFieldValues extends FieldValues> = {
  categories: { name: string }[];
  setValue: SetFieldValue<TFieldValues>;
  field: ControllerRenderProps<TFieldValues, any>;
};

export default function AutocompleteInput<TFieldValues extends FieldValues>({
  categories,
  setValue,
  field,
}: Props<TFieldValues>) {
  const [inputValue, setInputValue] = React.useState<string>(field.value);
  const [suggestions, setSuggestions] = React.useState<
    { item: { name: string }; score: number }[]
  >([]);

  const ref = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
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
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  React.useEffect(() => {
    setValue(field.name as Path<TFieldValues>, inputValue);
  }, [inputValue, setValue, field]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    const results = fuse.search(value).splice(0, 5);
    setSuggestions(results as any);
  };

  const handleSuggestionClick = (name: string) => {
    setInputValue(name);
    setSuggestions([]);
  };

  const handleArrowDown = () => {
    const index = getCurrentIndex();
    const nextIndex = index < suggestions.length - 1 ? index + 1 : 0;
    setInputValue(suggestions[nextIndex].item.name);
  };

  const handleArrowUp = () => {
    const index = getCurrentIndex();
    const prevIndex = index > 0 ? index - 1 : suggestions.length - 1;
    setInputValue(suggestions[prevIndex].item.name);
  };

  const getCurrentIndex = () => {
    const index = suggestions.findIndex(
      (suggestion) => suggestion.item.name === inputValue
    );
    return index === -1 ? 0 : index;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length === 0) {
      return;
    }

    switch (e.key) {
      case "Tab":
        setInputValue(suggestions[0].item.name);
        setSuggestions([]);
        break;

      case "ArrowDown":
        e.preventDefault();
        handleArrowDown();
        break;

      case "ArrowUp":
        e.preventDefault();
        handleArrowUp();
        break;

      case "Enter":
        e.preventDefault();
        setSuggestions([]);
        inputRef.current?.blur();
        break;

      // Add more cases as needed

      default:
        break;
    }
  };

  return (
    <div className="relative w-full h-full" ref={ref}>
      <input
        {...field}
        type="text"
        value={inputValue}
        autoComplete="off"
        ref={inputRef}
        className="input input-bordered w-full"
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
      />
      {suggestions.length > 0 && (
        <div className={`relative w-full`}>
          <ul className="w-full absolute menu menu-sm bg-base-300 rounded-box">
            {suggestions.map((result, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(result.item.name)}
              >
                <span
                  className={`${
                    result.item.name === inputValue ? "active" : ""
                  }`}
                >
                  {result.item.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

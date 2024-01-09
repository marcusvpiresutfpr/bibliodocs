import React, { useState, useRef, useEffect, useCallback } from "react";
import Fuse from "fuse.js";

type Props = {
  categories: { name: string }[];
  defaultValue?: string ;
  name: string;
};

export default function CategoryInput({
  defaultValue,
  categories,
  name,
}: Props) {
  const [inputValue, setInputValue] = useState<string>(defaultValue || "");
  const [suggestions, setSuggestions] = useState<{ name: string }[]>([]);
  const ref = useRef<HTMLInputElement>(null);

  const fuse = new Fuse(categories, {
    keys: ["name"],
    // threshold: 0.6,
    // includeScore: true,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node))
        setSuggestions([]);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getCurrentIndex = () => {
    return suggestions.findIndex(
      (suggestion) => suggestion.name === inputValue
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    const results = fuse
      .search(value)
      .splice(0, 5)
      .map((result) => result.item);
    setSuggestions(results);
  };

  const handleSuggestionClick = (name: string) => {
    setInputValue(name);
    setSuggestions([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Tab":
        setInputValue(suggestions[0]?.name || "");
        setSuggestions([]);
        break;

      case "ArrowDown":
        e.preventDefault();
        handleArrow(true);
        break;

      case "ArrowUp":
        e.preventDefault();
        handleArrow(false);
        break;

      case "Enter":
        e.preventDefault();
        setInputValue(suggestions[getCurrentIndex()]?.name || "");
        setSuggestions([]);
        break;

      default:
        break;
    }
  };

  const handleArrow = (isDown: boolean) => {
    const index = getCurrentIndex();
    const nextIndex = isDown
      ? (index + 1) % suggestions.length
      : (index - 1 + suggestions.length) % suggestions.length;
    setInputValue(suggestions[nextIndex]?.name || "");
  };

  return (
    <div className="relative w-full" ref={ref}>
      <input
        className="input input-bordered w-full"
        autoComplete="off"
        type="text"
        name={name}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        value={inputValue}
      />
      {suggestions.length > 0 && (
        <div className="relative w-full">
          <ul className="w-full absolute menu menu-sm bg-base-300 rounded-box">
            {suggestions.map((result, index) => (
              <li
                key={index}
                className={`rounded-lg ${
                  index === getCurrentIndex() ? "bg-base-100" : ""
                }`}
                onClick={() => handleSuggestionClick(result.name)}
              >
                <span>{result.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

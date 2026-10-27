import { useId, useMemo } from "react";
import CommonInput, { type CommonInputProps } from "@/components/common/widgets/CommonInput";

interface UserAutocompleteInputProps extends Omit<CommonInputProps, "value" | "onChange"> {
  value: string;
  userNames: string[];
  onValueChange: (value: string) => void;
}

export default function UserAutocompleteInput({ value, userNames, onValueChange, ...inputProps }: UserAutocompleteInputProps) {
  const suggestionsId = useId();
  const uniqueUserNames = useMemo(
    () => [...new Set(userNames.map((name) => name.trim()).filter(Boolean))],
    [userNames],
  );

  return (
    <div className="min-w-0 w-full">
      <CommonInput
        {...inputProps}
        list={suggestionsId}
        autoComplete="off"
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
      />
      <datalist id={suggestionsId}>
        {uniqueUserNames.map((name) => <option key={name} value={name} />)}
      </datalist>
    </div>
  );
}

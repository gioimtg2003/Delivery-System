import { SelectOptionProps } from "./SelectOptionProps";

const SelectOption = ({
  options,
}: {
  options: SelectOptionProps[];
}): JSX.Element => {
  return (
    <select>
      {options.map((option: SelectOptionProps) => {
        return (
          <option
            value={option.value}
            key={option.value}
            selected={option?.selected}
          >
            {option.label}
          </option>
        );
      })}
    </select>
  );
};

export default SelectOption;

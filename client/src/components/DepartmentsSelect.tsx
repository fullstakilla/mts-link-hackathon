import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface DepartmentsSelectProps {
  selectTitles: { id: string; name: string }[];
  defaultValue: string;
  onSelect: (id: string) => void;
}

export const DepartmentsSelect: React.FC<DepartmentsSelectProps> = ({
  selectTitles,
  defaultValue,
  onSelect,
}) => {
  const handleValueChange = (value: string) => {
    const selectedDepartment = selectTitles.find((dept) => dept.name === value);
    if (selectedDepartment) {
      onSelect(selectedDepartment.id);
    }
  };

  return (
    <Select onValueChange={handleValueChange} defaultValue={defaultValue}>
      <SelectTrigger className="w-48 px-4 py-2 bg-red-500 text-white rounded cursor-pointer">
        <SelectValue placeholder={defaultValue} />
      </SelectTrigger>
      <SelectContent className="w-48  shadow-lg rounded ">
        {selectTitles.map((department) => (
          <SelectItem
            key={department.id}
            value={department.name}
            className="cursor-pointer"
          >
            {department.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

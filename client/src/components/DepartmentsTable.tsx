import React from "react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DepartmentMainPage } from "@/types/departments";
import { useNavigate } from "react-router-dom";

interface DepartmentsTableProps {
  className?: string;
  departments: DepartmentMainPage[];
}

export const DepartmentsTable: React.FC<DepartmentsTableProps> = ({
  className,
  departments,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className={cn(
        "w-[100%] flex justify-center bg-card rounded-md shadow-md border border-muted-foreground",
        className
      )}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Департамент</TableHead>
            <TableHead>Количество команд</TableHead>
            <TableHead>Количество сотрудников</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {departments.length ? (
            departments.map((department) => (
              <TableRow
                key={department.id}
                onClick={() => navigate(`/department/${department.id}`)}
              >
                <TableCell className="cursor-pointer text-foreground hover:bg-red-500 hover:text-white transition duration-300">
                  {department.name}
                </TableCell>
                <TableCell className="cursor-pointer text-foreground hover:bg-red-500 hover:text-white transition duration-300">
                  {department.teamsCount}
                </TableCell>
                <TableCell className="cursor-pointer text-foreground hover:bg-red-500 hover:text-white transition duration-300">
                  {department.employeesCount}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center">
                Нет результатов.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

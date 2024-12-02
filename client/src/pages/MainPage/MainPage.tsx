import React, { useCallback, useEffect, useState } from "react";
import { DepartmentsTable } from "@/components/DepartmentsTable";
import { DepartmentsSelect } from "@/components/DepartmentsSelect";
import Spinner from "@/components/ui/spinner";
import DepartmentService from "@/services/department-service";
import { DepartmentMainPage } from "@/types/departments";

const MainPage: React.FC = () => {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [departments, setDepartments] = useState<DepartmentMainPage[] | null>();
  const [filteredDepartments, setFilteredDepartments] = useState<
    DepartmentMainPage[] | null
  >();

  useEffect(() => {
    const fetchDepartment = async () => {
      setStatus("loading");

      try {
        const { data } = await DepartmentService.getAllDepartments();
        setDepartments(data);
        setFilteredDepartments(data);
        setStatus("success");
      } catch (error) {
        console.error(error);
        setStatus("error");
      }
    };

    fetchDepartment();
  }, []);

  const handleSelect = useCallback(
    (id: string) => {
      const filterDepartments = (name: string) => {
        if (name === "Все") {
          setFilteredDepartments(departments);
        } else {
          setFilteredDepartments(
            departments?.filter((dept) => dept.name === name) || []
          );
        }
      };

      const selectedName =
        id === "0" ? "Все" : departments?.find((d) => d.id === id)?.name;
      if (selectedName) filterDepartments(selectedName);
    },
    [departments]
  );

  const selectTitles = [
    { id: "0", name: "Все" },
    ...(departments?.map((dept) => ({
      id: dept.id,
      name: dept.name,
    })) || []),
  ];

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "error") {
    return <div>Произошла ошибка.</div>;
  }

  return (
    <div className="flex justify-center items-center flex-col py-20 container min-h-[699px] max-w-[1310px] px-[15px] w-full mx-auto h-full">
      <h1 className="text-3xl font-bold text-foreground">
        Список всех департаментов
      </h1>

      <div className="flex justify-between w-[100%] mb-[50px] mt-14">
        <DepartmentsSelect
          selectTitles={selectTitles}
          defaultValue="Все"
          onSelect={(id) => handleSelect(id)}
        />
      </div>

      <DepartmentsTable departments={filteredDepartments || []} />
    </div>
  );
};

export default MainPage;

import OrgChart from "@/components/OrgChart";
import Spinner from "@/components/ui/spinner";
import DepartmentService from "@/services/department-service";
import { Department } from "@/types/departments";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DepartmentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [department, setDepartment] = useState<Department | null>(null);

  useEffect(() => {
    const fetchDepartment = async () => {
      if (!id) return;

      setStatus("loading");

      try {
        const { data } = await DepartmentService.getOneDepartmentById(id);
        console.log(data);
        setDepartment(data);
        setStatus("success");
      } catch (error) {
        console.error(error);
        setStatus("error");
      }
    };

    fetchDepartment();
  }, [id]);

  useEffect(() => {
    const preventScroll = (e: WheelEvent) => {
      e.preventDefault();
    };

    document.addEventListener("wheel", preventScroll, { passive: false });

    // Убираем обработчик при размонтировании
    return () => {
      document.removeEventListener("wheel", preventScroll);
    };
  }, []);

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "error") {
    return <div>Произошла ошибка.</div>;
  }

  return (
    <div className=" overflow-y-hidden">
      {status === "success" && department ? (
        <OrgChart department={department} />
      ) : (
        <div className="text-center">Нет информации о департаменте.</div>
      )}
    </div>
  );
};

export default DepartmentPage;

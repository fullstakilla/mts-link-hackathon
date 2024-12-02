import TeamInfo from "@/components/TeamInfo";
import Spinner from "@/components/ui/spinner";
import DepartmentService from "@/services/department-service";
import { OneTeam } from "@/types/departments";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function TeamPage() {
  const { id } = useParams<{ id: string }>();
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [team, setTeam] = useState<OneTeam | null>(null);

  useEffect(() => {
    const fetchTeam = async () => {
      if (!id) return;

      setStatus("loading");

      try {
        const { data } = await DepartmentService.getOneTeamById(id);
        console.log(data);
        setTeam(data);
        setStatus("success");
      } catch (error) {
        console.error(error);
        setStatus("error");
      }
    };

    fetchTeam();
  }, [id]);

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "error") {
    return <div>Произошла ошибка.</div>;
  }

  return (
    <div className=" min-h-[699px] items-center flex justify-center">
      {status === "success" && team ? (
        <>
          <TeamInfo team={team} />
        </>
      ) : (
        <div className="text-center">Нет информации о данной команде.</div>
      )}
    </div>
  );
}

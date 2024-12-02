import { EditProfileModal } from "@/components/EditProfileModal";
import MemberInfo from "@/components/MemberInfo";
import Spinner from "@/components/ui/spinner";
import DepartmentService from "@/services/department-service";
import useUserStore from "@/store/user-store";
import { Member } from "@/types/departments";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const MemberPage: React.FC = () => {
  const { user } = useUserStore();
  const { id } = useParams<{ id: string }>();
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [member, setMember] = useState<Member | null>(null);

  useEffect(() => {
    const fetchDepartment = async () => {
      if (!id) return;

      setStatus("loading");

      try {
        const { data } = await DepartmentService.getOneMemberById(id);
        setMember(data);
        setStatus("success");
      } catch (error) {
        console.error(error);
        setStatus("error");
      }
    };

    fetchDepartment();
  }, [id]);

  const handleMemberUpdate = (updatedMember: Member) => {
    setMember(updatedMember);
  };

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "error") {
    return <div>Произошла ошибка.</div>;
  }

  return (
    <div className="py-10 px-2 flex items-center justify-center  min-h-[699px]">
      {status === "success" && member ? (
        <div>
          <h1 className="text-2xl text-foreground font-bold mb-5">
            Информация о Пользователе
          </h1>
          <Link
            to={`/department/${member.team.departmentID}`}
            className="underline text-foreground flex gap-4 mb-2 items-center "
          >
            <ArrowLeft size={15} /> Вернуться к департаменту
          </Link>
          <Link
            to={`/teams/${member.team.id}`}
            className="underline text-foreground flex gap-4 mb-10 items-center "
          >
            <ArrowLeft size={15} /> Вернуться к команде
          </Link>
          <MemberInfo member={member} />
          {user?.id === id && (
            <EditProfileModal member={member} onSave={handleMemberUpdate} />
          )}
        </div>
      ) : (
        <div className="text-center ">Нет информации о данном участнике.</div>
      )}
    </div>
  );
};

export default MemberPage;

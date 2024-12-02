import { Member } from "@/types/departments";
import { Link } from "react-router-dom";

export default function MemberInfo({ member }: { member: Member }) {
  console.log(member);
  return (
    <div className="w-full max-w-4xl mx-auto bg-card border border-muted-foreground shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          {member.fullname}
        </h2>
        <p className="text-lg text-gray-600 mb-2">
          <span className="font-medium">Роль:</span> {member.role}
        </p>
        <p className="text-lg text-gray-600 mb-2">
          <span className="font-medium">Возраст:</span> {member.age}
        </p>
        <p className="text-lg text-gray-600 mb-2">
          <span className="font-medium">Департамент:</span>{" "}
          <Link
            to={`/department/${member.team.departmentID}`}
            className="underline"
          >
            {member.team.departmentName}
          </Link>
        </p>
        <p className="text-lg text-gray-600 mb-2">
          <span className="font-medium">Команда:</span>{" "}
          <Link to={`/teams/${member.teamID}`} className="underline">
            {member.team.name}
          </Link>
        </p>

        <p className="text-lg text-gray-600 mb-2">
          <span className="font-medium">Email:</span> {member.email}
        </p>
        <ul className="flex gap-1 flex-wrap">
          {member.details?.map((detail) => (
            <li className="bg-red-500 text-white p-1 cursor-pointer">
              {detail.Value}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 p-6 flex flex-col items-center justify-center bg-card border-l border-muted-foreground">
        <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-gray-200 mb-4">
          <img
            src={member.photoURL || "/pfp.png"}
            alt={`${member.fullname}'s photo`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center">
          <p className="text-lg text-gray-600">
            <span className="font-medium">ID Пользователя:</span> {member.id}
          </p>
          <p className="text-lg text-gray-600">
            <span className="font-medium">ID Команды:</span> {member.teamID}
          </p>
        </div>
      </div>
    </div>
  );
}

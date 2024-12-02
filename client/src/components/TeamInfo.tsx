import { OneTeam } from "@/types/departments";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
} from "@/components/ui/table";

interface TeamInfoProps {
    team: OneTeam;
}

export default function TeamInfo({ team }: TeamInfoProps) {
    const { members } = team;
    const memberRoles = members.members.map((m) => m.role);

    const roleCounts = memberRoles.reduce(
        (acc: Record<string, number>, role) => {
            acc[role] = (acc[role] || 0) + 1;
            return acc;
        },
        {}
    );

    const chartData = Object.keys(roleCounts).map((role) => ({
        role,
        Количество: roleCounts[role],
    }));

    return (
        <div className="px-6 pt-2 pb-6">
            <Link
                to={`/department/${team.departmentID}`}
                className="underline flex gap-4 mb-10 items-center text-foreground "
            >
                <ArrowLeft size={15} /> Вернуться к департаменту
            </Link>
            <h1 className="text-2xl font-bold mb-5">{team.departmentName}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                <div className="bg-card shadow-md rounded-lg p-4 border border-muted-foreground">
                    <h2 className="text-xl font-semibold mb-2 text-foreground">
                        Аналитика участников
                    </h2>
                    <BarChart
                        width={500}
                        height={300}
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="role" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Количество" fill="#ef4444" />
                    </BarChart>
                </div>

                <div className="bg-card shadow-md rounded-lg p-4 border border-muted-foreground">
                    <h2 className="text-xl text-foreground font-semibold mb-2">
                        Список участников
                    </h2>
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                                <TableCell className="text-foreground">
                                    Имя
                                </TableCell>
                                <TableCell className="text-foreground">
                                    Роль
                                </TableCell>
                                <TableCell className="text-foreground">
                                    Детали
                                </TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {members.members.map((m) => (
                                <TableRow key={m.id}>
                                    <TableCell className="text-foreground">
                                        {m.fullname}
                                    </TableCell>
                                    <TableCell className="text-foreground">
                                        {m.role}
                                    </TableCell>
                                    <TableCell>
                                        <Link
                                            to={`/member/${m.id}`}
                                            className="text-[#ef4444] hover:underline"
                                        >
                                            Подробнее
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

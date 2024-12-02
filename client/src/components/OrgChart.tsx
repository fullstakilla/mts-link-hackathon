import React from "react";
import ReactFlow, { Background, Node, Edge } from "reactflow";
import "reactflow/dist/style.css";
import DepartmentNode from "./nodes/DepartmentNode";
import TeamNode from "./nodes/TeamNode";
import MemberNode from "./nodes/MemberNode";
import { Department } from "@/types/departments";

interface OrgChartProps {
    department: Department;
}

const OrgChart: React.FC<OrgChartProps> = ({ department }) => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    const rootNodeX = 300;
    const rootNodeY = 50;
    const horizontalSpacing = 300;
    const verticalSpacing = 150;

    // Узел для департамента
    nodes.push({
        id: department.departmentID,
        data: { label: <DepartmentNode name={department.departmentName} /> },
        position: { x: rootNodeX, y: rootNodeY },
    });

    // Узлы для команд и участников
    department.teams.forEach((team, teamIndex) => {
        const teamNodeX =
            rootNodeX +
            (teamIndex - department.teams.length / 2) * horizontalSpacing;
        const teamNodeY = rootNodeY + verticalSpacing;

        // Узел команды
        nodes.push({
            id: team.id,
            data: { label: <TeamNode name={team.name} id={team.id} /> },
            position: { x: teamNodeX, y: teamNodeY },
        });

        edges.push({
            id: `edge-${department.departmentID}-${team.id}`,
            source: department.departmentID,
            target: team.id,
        });

        // Узлы для участников команды
        team.members.forEach((member, memberIndex) => {
            const memberNodeX = teamNodeX;
            const memberNodeY = teamNodeY + verticalSpacing + memberIndex * 120;

            nodes.push({
                id: member.id,
                data: {
                    label: (
                        <MemberNode
                            name={member.fullname}
                            role={member.role}
                            id={member.id}
                        />
                    ),
                },
                position: { x: memberNodeX, y: memberNodeY },
            });

            edges.push({
                id: `edge-${team.id}-${member.id}`,
                source: team.id,
                target: member.id,
            });
        });
    });

    return (
        <div style={{ width: "100%", height: "100vh" }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                fitView
                panOnDrag={true}
                zoomOnScroll={true}
                nodesDraggable={true}
                nodesConnectable={false}
            >
                <Background />
            </ReactFlow>
        </div>
    );
};

export default OrgChart;

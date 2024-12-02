import { ArrowRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

interface TeamNodeProps {
    name: string;
    id: string;
}

const TeamNode: React.FC<TeamNodeProps> = ({ name, id }) => {
    const navigate = useNavigate();
    return (
        <div
            className="bg-[#90EE90] p-2 w-[200px] rounded-md text-center text-lg flex items-center justify-center cursor-pointer hover:bg-[#b1f4b1]"
            onClick={() => navigate(`/teams/${id}`)}
        >
            {name}
            <ArrowRight size={20} />
        </div>
    );
};

export default TeamNode;

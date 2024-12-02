import { ArrowRight } from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useNavigate } from "react-router-dom";

interface MemberNodeProps {
    name: string;
    role: string;
    id: string;
}

const MemberNode: React.FC<MemberNodeProps> = ({ name, role, id }) => {
    const navigate = useNavigate();
    return (
        <div
            className="w-[200px] bg-[#ADD8E6] p-2 rounded-md text-center flex justify-between items-center hover:bg-[#d0e8f0] hover:cursor-pointer"
            onClick={() => navigate(`/member/${id}`)}
        >
            <div className="text-left flex items-center gap-2">
                <Avatar>
                    <AvatarImage src="/pfp.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                    <strong>{name}</strong>
                    <div>{role}</div>
                </div>
            </div>
            <ArrowRight size={20} />
        </div>
    );
};

export default MemberNode;

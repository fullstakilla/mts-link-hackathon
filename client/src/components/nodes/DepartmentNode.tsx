import React from "react";

interface DepartmentNodeProps {
    name: string;
}

const DepartmentNode: React.FC<DepartmentNodeProps> = ({ name }) => {
    return (
        <div className="bg-[#ef4444] p-2 rounded-md w-[300px] flex text-center items-center justify-center text-xl">
            {name}
        </div>
    );
};

export default DepartmentNode;

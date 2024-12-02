import { Loader2 } from "lucide-react";

export default function Spinner() {
    return (
        <div className="h-[calc(100vh-140px)] w-full flex justify-center items-center">
            <Loader2 className="animate-spin text-primary" size={48} />
        </div>
    );
}

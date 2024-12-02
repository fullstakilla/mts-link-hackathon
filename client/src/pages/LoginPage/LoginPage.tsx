import React from "react";
import clsx from "clsx";
import LoginForm from "@/components/forms/LoginForm";

interface LoginPageProps {
    className?: string;
}

const LoginPage: React.FC<LoginPageProps> = ({ className }) => {
    return (
        <div className={clsx(className, "flex justify-center pt-44")}>
            <LoginForm />
        </div>
    );
};

export default LoginPage;

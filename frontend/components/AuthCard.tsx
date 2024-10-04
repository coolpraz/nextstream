import React from "react";

interface AuthCardProps {
    title: string;
    description: React.ReactNode;
    children: React.ReactNode;
}

const AuthCard = ({
    title,
    description,
    children,
}: AuthCardProps) => (
    <>
        <div className="flex flex-col mb-2 space-y-2 text-left">
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        {children}
    </>
);

export default AuthCard;

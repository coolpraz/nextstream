"use client";

import React, { InputHTMLAttributes, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

interface PasswordInputProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    className?: string;
}

const PasswordInput = ({ className, ...props }: PasswordInputProps) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="relative rounded-md">
            <Input
                type={showPassword ? "text" : "password"}
                className={className}
                {...props}
            />
            <Button
                type="button"
                size="icon"
                variant="ghost"
                className="absolute w-6 h-6 -translate-y-1/2 rounded-md right-1 top-1/2 text-muted-foreground"
                onClick={() => setShowPassword((prev) => !prev)}
            >
                {showPassword ? (
                    <IconEye size={18} />
                ) : (
                    <IconEyeOff size={18} />
                )}
                {/* <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                </span> */}
            </Button>
        </div>
    );
};

export default PasswordInput;

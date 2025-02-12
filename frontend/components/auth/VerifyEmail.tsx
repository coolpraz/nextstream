"use client";

import { sendVerificationEmail, verifyAction } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { useActionState, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const VerifyEmail = () => {
    const router = useRouter();
    const [code, setCode] = useState<string[]>(Array(6).fill(""));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const initialVerifyState: VerifyState = {
        error: {},
        success: false,
    };

    const [verifyState, verifyFormAction, isPendingVerify] = useActionState(
        verifyAction,
        initialVerifyState
    );

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) {
            value = value[0];
        }

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Move to next input if value is entered
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <form action={verifyFormAction} className="space-y-8">
            <div className="flex justify-center gap-2">
                {code.map((digit, index) => (
                    <Input
                        key={index}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        ref={(el) => (inputRefs.current[index] = el)}
                        name={`code-${index}`}
                        disabled={isPendingVerify}
                        className="w-12 h-12 text-center text-white bg-[#2c2c2e]/50 border-2 border-gray-600 rounded-lg focus:border-[#4dabf7] focus:ring-0 text-xl disabled:opacity-50"
                    />
                ))}
            </div>
            {verifyState.error?.data && (
                <p className="flex justify-center text-xs text-red-500">{verifyState.error.data}</p>
            )}

            <Button
                type="button"
                onClick={sendVerificationEmail}
                variant="ghost"
                disabled={isPendingVerify}
                className="w-full text-[#0A84FF] hover:text-[#409CFF] text-[15px] transition-colors disabled:opacity-50 h-auto p-0 hover:bg-transparent"
            >
                Send a new code
            </Button>

            <div className="flex justify-between gap-4">
                <Button
                    type="button"
                    onClick={() => router.back()}
                    variant="outline"
                    disabled={isPendingVerify}
                    className="flex-1 border-[#4dabf7] text-[#4dabf7] hover:bg-[#4dabf7]/10 disabled:opacity-50"
                >
                    Go Back
                </Button>
                <Button
                    type="submit"
                    className="flex-1 bg-[#4dabf7] hover:bg-[#3b8fd7] text-white disabled:opacity-50"
                    disabled={code.join("").length !== 6 || isPendingVerify}
                >
                    {isPendingVerify ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : null}
                    Continue
                </Button>
            </div>
        </form>
    );
};

export default VerifyEmail;

"use client";

import { validateAction } from "@/actions/auth";
import { notFound } from "next/navigation";
import { useActionState, useEffect } from "react";

const ValidateEmail = ({
    params,
    searchParams,
}: {
    params: { id: string; token: string };
    searchParams: { expires: string; signature: string };
}) => {
    const [, action] = useActionState(validateAction, null);

    const handleValidation = () => {
        if (
            params.id &&
            params.token &&
            searchParams.expires &&
            searchParams.signature
        ) {
            const formData = new FormData();
            formData.append("id", params.id);
            formData.append("token", params.token);
            formData.append("expires", searchParams.expires);
            formData.append("signature", searchParams.signature);
            action(formData);
        }
    };

    useEffect(() => {
        handleValidation();
    }, [params.id, params.token, searchParams.expires, searchParams.signature]);

    // Validate the params and searchParams here
    if (
        !params.id ||
        !params.token ||
        !searchParams.expires ||
        !searchParams.signature
    ) {
        notFound();
    }

    return null;
};

export default ValidateEmail;

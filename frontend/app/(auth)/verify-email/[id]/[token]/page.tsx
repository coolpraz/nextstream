"use client";

import { validateAction } from "@/actions/auth";
import { notFound } from "next/navigation";
import { useActionState, useEffect, use } from "react";

const ValidateEmail = (
    props: {
        params: Promise<{ id: string; token: string }>;
        searchParams: Promise<{ expires: string; signature: string }>;
    }
) => {
    const searchParams = use(props.searchParams);
    const params = use(props.params);
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

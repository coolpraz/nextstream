type LoginInitialState = {
    data?: {
        email?: string | null;
        password?: string | null;
    };
    error?: {
        message?: string;
        data?: any;
    };
    success: boolean
}

type RegisterInitialState = {
    data?: {
        name?: string | null;
        email?: string | null;
        password?: string | null;
        passwordConfirmation?: string | null;
    };
    error?: {
        message?: string;
        data?: any;
    };
    success: boolean;
};

type ForgotPasswordInitialState = {
    data?: {
        email?: string | null;
        status?: string | null;
    };
    error?: {
        message?: string;
        data?: any;
    };
};

type ResetPasswordInitialState = {
    data?: {
        email?: string | null;
        password?: string | null;
        passwordConfirmation?: string | null;
    };
    error?: {
        message?: string;
        data?: any;
    };
    success: boolean;
};

type VerificationState = {
    status: string | null;
    error?: {
        message?: string | null
    }
}

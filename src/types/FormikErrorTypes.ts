export type LoginErrorType = {
    email?: string;
    password?: string;
};

export type RegisterErrorType = {
    user_name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
};

export type ReviewErrorType = {
    review_title?: string;
    title?: string;
    category?: string;
    body?: string;
    assessment?: string;
};

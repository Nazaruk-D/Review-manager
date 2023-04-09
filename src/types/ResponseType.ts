export type ResponseType<D = {}> = {
    code: number;
    message: string;
    data: D;
};

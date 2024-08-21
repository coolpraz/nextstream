export class CustomError extends Error {
    data: any;

    constructor(message: string, data: any) {
        super(message);
        this.name = "CustomError";
        this.data = data;
    }
}

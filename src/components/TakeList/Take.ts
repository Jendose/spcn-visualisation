export enum TakeStatus {
    WAIT,
    OK,
    LOST
}

export type Take = {
    date: string;
    status: TakeStatus;
    taken: boolean;
}
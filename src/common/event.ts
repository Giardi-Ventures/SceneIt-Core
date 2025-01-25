export const EventType = {
    account: {
        created: "account.created",
        updated: "account.updated",
        login: "account.login",
    },
};

export interface Event {
    id: string;
    reqId?: string;
    objectId: string;

    accountId: string;

    type: string; // account.updated

    object: object; // new object
    objectDiff: object; // changed {added: {}, removed: {}, changed: {}}

    created: Date;
}

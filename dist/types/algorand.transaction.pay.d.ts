/// <reference types="node" />
export declare class PayTransaction {
    type: string;
    snd: Uint8Array;
    rcv: Uint8Array;
    amt: number;
    fee: number;
    fv: number;
    lv: number;
    note?: Uint8Array;
    gen: string;
    gh: Uint8Array;
    encode(): Uint8Array;
}
export interface IPayTxBuilder {
    addSender(sender: string): IPayTxBuilder;
    addReceiver(receiver: string): IPayTxBuilder;
    addAmount(amount: number): IPayTxBuilder;
    addFee(fee: number): IPayTxBuilder;
    addFirstValidRound(firstValid: number): IPayTxBuilder;
    addLastValidRound(lastValid: number): IPayTxBuilder;
    addNote(note: string, encoding?: BufferEncoding): IPayTxBuilder;
    get(): PayTransaction;
}
export declare class PayTxBuilder implements IPayTxBuilder {
    private tx;
    constructor(genesisId: string, genesisHash: string);
    addSender(sender: string): IPayTxBuilder;
    addReceiver(receiver: string): IPayTxBuilder;
    addAmount(amount: number): IPayTxBuilder;
    addFee(fee: number): IPayTxBuilder;
    addFirstValidRound(firstValid: number): IPayTxBuilder;
    addLastValidRound(lastValid: number): IPayTxBuilder;
    addNote(note: string, encoding?: BufferEncoding): IPayTxBuilder;
    get(): PayTransaction;
}

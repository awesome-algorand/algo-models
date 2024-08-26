/// <reference types="node" />
export declare abstract class Encoder {
    constructor();
    abstract decodeAddress(address: string): Uint8Array;
    abstract encodeAddress(publicKey: Buffer): string;
    abstract encodeSignedTransaction(txn: object): Uint8Array;
    abstract decodeSignedTransaction(encoded: Uint8Array): object | Error;
    abstract encodeTransaction(tx: any): Uint8Array;
    abstract decodeTransaction(encoded: Uint8Array): object | Error;
    /**
     *
     * @param publicKey
     */
    /**
     *
     * @param arrs
     * @returns
     */
    static ConcatArrays(...arrs: ArrayLike<number>[]): Uint8Array;
}

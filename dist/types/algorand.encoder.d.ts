/// <reference types="node" />
import { Encoder } from "./encoder.role.js";
export declare const MALFORMED_ADDRESS_ERROR_MSG = "Malformed address";
export declare const ALGORAND_ADDRESS_BAD_CHECKSUM_ERROR_MSG = "Bad checksum";
export declare class AlgorandEncoder extends Encoder {
    /**
     * decodeAddress takes an Algorand address in string form and decodes it into a Uint8Array.
     * @param address - an Algorand address with checksum.
     * @returns the decoded form of the address's public key and checksum
     */
    decodeAddress(address: string): Uint8Array;
    /**
     *
     */
    encodeAddress(publicKey: Buffer): string;
    /**
     *
     * @param stx
     * @returns
     */
    encodeSignedTransaction(stx: object): Uint8Array;
    /**
     *
     * @param tx
     */
    encodeTransaction(tx: any): Uint8Array;
    /**
     *
     * @param encoded
     * @returns
     */
    decodeTransaction(encoded: Uint8Array): object | Error;
    /**
     *
     * @param encoded
     * @returns
     */
    decodeSignedTransaction(encoded: Uint8Array): object | Error;
}

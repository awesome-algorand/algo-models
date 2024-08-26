import { Crafter } from "./crafter.role.js";
import { type IPayTxBuilder } from "./algorand.transaction.pay.js";
import { type IKeyregTxBuilder } from "./algorand.transaction.keyreg.js";
export declare class AlgorandTransactionCrafter extends Crafter {
    private readonly genesisId;
    private readonly genesisHash;
    constructor(genesisId: string, genesisHash: string);
    /**
     *
     * @param amount
     * @param from
     * @param to
     * @returns
     */
    pay(amount: number, from: string, to: string): IPayTxBuilder;
    /**
     *
     * @param from
     * @param voteKey
     * @param selectionKey
     * @param stateProofKey
     * @param voteFirst
     * @param voteLast
     * @param voteKeyDilution
     * @returns
     */
    changeOnline(from: string, voteKey: string, selectionKey: string, stateProofKey: string, voteFirst: number, voteLast: number, voteKeyDilution: number): IKeyregTxBuilder;
    /**
     *
     * @param from
     * @returns
     */
    changeOffline(from: string): IKeyregTxBuilder;
    /**
     *
     * @param from
     * @returns
     */
    markNonParticipation(from: string): IKeyregTxBuilder;
    /**
     *
     * @param encodedTransaction
     * @param signature
     * @returns
     */
    addSignature(encodedTransaction: Uint8Array, signature: Uint8Array): Uint8Array;
}

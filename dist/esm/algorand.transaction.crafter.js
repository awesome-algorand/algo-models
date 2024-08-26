import { Crafter } from "./crafter.role.js";
import { AlgorandEncoder } from "./algorand.encoder.js";
import { PayTxBuilder } from "./algorand.transaction.pay.js";
import { KeyregTxBuilder } from "./algorand.transaction.keyreg.js";
import * as msgpack from "algo-msgpack-with-bigint";
export class AlgorandTransactionCrafter extends Crafter {
    genesisId;
    genesisHash;
    constructor(genesisId, genesisHash) {
        super();
        this.genesisId = genesisId;
        this.genesisHash = genesisHash;
    }
    /**
     *
     * @param amount
     * @param from
     * @param to
     * @returns
     */
    pay(amount, from, to) {
        return new PayTxBuilder(this.genesisId, this.genesisHash).addAmount(amount).addSender(from).addReceiver(to);
    }
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
    changeOnline(from, voteKey, selectionKey, stateProofKey, voteFirst, voteLast, voteKeyDilution) {
        return new KeyregTxBuilder(this.genesisHash)
            .addSender(from)
            .addVoteKey(voteKey)
            .addSelectionKey(selectionKey)
            .addStateProofKey(stateProofKey)
            .addVoteFirst(voteFirst)
            .addVoteLast(voteLast)
            .addVoteKeyDilution(voteKeyDilution);
    }
    /**
     *
     * @param from
     * @returns
     */
    changeOffline(from) {
        return new KeyregTxBuilder(this.genesisHash)
            .addSender(from);
    }
    /**
     *
     * @param from
     * @returns
     */
    markNonParticipation(from) {
        return new KeyregTxBuilder(this.genesisHash)
            .addSender(from)
            .addNonParticipation(true);
    }
    /**
     *
     * @param encodedTransaction
     * @param signature
     * @returns
     */
    addSignature(encodedTransaction, signature) {
        // remove TAG prefix
        const txObj = new AlgorandEncoder().decodeTransaction(encodedTransaction);
        const signedTx = {
            sig: signature,
            txn: txObj,
        };
        // Encode without TAG
        return msgpack.encode(signedTx, { sortKeys: true });
    }
}
//# sourceMappingURL=algorand.transaction.crafter.js.map
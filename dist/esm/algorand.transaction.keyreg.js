import { AlgorandEncoder } from "./algorand.encoder.js";
export class KeyregTransaction {
    type;
    snd;
    fee;
    fv;
    lv;
    note;
    votekey;
    selkey;
    sprfkey;
    votefst;
    votelst;
    votekd;
    nonpart;
    gen;
    gh;
    // encode the transaction
    // return the encoded transaction
    encode() {
        const encoded = new AlgorandEncoder().encodeTransaction(this);
        return encoded;
    }
}
export class KeyregTxBuilder {
    tx;
    constructor(genesisHash) {
        this.tx = new KeyregTransaction();
        //this.tx.gen = genesisId
        this.tx.gh = new Uint8Array(Buffer.from(genesisHash, "base64"));
        this.tx.type = "keyreg";
        this.tx.fee = 1000;
    }
    addSender(sender) {
        this.tx.snd = new AlgorandEncoder().decodeAddress(sender);
        return this;
    }
    addFee(fee) {
        this.tx.fee = fee;
        return this;
    }
    addFirstValidRound(firstValid) {
        this.tx.fv = firstValid;
        return this;
    }
    addLastValidRound(lastValid) {
        this.tx.lv = lastValid;
        return this;
    }
    addNote(note, encoding = "base64") {
        this.tx.note = new Uint8Array(Buffer.from(note, encoding));
        return this;
    }
    addVoteKey(voteKey, encoding = "base64") {
        this.tx.votekey = new Uint8Array(Buffer.from(voteKey, encoding));
        return this;
    }
    addSelectionKey(selectionKey, encoding = "base64") {
        this.tx.selkey = new Uint8Array(Buffer.from(selectionKey, encoding));
        return this;
    }
    addStateProofKey(stateProofKey, encoding = "base64") {
        this.tx.sprfkey = new Uint8Array(Buffer.from(stateProofKey, encoding));
        return this;
    }
    addVoteFirst(voteFirst) {
        this.tx.votefst = voteFirst;
        return this;
    }
    addVoteLast(voteLast) {
        this.tx.votelst = voteLast;
        return this;
    }
    addVoteKeyDilution(voteKeyDilution) {
        this.tx.votekd = voteKeyDilution;
        return this;
    }
    addNonParticipation(nonParticipation) {
        this.tx.nonpart = nonParticipation;
        return this;
    }
    get() {
        return this.tx;
    }
}
//# sourceMappingURL=algorand.transaction.keyreg.js.map
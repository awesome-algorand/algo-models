import { AlgorandEncoder } from "./algorand.encoder.js";
export class PayTransaction {
    type;
    snd;
    rcv;
    amt;
    fee;
    fv;
    lv;
    note;
    gen;
    gh;
    // encode the transaction
    // return the encoded transaction
    encode() {
        const encoded = new AlgorandEncoder().encodeTransaction(this);
        return encoded;
    }
}
export class PayTxBuilder {
    tx;
    constructor(genesisId, genesisHash) {
        this.tx = new PayTransaction();
        this.tx.gen = genesisId;
        this.tx.gh = new Uint8Array(Buffer.from(genesisHash, "base64"));
        this.tx.type = "pay";
        this.tx.fee = 1000;
    }
    addSender(sender) {
        this.tx.snd = new AlgorandEncoder().decodeAddress(sender);
        return this;
    }
    addReceiver(receiver) {
        this.tx.rcv = new AlgorandEncoder().decodeAddress(receiver);
        return this;
    }
    addAmount(amount) {
        this.tx.amt = amount;
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
    addNote(note, encoding = "utf8") {
        this.tx.note = new Uint8Array(Buffer.from(note, encoding));
        return this;
    }
    get() {
        return this.tx;
    }
}
//# sourceMappingURL=algorand.transaction.pay.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayTxBuilder = exports.PayTransaction = void 0;
var algorand_encoder_js_1 = require("./algorand.encoder.js");
var PayTransaction = /** @class */ (function () {
    function PayTransaction() {
    }
    // encode the transaction
    // return the encoded transaction
    PayTransaction.prototype.encode = function () {
        var encoded = new algorand_encoder_js_1.AlgorandEncoder().encodeTransaction(this);
        return encoded;
    };
    return PayTransaction;
}());
exports.PayTransaction = PayTransaction;
var PayTxBuilder = /** @class */ (function () {
    function PayTxBuilder(genesisId, genesisHash) {
        this.tx = new PayTransaction();
        this.tx.gen = genesisId;
        this.tx.gh = new Uint8Array(Buffer.from(genesisHash, "base64"));
        this.tx.type = "pay";
        this.tx.fee = 1000;
    }
    PayTxBuilder.prototype.addSender = function (sender) {
        this.tx.snd = new algorand_encoder_js_1.AlgorandEncoder().decodeAddress(sender);
        return this;
    };
    PayTxBuilder.prototype.addReceiver = function (receiver) {
        this.tx.rcv = new algorand_encoder_js_1.AlgorandEncoder().decodeAddress(receiver);
        return this;
    };
    PayTxBuilder.prototype.addAmount = function (amount) {
        this.tx.amt = amount;
        return this;
    };
    PayTxBuilder.prototype.addFee = function (fee) {
        this.tx.fee = fee;
        return this;
    };
    PayTxBuilder.prototype.addFirstValidRound = function (firstValid) {
        this.tx.fv = firstValid;
        return this;
    };
    PayTxBuilder.prototype.addLastValidRound = function (lastValid) {
        this.tx.lv = lastValid;
        return this;
    };
    PayTxBuilder.prototype.addNote = function (note, encoding) {
        if (encoding === void 0) { encoding = "utf8"; }
        this.tx.note = new Uint8Array(Buffer.from(note, encoding));
        return this;
    };
    PayTxBuilder.prototype.get = function () {
        return this.tx;
    };
    return PayTxBuilder;
}());
exports.PayTxBuilder = PayTxBuilder;
//# sourceMappingURL=algorand.transaction.pay.js.map
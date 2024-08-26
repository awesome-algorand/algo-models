"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyregTxBuilder = exports.KeyregTransaction = void 0;
var algorand_encoder_js_1 = require("./algorand.encoder.js");
var KeyregTransaction = /** @class */ (function () {
    function KeyregTransaction() {
    }
    // encode the transaction
    // return the encoded transaction
    KeyregTransaction.prototype.encode = function () {
        var encoded = new algorand_encoder_js_1.AlgorandEncoder().encodeTransaction(this);
        return encoded;
    };
    return KeyregTransaction;
}());
exports.KeyregTransaction = KeyregTransaction;
var KeyregTxBuilder = /** @class */ (function () {
    function KeyregTxBuilder(genesisHash) {
        this.tx = new KeyregTransaction();
        //this.tx.gen = genesisId
        this.tx.gh = new Uint8Array(Buffer.from(genesisHash, "base64"));
        this.tx.type = "keyreg";
        this.tx.fee = 1000;
    }
    KeyregTxBuilder.prototype.addSender = function (sender) {
        this.tx.snd = new algorand_encoder_js_1.AlgorandEncoder().decodeAddress(sender);
        return this;
    };
    KeyregTxBuilder.prototype.addFee = function (fee) {
        this.tx.fee = fee;
        return this;
    };
    KeyregTxBuilder.prototype.addFirstValidRound = function (firstValid) {
        this.tx.fv = firstValid;
        return this;
    };
    KeyregTxBuilder.prototype.addLastValidRound = function (lastValid) {
        this.tx.lv = lastValid;
        return this;
    };
    KeyregTxBuilder.prototype.addNote = function (note, encoding) {
        if (encoding === void 0) { encoding = "base64"; }
        this.tx.note = new Uint8Array(Buffer.from(note, encoding));
        return this;
    };
    KeyregTxBuilder.prototype.addVoteKey = function (voteKey, encoding) {
        if (encoding === void 0) { encoding = "base64"; }
        this.tx.votekey = new Uint8Array(Buffer.from(voteKey, encoding));
        return this;
    };
    KeyregTxBuilder.prototype.addSelectionKey = function (selectionKey, encoding) {
        if (encoding === void 0) { encoding = "base64"; }
        this.tx.selkey = new Uint8Array(Buffer.from(selectionKey, encoding));
        return this;
    };
    KeyregTxBuilder.prototype.addStateProofKey = function (stateProofKey, encoding) {
        if (encoding === void 0) { encoding = "base64"; }
        this.tx.sprfkey = new Uint8Array(Buffer.from(stateProofKey, encoding));
        return this;
    };
    KeyregTxBuilder.prototype.addVoteFirst = function (voteFirst) {
        this.tx.votefst = voteFirst;
        return this;
    };
    KeyregTxBuilder.prototype.addVoteLast = function (voteLast) {
        this.tx.votelst = voteLast;
        return this;
    };
    KeyregTxBuilder.prototype.addVoteKeyDilution = function (voteKeyDilution) {
        this.tx.votekd = voteKeyDilution;
        return this;
    };
    KeyregTxBuilder.prototype.addNonParticipation = function (nonParticipation) {
        this.tx.nonpart = nonParticipation;
        return this;
    };
    KeyregTxBuilder.prototype.get = function () {
        return this.tx;
    };
    return KeyregTxBuilder;
}());
exports.KeyregTxBuilder = KeyregTxBuilder;
//# sourceMappingURL=algorand.transaction.keyreg.js.map
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlgorandTransactionCrafter = void 0;
var crafter_role_js_1 = require("./crafter.role.js");
var algorand_encoder_js_1 = require("./algorand.encoder.js");
var algorand_transaction_pay_js_1 = require("./algorand.transaction.pay.js");
var algorand_transaction_keyreg_js_1 = require("./algorand.transaction.keyreg.js");
var msgpack = __importStar(require("algo-msgpack-with-bigint"));
var AlgorandTransactionCrafter = /** @class */ (function (_super) {
    __extends(AlgorandTransactionCrafter, _super);
    function AlgorandTransactionCrafter(genesisId, genesisHash) {
        var _this = _super.call(this) || this;
        _this.genesisId = genesisId;
        _this.genesisHash = genesisHash;
        return _this;
    }
    /**
     *
     * @param amount
     * @param from
     * @param to
     * @returns
     */
    AlgorandTransactionCrafter.prototype.pay = function (amount, from, to) {
        return new algorand_transaction_pay_js_1.PayTxBuilder(this.genesisId, this.genesisHash).addAmount(amount).addSender(from).addReceiver(to);
    };
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
    AlgorandTransactionCrafter.prototype.changeOnline = function (from, voteKey, selectionKey, stateProofKey, voteFirst, voteLast, voteKeyDilution) {
        return new algorand_transaction_keyreg_js_1.KeyregTxBuilder(this.genesisHash)
            .addSender(from)
            .addVoteKey(voteKey)
            .addSelectionKey(selectionKey)
            .addStateProofKey(stateProofKey)
            .addVoteFirst(voteFirst)
            .addVoteLast(voteLast)
            .addVoteKeyDilution(voteKeyDilution);
    };
    /**
     *
     * @param from
     * @returns
     */
    AlgorandTransactionCrafter.prototype.changeOffline = function (from) {
        return new algorand_transaction_keyreg_js_1.KeyregTxBuilder(this.genesisHash)
            .addSender(from);
    };
    /**
     *
     * @param from
     * @returns
     */
    AlgorandTransactionCrafter.prototype.markNonParticipation = function (from) {
        return new algorand_transaction_keyreg_js_1.KeyregTxBuilder(this.genesisHash)
            .addSender(from)
            .addNonParticipation(true);
    };
    /**
     *
     * @param encodedTransaction
     * @param signature
     * @returns
     */
    AlgorandTransactionCrafter.prototype.addSignature = function (encodedTransaction, signature) {
        // remove TAG prefix
        var txObj = new algorand_encoder_js_1.AlgorandEncoder().decodeTransaction(encodedTransaction);
        var signedTx = {
            sig: signature,
            txn: txObj,
        };
        // Encode without TAG
        return msgpack.encode(signedTx, { sortKeys: true });
    };
    return AlgorandTransactionCrafter;
}(crafter_role_js_1.Crafter));
exports.AlgorandTransactionCrafter = AlgorandTransactionCrafter;
//# sourceMappingURL=algorand.transaction.crafter.js.map
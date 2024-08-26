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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlgorandEncoder = exports.ALGORAND_ADDRESS_BAD_CHECKSUM_ERROR_MSG = exports.MALFORMED_ADDRESS_ERROR_MSG = void 0;
var js_sha512_1 = require("js-sha512");
var msgpack = __importStar(require("algo-msgpack-with-bigint"));
var hi_base32_1 = __importDefault(require("hi-base32"));
var encoder_role_js_1 = require("./encoder.role.js");
var ALGORAND_PUBLIC_KEY_BYTE_LENGTH = 32;
var ALGORAND_ADDRESS_BYTE_LENGTH = 36;
var ALGORAND_CHECKSUM_BYTE_LENGTH = 4;
var ALGORAND_ADDRESS_LENGTH = 58;
var HASH_BYTES_LENGTH = 32;
exports.MALFORMED_ADDRESS_ERROR_MSG = "Malformed address";
exports.ALGORAND_ADDRESS_BAD_CHECKSUM_ERROR_MSG = "Bad checksum";
var AlgorandEncoder = /** @class */ (function (_super) {
    __extends(AlgorandEncoder, _super);
    function AlgorandEncoder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * decodeAddress takes an Algorand address in string form and decodes it into a Uint8Array.
     * @param address - an Algorand address with checksum.
     * @returns the decoded form of the address's public key and checksum
     */
    AlgorandEncoder.prototype.decodeAddress = function (address) {
        if (typeof address !== "string" || address.length !== ALGORAND_ADDRESS_LENGTH)
            throw new Error(exports.MALFORMED_ADDRESS_ERROR_MSG);
        // try to decode
        var decoded = hi_base32_1.default.decode.asBytes(address.toString());
        // Find publickey and checksum
        var pk = new Uint8Array(decoded.slice(0, ALGORAND_ADDRESS_BYTE_LENGTH - ALGORAND_CHECKSUM_BYTE_LENGTH));
        var cs = new Uint8Array(decoded.slice(ALGORAND_PUBLIC_KEY_BYTE_LENGTH, ALGORAND_ADDRESS_BYTE_LENGTH));
        // Compute checksum
        var checksum = js_sha512_1.sha512_256.array(pk).slice(HASH_BYTES_LENGTH - ALGORAND_CHECKSUM_BYTE_LENGTH, HASH_BYTES_LENGTH);
        // Check if the checksum and the address are equal
        if (checksum.length !== cs.length || !Array.from(checksum).every(function (val, i) { return val === cs[i]; })) {
            throw new Error(exports.ALGORAND_ADDRESS_BAD_CHECKSUM_ERROR_MSG);
        }
        return pk;
    };
    /**
     *
     */
    AlgorandEncoder.prototype.encodeAddress = function (publicKey) {
        var keyHash = js_sha512_1.sha512_256.create().update(publicKey).hex();
        // last 4 bytes of the hash
        var checksum = keyHash.slice(-8);
        return hi_base32_1.default.encode(encoder_role_js_1.Encoder.ConcatArrays(publicKey, Buffer.from(checksum, "hex"))).slice(0, 58);
    };
    /**
     *
     * @param stx
     * @returns
     */
    AlgorandEncoder.prototype.encodeSignedTransaction = function (stx) {
        var encodedTxn = new Uint8Array(msgpack.encode(stx, { sortKeys: true, ignoreUndefined: true }));
        return encodedTxn;
    };
    /**
     *
     * @param tx
     */
    AlgorandEncoder.prototype.encodeTransaction = function (tx) {
        // [TAG] [AMT] .... [NOTE] [RCV] [SND] [] [TYPE]
        var encoded = msgpack.encode(tx, { sortKeys: true, ignoreUndefined: true });
        // tag
        var TAG = Buffer.from("TX");
        // concat tag + encoded
        var encodedTx = encoder_role_js_1.Encoder.ConcatArrays(TAG, encoded);
        return encodedTx;
    };
    /**
     *
     * @param encoded
     * @returns
     */
    AlgorandEncoder.prototype.decodeTransaction = function (encoded) {
        var TAG = Buffer.from("TX");
        var tagBytes = TAG.byteLength;
        // remove tag Bytes for the tag and decode the rest
        var decoded = msgpack.decode(encoded.slice(tagBytes));
        return decoded;
    };
    /**
     *
     * @param encoded
     * @returns
     */
    AlgorandEncoder.prototype.decodeSignedTransaction = function (encoded) {
        var decoded = msgpack.decode(encoded);
        return decoded;
    };
    return AlgorandEncoder;
}(encoder_role_js_1.Encoder));
exports.AlgorandEncoder = AlgorandEncoder;
//# sourceMappingURL=algorand.encoder.js.map
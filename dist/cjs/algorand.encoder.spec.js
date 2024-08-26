"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.concatArrays = void 0;
var tweetnacl_1 = require("tweetnacl");
var js_sha512_1 = require("js-sha512");
var hi_base32_1 = __importDefault(require("hi-base32"));
var algorand_encoder_1 = require("./algorand.encoder");
var msgpack = __importStar(require("algo-msgpack-with-bigint"));
var algorand_transaction_crafter_1 = require("./algorand.transaction.crafter");
function concatArrays() {
    var arrs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arrs[_i] = arguments[_i];
    }
    var size = arrs.reduce(function (sum, arr) { return sum + arr.length; }, 0);
    var c = new Uint8Array(size);
    var offset = 0;
    for (var i = 0; i < arrs.length; i++) {
        c.set(arrs[i], offset);
        offset += arrs[i].length;
    }
    return c;
}
exports.concatArrays = concatArrays;
describe("Algorand Encoding", function () {
    var algoEncoder;
    var algorandCrafter;
    var genesisId = "GENESIS_ID";
    // genesis in base64
    var genesisHash = Buffer.from((0, tweetnacl_1.randomBytes)(32)).toString("base64");
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            algoEncoder = new algorand_encoder_1.AlgorandEncoder();
            algorandCrafter = new algorand_transaction_crafter_1.AlgorandTransactionCrafter(genesisId, genesisHash);
            return [2 /*return*/];
        });
    }); });
    it("(OK) decodeSignedTransaction", function () { return __awaiter(void 0, void 0, void 0, function () {
        var from, to, encodedTransaction, signature, signedTransaction, decodedSignedTransaction;
        return __generator(this, function (_a) {
            from = algoEncoder.encodeAddress(Buffer.from((0, tweetnacl_1.randomBytes)(32)));
            to = algoEncoder.encodeAddress(Buffer.from((0, tweetnacl_1.randomBytes)(32)));
            encodedTransaction = algorandCrafter.pay(1000, from, to).addFirstValidRound(1000).addLastValidRound(2000).get().encode();
            signature = new Uint8Array(Buffer.from((0, tweetnacl_1.randomBytes)(64)));
            signedTransaction = algorandCrafter.addSignature(encodedTransaction, signature);
            decodedSignedTransaction = algoEncoder.decodeSignedTransaction(signedTransaction);
            expect(decodedSignedTransaction).toBeDefined();
            expect(decodedSignedTransaction).toEqual({
                sig: signature,
                txn: {
                    rcv: algoEncoder.decodeAddress(to),
                    snd: algoEncoder.decodeAddress(from),
                    amt: 1000,
                    fv: 1000,
                    lv: 2000,
                    fee: 1000,
                    gen: genesisId,
                    gh: new Uint8Array(Buffer.from(genesisHash, "base64")),
                    type: "pay",
                },
            });
            return [2 /*return*/];
        });
    }); });
    it("(OK) encodeSignedTransaction", function () { return __awaiter(void 0, void 0, void 0, function () {
        var from, to, signature, signedTxn, encodedSignedTransaction;
        return __generator(this, function (_a) {
            from = algoEncoder.encodeAddress(Buffer.from((0, tweetnacl_1.randomBytes)(32)));
            to = algoEncoder.encodeAddress(Buffer.from((0, tweetnacl_1.randomBytes)(32)));
            signature = new Uint8Array(Buffer.from((0, tweetnacl_1.randomBytes)(64)));
            signedTxn = {
                sig: signature,
                txn: {
                    rcv: algoEncoder.decodeAddress(to),
                    snd: algoEncoder.decodeAddress(from),
                    amt: 1000,
                    fv: 1000,
                    lv: 2000,
                    fee: 1000,
                    gen: genesisId,
                    gh: new Uint8Array(Buffer.from(genesisHash, "base64")),
                    type: "pay",
                },
            };
            encodedSignedTransaction = algoEncoder.encodeSignedTransaction(signedTxn);
            expect(encodedSignedTransaction).toBeDefined();
            expect(encodedSignedTransaction).toEqual(msgpack.encode(signedTxn, { sortKeys: true }));
            return [2 /*return*/];
        });
    }); });
    it("(OK) encoding of pay transaction", function () { return __awaiter(void 0, void 0, void 0, function () {
        var from, to, note, txn, encoded;
        return __generator(this, function (_a) {
            from = algoEncoder.encodeAddress(Buffer.from((0, tweetnacl_1.randomBytes)(32)));
            to = algoEncoder.encodeAddress(Buffer.from((0, tweetnacl_1.randomBytes)(32)));
            note = Buffer.from((0, tweetnacl_1.randomBytes)(32)).toString("base64");
            txn = algorandCrafter.pay(1000, from, to).addFirstValidRound(1000).addLastValidRound(2000).addNote(note).addFee(1000).get();
            encoded = txn.encode();
            expect(encoded).toEqual(algoEncoder.encodeTransaction(txn));
            return [2 /*return*/];
        });
    }); });
    it("(OK) Encoding of keyreg transaction", function () { return __awaiter(void 0, void 0, void 0, function () {
        var from, note, voteKey, selectionKey, stateProofKey, txn, encoded;
        return __generator(this, function (_a) {
            from = algoEncoder.encodeAddress(Buffer.from((0, tweetnacl_1.randomBytes)(32)));
            note = Buffer.from((0, tweetnacl_1.randomBytes)(32)).toString("base64");
            voteKey = Buffer.from((0, tweetnacl_1.randomBytes)(32)).toString("base64");
            selectionKey = Buffer.from((0, tweetnacl_1.randomBytes)(32)).toString("base64");
            stateProofKey = Buffer.from((0, tweetnacl_1.randomBytes)(64)).toString("base64");
            txn = algorandCrafter
                .changeOnline(from, voteKey, selectionKey, stateProofKey, 1000, 2000, 32)
                .addFirstValidRound(1000)
                .addLastValidRound(2000)
                .addNote(note)
                .addFee(1000)
                .get();
            encoded = txn.encode();
            expect(encoded).toEqual(algoEncoder.encodeTransaction(txn));
            return [2 /*return*/];
        });
    }); });
    it("(OK) Encode & Decode Address ", function () { return __awaiter(void 0, void 0, void 0, function () {
        var keyPair, publicKey, keyHash, checksum, addr, encodedAddress, decodedPublicKey;
        return __generator(this, function (_a) {
            keyPair = {
                publicKey: Uint8Array.from([
                    54, 40, 107, 229, 129, 45, 73, 38, 42, 70, 201, 214, 130, 182, 245, 154, 39, 250, 247, 34, 218, 97, 92, 98, 82, 0, 72, 242, 30, 197, 142, 20,
                ]),
                secretKey: Uint8Array.from([
                    129, 128, 61, 158, 124, 215, 83, 137, 85, 47, 135, 151, 18, 162, 131, 63, 233, 138, 189, 56, 18, 114, 209, 4, 4, 128, 0, 159, 159, 76, 39, 85,
                    54, 40, 107, 229, 129, 45, 73, 38, 42, 70, 201, 214, 130, 182, 245, 154, 39, 250, 247, 34, 218, 97, 92, 98, 82, 0, 72, 242, 30, 197, 142, 20,
                ]),
            };
            publicKey = keyPair.publicKey;
            // assert public key is 32 bytes
            expect(publicKey.length).toBe(32);
            keyHash = js_sha512_1.sha512_256.create().update(publicKey).hex();
            checksum = keyHash.slice(-8);
            addr = hi_base32_1.default.encode(concatArrays(publicKey, Buffer.from(checksum, "hex"))).slice(0, 58);
            encodedAddress = algoEncoder.encodeAddress(Buffer.from(keyPair.publicKey));
            // match addresses
            expect(encodedAddress).toBe(addr);
            decodedPublicKey = algoEncoder.decodeAddress(encodedAddress);
            // match public keys
            expect(decodedPublicKey).toEqual(publicKey);
            return [2 /*return*/];
        });
    }); });
    it("(FAIL) decoding address - bad format", function () { return __awaiter(void 0, void 0, void 0, function () {
        var address;
        return __generator(this, function (_a) {
            address = "1234567890";
            expect(function () {
                algoEncoder.decodeAddress(address);
            }).toThrowError(algorand_encoder_1.MALFORMED_ADDRESS_ERROR_MSG);
            return [2 /*return*/];
        });
    }); });
    it("(FAIL) decoding address - Bad checksum", function () { return __awaiter(void 0, void 0, void 0, function () {
        var address;
        return __generator(this, function (_a) {
            address = "EUA7ONI2JTOBMMWNYAW45BIB6HRXP3NMKMTLDBPGDCSA3PXQHI37APNMCA";
            // check length
            expect(address.length).toBe(58);
            expect(function () {
                algoEncoder.decodeAddress(address);
            }).toThrowError(algorand_encoder_1.ALGORAND_ADDRESS_BAD_CHECKSUM_ERROR_MSG);
            return [2 /*return*/];
        });
    }); });
});
//# sourceMappingURL=algorand.encoder.spec.js.map
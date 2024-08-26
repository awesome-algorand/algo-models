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
var algorand_encoder_1 = require("./algorand.encoder");
var msgpack = __importStar(require("algo-msgpack-with-bigint"));
var algorand_transaction_crafter_1 = require("./algorand.transaction.crafter");
var algorand_transaction_pay_1 = require("./algorand.transaction.pay");
var algorand_transaction_keyreg_1 = require("./algorand.transaction.keyreg");
var ajv_1 = __importDefault(require("ajv"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
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
describe("Algorand Transaction Crafter", function () {
    var algorandCrafter;
    var algoEncoder;
    var genesisId = "GENESIS_ID";
    // genesis in base64
    var genesisHash = Buffer.from((0, tweetnacl_1.randomBytes)(32)).toString("base64");
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            algorandCrafter = new algorand_transaction_crafter_1.AlgorandTransactionCrafter(genesisId, genesisHash);
            algoEncoder = new algorand_encoder_1.AlgorandEncoder();
            return [2 /*return*/];
        });
    }); });
    afterEach(function () {
        jest.resetAllMocks();
    });
    it("(OK) addSignature", function () { return __awaiter(void 0, void 0, void 0, function () {
        var algoEncoder, from, to, encodedTransaction, signature, result, expected;
        return __generator(this, function (_a) {
            algoEncoder = new algorand_encoder_1.AlgorandEncoder();
            from = algoEncoder.encodeAddress(Buffer.from((0, tweetnacl_1.randomBytes)(32)));
            to = algoEncoder.encodeAddress(Buffer.from((0, tweetnacl_1.randomBytes)(32)));
            encodedTransaction = algorandCrafter.pay(1000, from, to).addFirstValidRound(1000).addLastValidRound(2000).get().encode();
            signature = Buffer.from((0, tweetnacl_1.randomBytes)(64));
            result = algorandCrafter.addSignature(encodedTransaction, signature);
            expect(result).toBeDefined();
            expected = {
                sig: signature,
                txn: algoEncoder.decodeTransaction(encodedTransaction),
            };
            expect(result).toEqual(msgpack.encode(expected, { sortKeys: true }));
            return [2 /*return*/];
        });
    }); });
    describe("Pay Transactions", function () {
        var paySchema = JSON.parse(fs_1.default.readFileSync(path_1.default.resolve(__dirname, "schemas/pay.transaction.json"), "utf8"));
        it("(OK) Craft Pay Transaction", function () { return __awaiter(void 0, void 0, void 0, function () {
            var from, to, note, txn, ajv, validate;
            return __generator(this, function (_a) {
                from = algoEncoder.encodeAddress(Buffer.from((0, tweetnacl_1.randomBytes)(32)));
                to = algoEncoder.encodeAddress(Buffer.from((0, tweetnacl_1.randomBytes)(32)));
                note = Buffer.from((0, tweetnacl_1.randomBytes)(128)).toString("base64");
                txn = algorandCrafter
                    .pay(1000, from, to)
                    .addFirstValidRound(1000)
                    .addLastValidRound(2000)
                    .addNote(note, "base64")
                    .addFee(1000)
                    .get();
                expect(txn).toBeDefined();
                expect(txn).toBeInstanceOf(algorand_transaction_pay_1.PayTransaction);
                expect(txn).toEqual({
                    rcv: algoEncoder.decodeAddress(to),
                    snd: algoEncoder.decodeAddress(from),
                    amt: 1000,
                    fv: 1000,
                    lv: 2000,
                    gen: genesisId,
                    gh: new Uint8Array(Buffer.from(genesisHash, "base64")),
                    note: new Uint8Array(Buffer.from(note, "base64")),
                    fee: 1000,
                    type: "pay",
                });
                ajv = new ajv_1.default();
                validate = ajv.compile(paySchema);
                expect(validate(txn)).toBe(true);
                return [2 /*return*/];
            });
        }); });
    });
    describe("KeyReg Online Transactions", function () {
        var keyRegSchema = JSON.parse(fs_1.default.readFileSync(path_1.default.resolve(__dirname, "schemas/keyreg.transaction.online.json"), "utf8"));
        it("(OK) Craft Keyreg change-online transaction", function () { return __awaiter(void 0, void 0, void 0, function () {
            var from, note, voteKey, selectionKey, stateProofKey, txn, ajv, validate;
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
                    .addNote(note, "base64")
                    .addFee(1000)
                    .get();
                expect(txn).toBeDefined();
                expect(txn).toBeInstanceOf(algorand_transaction_keyreg_1.KeyregTransaction);
                ajv = new ajv_1.default();
                validate = ajv.compile(keyRegSchema);
                expect(validate(txn)).toBe(true);
                expect(txn).toEqual({
                    snd: algoEncoder.decodeAddress(from),
                    votekey: new Uint8Array(Buffer.from(voteKey, "base64")),
                    selkey: new Uint8Array(Buffer.from(selectionKey, "base64")),
                    sprfkey: new Uint8Array(Buffer.from(stateProofKey, "base64")),
                    votefst: 1000,
                    votelst: 2000,
                    votekd: 32,
                    fv: 1000,
                    lv: 2000,
                    gh: new Uint8Array(Buffer.from(genesisHash, "base64")),
                    note: new Uint8Array(Buffer.from(note, "base64")),
                    fee: 1000,
                    type: "keyreg",
                });
                return [2 /*return*/];
            });
        }); });
    });
    describe("KeyReg Offline Transactions", function () {
        var keyRegSchema = JSON.parse(fs_1.default.readFileSync(path_1.default.resolve(__dirname, "schemas/keyreg.transaction.offline.json"), "utf8"));
        it("(OK) Craft Keyreg change-offline transaction", function () { return __awaiter(void 0, void 0, void 0, function () {
            var from, note, txn, ajv, validate;
            return __generator(this, function (_a) {
                from = algoEncoder.encodeAddress(Buffer.from((0, tweetnacl_1.randomBytes)(32)));
                note = Buffer.from((0, tweetnacl_1.randomBytes)(32)).toString("base64");
                txn = algorandCrafter
                    .changeOffline(from)
                    .addFirstValidRound(1000)
                    .addLastValidRound(2000)
                    .addNote(note, "base64")
                    .addFee(1000)
                    .get();
                expect(txn).toBeDefined();
                expect(txn).toBeInstanceOf(algorand_transaction_keyreg_1.KeyregTransaction);
                expect(txn).toEqual({
                    snd: algoEncoder.decodeAddress(from),
                    fv: 1000,
                    lv: 2000,
                    gh: new Uint8Array(Buffer.from(genesisHash, "base64")),
                    note: new Uint8Array(Buffer.from(note, "base64")),
                    fee: 1000,
                    type: "keyreg",
                });
                ajv = new ajv_1.default();
                validate = ajv.compile(keyRegSchema);
                expect(validate(txn)).toBe(true);
                return [2 /*return*/];
            });
        }); });
    });
    describe("KeyReg Non-participation Transactions", function () {
        var keyRegSchema;
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                keyRegSchema = JSON.parse(fs_1.default.readFileSync(path_1.default.resolve(__dirname, "schemas/keyreg.transaction.nonparticipation.json"), "utf8"));
                return [2 /*return*/];
            });
        }); });
        it("(OK) Craft Keyreg non-participation transaction", function () { return __awaiter(void 0, void 0, void 0, function () {
            var from, note, txn, ajv, validate;
            return __generator(this, function (_a) {
                from = algoEncoder.encodeAddress(Buffer.from((0, tweetnacl_1.randomBytes)(32)));
                note = Buffer.from((0, tweetnacl_1.randomBytes)(32)).toString("base64");
                txn = algorandCrafter
                    .markNonParticipation(from)
                    .addFirstValidRound(1000)
                    .addLastValidRound(2000)
                    .addNote(note, "base64")
                    .addFee(1000)
                    .get();
                expect(txn).toBeDefined();
                expect(txn).toBeInstanceOf(algorand_transaction_keyreg_1.KeyregTransaction);
                expect(txn).toEqual({
                    snd: algoEncoder.decodeAddress(from),
                    fv: 1000,
                    lv: 2000,
                    gh: new Uint8Array(Buffer.from(genesisHash, "base64")),
                    note: new Uint8Array(Buffer.from(note, "base64")),
                    fee: 1000,
                    type: "keyreg",
                    nonpart: true,
                });
                ajv = new ajv_1.default();
                validate = ajv.compile(keyRegSchema);
                expect(validate(txn)).toBe(true);
                return [2 /*return*/];
            });
        }); });
    });
});
//# sourceMappingURL=algorand.transaction.crafter.spec.js.map
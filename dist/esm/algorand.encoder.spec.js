import { randomBytes } from "tweetnacl";
import { sha512_256 } from "js-sha512";
import base32 from "hi-base32";
import { ALGORAND_ADDRESS_BAD_CHECKSUM_ERROR_MSG, AlgorandEncoder, MALFORMED_ADDRESS_ERROR_MSG } from "./algorand.encoder";
import * as msgpack from "algo-msgpack-with-bigint";
import { PayTransaction } from "./algorand.transaction.pay";
import { KeyregTransaction } from "./algorand.transaction.keyreg";
import { AlgorandTransactionCrafter } from "./algorand.transaction.crafter";
export function concatArrays(...arrs) {
    const size = arrs.reduce((sum, arr) => sum + arr.length, 0);
    const c = new Uint8Array(size);
    let offset = 0;
    for (let i = 0; i < arrs.length; i++) {
        c.set(arrs[i], offset);
        offset += arrs[i].length;
    }
    return c;
}
describe("Algorand Encoding", () => {
    let algoEncoder;
    let algorandCrafter;
    const genesisId = "GENESIS_ID";
    // genesis in base64
    const genesisHash = Buffer.from(randomBytes(32)).toString("base64");
    beforeEach(async () => {
        algoEncoder = new AlgorandEncoder();
        algorandCrafter = new AlgorandTransactionCrafter(genesisId, genesisHash);
    });
    it("(OK) decodeSignedTransaction", async () => {
        // from algorand address
        const from = algoEncoder.encodeAddress(Buffer.from(randomBytes(32)));
        // to algorand address
        const to = algoEncoder.encodeAddress(Buffer.from(randomBytes(32)));
        const encodedTransaction = algorandCrafter.pay(1000, from, to).addFirstValidRound(1000).addLastValidRound(2000).get().encode();
        const signature = new Uint8Array(Buffer.from(randomBytes(64)));
        const signedTransaction = algorandCrafter.addSignature(encodedTransaction, signature);
        const decodedSignedTransaction = algoEncoder.decodeSignedTransaction(signedTransaction);
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
    });
    it("(OK) encodeSignedTransaction", async () => {
        // from algorand address
        const from = algoEncoder.encodeAddress(Buffer.from(randomBytes(32)));
        // to algorand address
        const to = algoEncoder.encodeAddress(Buffer.from(randomBytes(32)));
        // signature
        const signature = new Uint8Array(Buffer.from(randomBytes(64)));
        // signed transaction
        const signedTxn = {
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
        // encode signed transaction
        const encodedSignedTransaction = algoEncoder.encodeSignedTransaction(signedTxn);
        expect(encodedSignedTransaction).toBeDefined();
        expect(encodedSignedTransaction).toEqual(msgpack.encode(signedTxn, { sortKeys: true }));
    });
    it("(OK) encoding of pay transaction", async () => {
        // from algorand address
        const from = algoEncoder.encodeAddress(Buffer.from(randomBytes(32)));
        // to algorand address
        const to = algoEncoder.encodeAddress(Buffer.from(randomBytes(32)));
        // note
        const note = Buffer.from(randomBytes(32)).toString("base64");
        // create pay transaction
        const txn = algorandCrafter.pay(1000, from, to).addFirstValidRound(1000).addLastValidRound(2000).addNote(note).addFee(1000).get();
        const encoded = txn.encode();
        expect(encoded).toEqual(algoEncoder.encodeTransaction(txn));
    });
    it("(OK) Encoding of keyreg transaction", async () => {
        // from algorand address
        const from = algoEncoder.encodeAddress(Buffer.from(randomBytes(32)));
        // note
        const note = Buffer.from(randomBytes(32)).toString("base64");
        // vote key
        const voteKey = Buffer.from(randomBytes(32)).toString("base64");
        // selection key
        const selectionKey = Buffer.from(randomBytes(32)).toString("base64");
        // state proof key
        const stateProofKey = Buffer.from(randomBytes(64)).toString("base64");
        // create keyreg transaction
        const txn = algorandCrafter
            .changeOnline(from, voteKey, selectionKey, stateProofKey, 1000, 2000, 32)
            .addFirstValidRound(1000)
            .addLastValidRound(2000)
            .addNote(note)
            .addFee(1000)
            .get();
        const encoded = txn.encode();
        expect(encoded).toEqual(algoEncoder.encodeTransaction(txn));
    });
    it("(OK) Encode & Decode Address ", async () => {
        const keyPair = {
            publicKey: Uint8Array.from([
                54, 40, 107, 229, 129, 45, 73, 38, 42, 70, 201, 214, 130, 182, 245, 154, 39, 250, 247, 34, 218, 97, 92, 98, 82, 0, 72, 242, 30, 197, 142, 20,
            ]),
            secretKey: Uint8Array.from([
                129, 128, 61, 158, 124, 215, 83, 137, 85, 47, 135, 151, 18, 162, 131, 63, 233, 138, 189, 56, 18, 114, 209, 4, 4, 128, 0, 159, 159, 76, 39, 85,
                54, 40, 107, 229, 129, 45, 73, 38, 42, 70, 201, 214, 130, 182, 245, 154, 39, 250, 247, 34, 218, 97, 92, 98, 82, 0, 72, 242, 30, 197, 142, 20,
            ]),
        };
        const publicKey = keyPair.publicKey;
        // assert public key is 32 bytes
        expect(publicKey.length).toBe(32);
        // perform sha512/sha256 on the public key
        const keyHash = sha512_256.create().update(publicKey).hex();
        // last 4 bytes of the hash
        const checksum = keyHash.slice(-8);
        const addr = base32.encode(concatArrays(publicKey, Buffer.from(checksum, "hex"))).slice(0, 58);
        const encodedAddress = algoEncoder.encodeAddress(Buffer.from(keyPair.publicKey));
        // match addresses
        expect(encodedAddress).toBe(addr);
        // decode back to public key
        const decodedPublicKey = algoEncoder.decodeAddress(encodedAddress);
        // match public keys
        expect(decodedPublicKey).toEqual(publicKey);
    });
    it("(FAIL) decoding address - bad format", async () => {
        const address = "1234567890";
        expect(() => {
            algoEncoder.decodeAddress(address);
        }).toThrowError(MALFORMED_ADDRESS_ERROR_MSG);
    });
    it("(FAIL) decoding address - Bad checksum", async () => {
        const address = "EUA7ONI2JTOBMMWNYAW45BIB6HRXP3NMKMTLDBPGDCSA3PXQHI37APNMCA";
        // check length
        expect(address.length).toBe(58);
        expect(() => {
            algoEncoder.decodeAddress(address);
        }).toThrowError(ALGORAND_ADDRESS_BAD_CHECKSUM_ERROR_MSG);
    });
});
//# sourceMappingURL=algorand.encoder.spec.js.map
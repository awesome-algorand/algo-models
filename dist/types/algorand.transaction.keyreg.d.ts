/// <reference types="node" />
export declare class KeyregTransaction {
    type: string;
    snd: Uint8Array;
    fee: number;
    fv: number;
    lv: number;
    note?: Uint8Array;
    votekey?: Uint8Array;
    selkey?: Uint8Array;
    sprfkey?: Uint8Array;
    votefst?: number;
    votelst?: number;
    votekd?: number;
    nonpart?: boolean;
    gen: string;
    gh: Uint8Array;
    encode(): Uint8Array;
}
export interface IKeyregTxBuilder {
    addSender(sender: string): IKeyregTxBuilder;
    addFee(fee: number): IKeyregTxBuilder;
    addFirstValidRound(firstValid: number): IKeyregTxBuilder;
    addLastValidRound(lastValid: number): IKeyregTxBuilder;
    addNote(note: string, encoding?: BufferEncoding): IKeyregTxBuilder;
    addVoteKey(voteKey: string, encoding?: BufferEncoding): IKeyregTxBuilder;
    addSelectionKey(selectionKey: string, encoding?: BufferEncoding): IKeyregTxBuilder;
    addStateProofKey(stateProofKey: string, encoding?: BufferEncoding): IKeyregTxBuilder;
    addVoteFirst(voteFirst: number): IKeyregTxBuilder;
    addVoteLast(voteLast: number): IKeyregTxBuilder;
    addVoteKeyDilution(voteKeyDilution: number): IKeyregTxBuilder;
    addNonParticipation(nonParticipation: boolean): IKeyregTxBuilder;
    get(): KeyregTransaction;
}
export declare class KeyregTxBuilder implements IKeyregTxBuilder {
    private tx;
    constructor(genesisHash: string);
    addSender(sender: string): IKeyregTxBuilder;
    addFee(fee: number): IKeyregTxBuilder;
    addFirstValidRound(firstValid: number): IKeyregTxBuilder;
    addLastValidRound(lastValid: number): IKeyregTxBuilder;
    addNote(note: string, encoding?: BufferEncoding): IKeyregTxBuilder;
    addVoteKey(voteKey: string, encoding?: BufferEncoding): IKeyregTxBuilder;
    addSelectionKey(selectionKey: string, encoding?: BufferEncoding): IKeyregTxBuilder;
    addStateProofKey(stateProofKey: string, encoding?: BufferEncoding): IKeyregTxBuilder;
    addVoteFirst(voteFirst: number): IKeyregTxBuilder;
    addVoteLast(voteLast: number): IKeyregTxBuilder;
    addVoteKeyDilution(voteKeyDilution: number): IKeyregTxBuilder;
    addNonParticipation(nonParticipation: boolean): IKeyregTxBuilder;
    get(): KeyregTransaction;
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Encoder = void 0;
var Encoder = /** @class */ (function () {
    function Encoder() {
    }
    /**
     *
     * @param publicKey
     */
    // abstract EncodeAddress(publicKey: Buffer): string
    // static ArrayEqual(a: ArrayLike<any>, b: ArrayLike<any>) {
    // 	if (a.length !== b.length) {
    // 		return false
    // 	}
    // 	return Array.from(a).every((val, i) => val === b[i])
    // }
    /**
     *
     * @param arrs
     * @returns
     */
    Encoder.ConcatArrays = function () {
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
    };
    return Encoder;
}());
exports.Encoder = Encoder;
//# sourceMappingURL=encoder.role.js.map
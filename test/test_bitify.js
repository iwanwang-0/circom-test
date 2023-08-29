const chai = require("chai");
const path = require("path");

const wasm_tester = require("circom_tester").wasm;
const c_tester = require("circom_tester").c;

const F1Field = require("ffjavascript").F1Field;
const Scalar = require("ffjavascript").Scalar;
exports.p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");
const Fr = new F1Field(exports.p);

const assert = chai.assert;

function bytifyLE32(num) {
    const buf = Buffer.alloc(32);
    buf.writeUInt32LE(num);
    const byteArr = [];
    for (const value of buf.values()) {
        byteArr.push(value);
    }
    return byteArr;
}

function bytifyBigIntLE(num, size) {
    let _num = num;
    const byteArr = [];
    for (let i = 0; i < size; i++) {
        if (i > 0) {
            _num = _num >> 8n;
        }
        byteArr.push(_num % 256n);
    }
    return byteArr;
}

function bytifyNumberLE(num, size) {
    let _num = num;
    const byteArr = [];
    for (let i = 0; i < size; i++) {
        if (i > 0) {
            _num = _num >> 8;
        }
        byteArr.push(_num % 256);
    }
    return byteArr;
}

describe("Bitify", function() {
    this.timeout(100000);

    it("Checking the compilation of a simple circuit generating wasm", async function () {
        const circuit = await wasm_tester(path.join(__dirname, "test_bitify.circom"));
        const w = await circuit.calculateWitness({in: 1053});
        await circuit.checkConstraints(w);

        console.log(w);
    });

    it("check bitify a number", function() {
        const a = 1053;
        const bitStr = a.toString(2);
        let bitArr = bitStr.split("");
        // to little endian
        bitArr = bitArr.reverse();
        bitArr = bitArr.map((x) => {
            return parseInt(x);
        });
        if (bitArr.length < 32) {
            for (let i = bitArr.length; i < 32; i ++) {
                bitArr.push(0);
            }
        }
        console.log(bitStr);
        console.log(bitArr);
    });

    it("bytify a number", function() {
        let byteArr = bytifyLE32(1053);
        console.log(byteArr);

        byteArr = bytifyNumberLE(1053, 32);
        console.log(byteArr);

        byteArr = bytifyBigIntLE(19915462992998069323040706974537250874160306099366236530173408288201213652137n, 32);
        console.log(byteArr);
    })
});
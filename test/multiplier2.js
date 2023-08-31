const chai = require("chai");
const path = require("path");
// const wasm_tester = require("./../index").wasm;
// const c_tester = require("./../index").c;

const wasm_tester = require("circom_tester").wasm;
const c_tester = require("circom_tester").c;

const F1Field = require("ffjavascript").F1Field;
const Scalar = require("ffjavascript").Scalar;
exports.p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");
const Fr = new F1Field(exports.p);

const assert = chai.assert;

describe("Simple test", function () {
    this.timeout(100000);

    it("Checking the compilation of a simple circuit generating wasm", async function () {
        const circuit = await wasm_tester(path.join(__dirname, "Multiplier2.circom"));
        const w = await circuit.calculateWitness({a: "6", b: 5});
        // await circuit.checkConstraints(w);
        // try {
        //     await circuit.assertOut(w, {g : [1]});
        // } catch (e) {

        // }
        await circuit.loadSymbols();
        console.log(w);
        console.log(circuit.symbols);
        const gIdx = circuit.symbols['main.g[0]'].varIdx;
        console.log("g.idx is " + gIdx);
        console.log("g = ");
        for(let i = 0; i < 2; i++) {
            console.log(w[gIdx + i]);
        }

        // 不能用
        // const output = await circuit.getDecoratedOutput(w);
        // console.log(output);
    });

    it("check bitify a number", function() {
        const a = 1053;
        const bitStr = a.toString(2);
        let bitArr = bitStr.split("");
        bitArr = bitArr.map((x) => {
            return parseInt(x);
        });
        console.log(bitStr);
        console.log(bitArr);
    })
});
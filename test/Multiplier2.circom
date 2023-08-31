pragma circom 2.0.0;

template Multiplier2() {
    signal input a;
    signal input b;
    signal output c;
    signal output d;
    signal output e;
    signal output f;
    signal output g[2];
    c <== a*b;
    d <== a+b;
    e <== c + d;
    f <== e + 1;
    g[0] <== 1;
    g[1] <== 2;
}

component main {public [b]} = Multiplier2();
 
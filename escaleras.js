function contarFormasEscaleras(N) {
    if (N <= 0) return { formas: 0, tabla: [] };
    if (N === 1) return { formas: 1, tabla: [1, 1] };

    const dp = new Array(N + 1).fill(0);
    dp[0] = 1;
    dp[1] = 1;

    for (let i = 2; i <= N; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return {
        formas: dp[N],
        tabla: dp
    };
}

console.log("PROBLEMA ESCALERAS ......");

const r1 = contarFormasEscaleras(5);
console.log(`Entrada: N = 5`);
console.log(`Formas posibles: ${r1.formas}`);
console.log(`Tabla DP: [${r1.tabla.join(", ")}]\n`);

const r2 = contarFormasEscaleras(7);
console.log(`Entrada: N = 7`);
console.log(`Formas posibles: ${r2.formas}`);
console.log(`Tabla DP: [${r2.tabla.join(", ")}]`);

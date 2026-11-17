function cambioMinimoMonedas(monedas, cantidad) {
    const INF = Infinity;
    const dp = new Array(cantidad + 1).fill(INF);
    const origen = new Array(cantidad + 1).fill(-1);

    dp[0] = 0;

    for (let i = 1; i <= cantidad; i++) {
        for (const moneda of monedas) {
            if (moneda <= i && dp[i - moneda] + 1 < dp[i]) {
                dp[i] = dp[i - moneda] + 1;
                origen[i] = moneda;
            }
        }
    }

    const combinacion = [];
    if (dp[cantidad] !== INF) {
        let actual = cantidad;
        while (actual > 0) {
            combinacion.push(origen[actual]);
            actual -= origen[actual];
        }
    }

    return {
        minimo: dp[cantidad] === INF ? -1 : dp[cantidad],
        tabla: dp.map(v => (v === INF ? -1 : v)),
        combinacion: combinacion
    };
}

console.log("PROBLEMA DEL CAMBIO MÍNIMO DE MONEDAS .....");

const c1 = cambioMinimoMonedas([1, 3, 4], 6);
console.log(`Monedas: [1,3,4] | Cantidad: 6`);
console.log(`Cantidad mínima de monedas: ${c1.minimo}`);
console.log(`Combinación: ${c1.combinacion.join(" + ")}`);
console.log(`Tabla DP: [${c1.tabla.join(",")}]\n`);

const c2 = cambioMinimoMonedas([1, 2, 5], 11);
console.log(`Monedas: [1,2,5] | Cantidad: 11`);
console.log(`Cantidad mínima de monedas: ${c2.minimo}`);
console.log(`Combinación: ${c2.combinacion.join(" + ")}`);
console.log(`Tabla DP: [${c2.tabla.join(",")}]`);

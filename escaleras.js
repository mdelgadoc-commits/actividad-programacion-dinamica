const readline = require("readline");

/**
 * Calcula las formas de subir N escalones usando los pasos permitidos (Programación Dinámica)
 * @param {number} N - Total de escalones
 * @param {number[]} pasos - Arreglo con los tamaños de paso permitidos (ej. [1, 2])
 */
function contarFormasEscaleras(N, pasos) {
    if (N < 0) return { formas: 0, tabla: [] };

    // Tabla DP: dp[i] = formas de llegar al escalón i
    const dp = new Array(N + 1).fill(0);
    dp[0] = 1; // Caso base: 1 forma de mantenerse en el inicio (escalón 0)

    // Llenado de la tabla reutilizando subproblemas ya calculados
    for (let i = 1; i <= N; i++) {
        for (const paso of pasos) {
            if (i - paso >= 0) {
                dp[i] += dp[i - paso];
            }
        }
    }

    return {
        formas: dp[N],
        tabla: dp
    };
}

// ---- Interfaz de consola ----
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


console.log("   CALCULADORA DE ESCALERAS (PROGRAMACIÓN DP) ");

rl.question("1. Ingresa el número total de escalones (N): ", (entradaN) => {
    const N = parseInt(entradaN);

    if (isNaN(N) || N <= 0) {
        console.log("\n[Error] Debes ingresar un número entero mayor a 0.\n");
        rl.close();
        return;
    }

    rl.question("2. Ingresa los escalones que puedes avanzar por paso (ej. 1,2): ", (entradaPasos) => {
        // Limpia, convierte a enteros, elimina duplicados y ordena los pasos
        const pasos = [...new Set(
            entradaPasos
                .split(",")
                .map(p => parseInt(p.trim()))
                .filter(p => !isNaN(p) && p > 0)
        )].sort((a, b) => a - b);

        if (pasos.length === 0) {
            console.log("\n[Error] Ingresa al menos un tamaño de paso válido (ej. 1,2).\n");
            rl.close();
            return;
        }

        const resultado = contarFormasEscaleras(N, pasos);

        // ---- Salida ordenada ----
        console.log("\n............................................");
        console.log("                  RESULTADOS                  ");
        console.log("..............................................");
        console.log(`• Escalones totales (N) : ${N}`);
        console.log(`• Pasos permitidos      : [${pasos.join(", ")}]`);
        console.log(`• Formas posibles       : ${resultado.formas}`);
        console.log("................................................");
        console.log("Tabla DP generada (Escalón -> Formas):");
        console.log(`[${resultado.tabla.join(", ")}]`);
        console.log("...............................................\n");

        rl.close();
    });
});
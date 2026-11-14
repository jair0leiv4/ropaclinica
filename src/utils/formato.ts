/** Formatea un número como pesos chilenos: 9990 -> "$9.990" */
export const peso = (n: number): string => "$" + n.toLocaleString("es-CL");

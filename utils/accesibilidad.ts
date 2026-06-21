// Texto grande.
export const getTamañoTexto = (esGrande: boolean, base: string) => {
  return esGrande ? `text-4xl ${base}` : `text-2xl ${base}`;
};
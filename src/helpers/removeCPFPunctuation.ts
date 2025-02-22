export const removeCPFPunctuation = (cpf: string) => {
  return cpf.replace(/[\.\-]/g, "");
};
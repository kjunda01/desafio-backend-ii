export const formatarDataParaSQL = (dataISO) => {
  if (!dataISO) return null;
  return new Date(dataISO).toISOString().slice(0, 19).replace("T", " ");
};

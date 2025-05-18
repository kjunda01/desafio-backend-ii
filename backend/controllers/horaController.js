import createError from "http-errors";
 
const getHora = async (req, res, next) => {

    try {
      const data = await fipeService.obterMarcas(codigoTipoVeiculo);
      return successResponse(res, "Marcas obtidas com sucesso", data);
    } catch (error) {
      return next(createError(404, "Erro ao obter marcas.", { cause: error }));
    }
  };

export const horaController = {
    getHora
};

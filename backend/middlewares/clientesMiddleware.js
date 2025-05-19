const validaCliente = (req, res, next) => {
  const { nome, sobrenome, email, idade } = req.body;
  const nomeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const idadeValida = Number.isInteger(idade) && idade >= 0 && idade <= 130;
  const erros = [];

  if (!nome || !nomeRegex.test(nome)) {
    erros.push({ message: "Nome inválido. Use apenas letras e espaços." });
  }

  if (!sobrenome || !nomeRegex.test(sobrenome)) {
    erros.push({ message: "Sobrenome inválido. Use apenas letras e espaços." });
  }

  if (!email || !emailRegex.test(email)) {
    erros.push({ message: "E-mail inválido." });
  }

  if (!idadeValida) {
    erros.push({ message: "Idade inválida. Deve ser um número entre 0 e 130." });
  }

  if (erros) return res.status(400).json({ error: erros });

  next();
};

export const clientesMiddleware = { validaCliente };

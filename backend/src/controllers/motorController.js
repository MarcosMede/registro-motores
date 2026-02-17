const motorModel = require('../models/motorModel');

function validarCampos(body) {
  const obrigatorios = ['numero_motor', 'modelo', 'potencia', 'tensao', 'corrente', 'responsavel'];
  return obrigatorios.filter((campo) => !String(body[campo] || '').trim());
}

async function create(req, res, next) {
  try {
    const faltando = validarCampos(req.body);
    if (faltando.length) {
      return res.status(400).json({
        message: `Campos obrigatorios ausentes: ${faltando.join(', ')}`
      });
    }

    const id = await motorModel.createMotor(req.body);
    const novoRegistro = await motorModel.getMotorById(id);

    return res.status(201).json({
      message: 'Motor cadastrado com sucesso.',
      data: novoRegistro
    });
  } catch (error) {
    return next(error);
  }
}

async function list(req, res, next) {
  try {
    const { data } = req.query;
    const motores = await motorModel.getMotores(data);

    return res.status(200).json({
      message: 'Motores listados com sucesso.',
      data: motores
    });
  } catch (error) {
    return next(error);
  }
}

async function update(req, res, next) {
  try {
    const { id } = req.params;
    const faltando = validarCampos(req.body);

    if (faltando.length) {
      return res.status(400).json({
        message: `Campos obrigatorios ausentes: ${faltando.join(', ')}`
      });
    }

    const affectedRows = await motorModel.updateMotor(id, req.body);

    if (!affectedRows) {
      return res.status(404).json({ message: 'Registro nao encontrado.' });
    }

    const registroAtualizado = await motorModel.getMotorById(id);

    return res.status(200).json({
      message: 'Registro atualizado com sucesso.',
      data: registroAtualizado
    });
  } catch (error) {
    return next(error);
  }
}

async function remove(req, res, next) {
  try {
    const { id } = req.params;
    const affectedRows = await motorModel.deleteMotor(id);

    if (!affectedRows) {
      return res.status(404).json({ message: 'Registro nao encontrado.' });
    }

    return res.status(200).json({
      message: 'Registro excluido com sucesso.'
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  create,
  list,
  update,
  remove
};

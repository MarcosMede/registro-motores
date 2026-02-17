const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

function signToken(user) {
  return jwt.sign(
    {
      email: user.email,
      nome: user.nome
    },
    process.env.JWT_SECRET,
    {
      subject: String(user.id),
      expiresIn: process.env.JWT_EXPIRES_IN || '1d'
    }
  );
}

async function register(req, res, next) {
  try {
    const { nome, email, password } = req.body;

    if (!nome || !email || !password) {
      return res.status(400).json({ message: 'nome, email e password sao obrigatorios.' });
    }

    const existing = await userModel.getUserByEmail(email);
    if (existing) {
      return res.status(409).json({ message: 'Email ja cadastrado.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userId = await userModel.createUser({ nome, email, passwordHash });
    const user = await userModel.getUserById(userId);

    const token = signToken(user);

    return res.status(201).json({
      message: 'Usuario cadastrado com sucesso.',
      data: {
        token,
        user
      }
    });
  } catch (error) {
    return next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'email e password sao obrigatorios.' });
    }

    const userWithHash = await userModel.getUserByEmail(email);
    if (!userWithHash) {
      return res.status(401).json({ message: 'Credenciais invalidas.' });
    }

    const passwordOk = await bcrypt.compare(password, userWithHash.password_hash);
    if (!passwordOk) {
      return res.status(401).json({ message: 'Credenciais invalidas.' });
    }

    const user = {
      id: userWithHash.id,
      nome: userWithHash.nome,
      email: userWithHash.email
    };

    const token = signToken(user);

    return res.status(200).json({
      message: 'Login realizado com sucesso.',
      data: {
        token,
        user
      }
    });
  } catch (error) {
    return next(error);
  }
}

async function me(req, res, next) {
  try {
    const user = await userModel.getUserById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario nao encontrado.' });
    }

    return res.status(200).json({ data: user });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  register,
  login,
  me
};

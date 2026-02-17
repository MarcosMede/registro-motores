function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const isProduction = process.env.NODE_ENV === 'production';

  console.error('[ERROR]', {
    method: req.method,
    url: req.originalUrl,
    message: err.message,
    stack: err.stack
  });

  return res.status(statusCode).json({
    message: statusCode >= 500 ? 'Erro interno no servidor. Tente novamente.' : err.message,
    details: !isProduction ? err.details || undefined : undefined
  });
}

module.exports = errorHandler;

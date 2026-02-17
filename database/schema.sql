CREATE DATABASE IF NOT EXISTS registro_motores;
USE registro_motores;

CREATE TABLE IF NOT EXISTS motores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  numero_motor VARCHAR(100) NOT NULL,
  modelo VARCHAR(120) NOT NULL,
  potencia VARCHAR(50) NOT NULL,
  tensao VARCHAR(50) NOT NULL,
  corrente VARCHAR(50) NOT NULL,
  data_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
  responsavel VARCHAR(120) NOT NULL,
  observacoes TEXT
);

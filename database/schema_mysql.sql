-- Execute este script no MySQL Workbench ou no terminal mysql

CREATE DATABASE IF NOT EXISTS registro_motores;
USE registro_motores;

CREATE TABLE IF NOT EXISTS motores (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  numero_motor VARCHAR(100) NOT NULL,
  modelo VARCHAR(120) NOT NULL,
  potencia VARCHAR(50) NOT NULL,
  tensao VARCHAR(50) NOT NULL,
  corrente VARCHAR(50) NOT NULL,
  data_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  responsavel VARCHAR(120) NOT NULL,
  observacoes TEXT NULL,
  PRIMARY KEY (id),
  KEY idx_motores_data_registro (data_registro DESC)
);

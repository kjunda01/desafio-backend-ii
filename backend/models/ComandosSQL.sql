-- Remove as tabelas se existirem (ordem importa por dependências)
DROP TABLE IF EXISTS produtos;
DROP TABLE IF EXISTS clientes;

-- Criação da tabela clientes
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    idade INT NOT NULL
);

-- Criação da tabela produtos
CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao VARCHAR(255),
    preco DECIMAL(10,2) NOT NULL,
    data_atualizado DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Inserindo dados na tabela clientes
INSERT INTO clientes (nome, sobrenome, email, idade) VALUES
('João', 'Silva', 'joao.silva@example.com', 30),
('Maria', 'Souza', 'maria.souza@example.com', 25),
('Carlos', 'Oliveira', 'carlos.oliveira@example.com', 40);

-- Inserindo dados na tabela produtos
INSERT INTO produtos (nome, descricao, preco, data_atualizado) VALUES
('Teclado Mecânico', 'Teclado com switches azuis', 249.90, NOW()),
('Mouse Gamer', 'Mouse com 7 botões programáveis', 159.50, NOW()),
('Monitor 24"', 'Monitor IPS Full HD 75Hz', 899.99, NOW());

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    matricule VARCHAR(5) UNIQUE,
    nom VARCHAR(100),
    postnom VARCHAR(100),
    prenom VARCHAR(100),
    classe VARCHAR(50),
    email VARCHAR(100),
    date_naissance DATE,
    password VARCHAR(255),
    role ENUM('etudiant', 'caissier', 'directeur')
);
CREATE TABLE paiements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    montant DECIMAL(10,2),
    motif VARCHAR(255),
    date_paiement DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
INSERT INTO users (matricule, nom, postnom, prenom, classe, email, date_naissance, password, role) VALUES
('10001', 'Kavira', 'Amani', 'Joel', 'L1 Info', 'etu1@uni.com', '2002-05-10', '1234abcd', 'etudiant'),
('10002', 'Musa', 'Bora', 'Alice', 'L2 Info', 'etu2@uni.com', '2001-03-15', '1234abcd', 'etudiant'),
('10003', 'Tshibangu', 'Lola', 'Chris', 'L3 Info', 'etu3@uni.com', '2000-07-20', '1234abcd', 'etudiant'),
('20001', 'Kabila', 'Jean', 'Paul', NULL, 'caisse@uni.com', '1995-02-10', '1234abcd', 'caissier'),
('30001', 'Mukwege', 'Denis', 'Admin', NULL, 'dir@uni.com', '1980-01-01', '1234abcd', 'directeur');
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

CREATE TABLE frais (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    montant DECIMAL(10,2) NOT NULL,
    description TEXT,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE classes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) NOT NULL
);

CREATE TABLE frais_classes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    frais_id INT,
    classe_id INT,
    FOREIGN KEY (frais_id) REFERENCES frais(id) ON DELETE CASCADE,
    FOREIGN KEY (classe_id) REFERENCES classes(id) ON DELETE CASCADE
);



SELECT 
    f.id AS frais_id,
    f.nom,
    f.montant AS montant_total,

    COALESCE(SUM(p.montant), 0) AS montant_paye,

    (f.montant - COALESCE(SUM(p.montant), 0)) AS reste,

    (COALESCE(SUM(p.montant), 0) / f.montant) * 100 AS pourcentage

FROM users u
JOIN classes c ON c.id = u.nom
JOIN frais_classes fc ON fc.classe_id = u.classe_id
JOIN frais f ON f.id = fc.frais_id

LEFT JOIN paiements p 
    ON p.frais_id = f.id 
    AND p.user_id = u.id

WHERE u.id = ?

GROUP BY f.id;



(SELECT 
    SUM(f.montant) AS total_a_payer,
    SUM(COALESCE(p.total_paye, 0)) AS total_paye,

    (SUM(COALESCE(p.total_paye, 0)) / SUM(f.montant)) * 100 AS pourcentage_total

FROM users u

JOIN frais_classes fc ON fc.classe_id = u.classe_id
JOIN frais f ON f.id = fc.frais_id

LEFT JOIN (
    SELECT frais_id, user_id, SUM(montant) AS total_paye
    FROM paiements
    GROUP BY frais_id, user_id
) p ON p.frais_id = f.id AND p.user_id = u.id

WHERE u.id = ?;)

SELECT 
    f.id AS frais_id,
    f.nom,
    f.montant,

    COALESCE(SUM(p.montant), 0) AS montant_paye,

    (f.montant - COALESCE(SUM(p.montant), 0)) AS reste

FROM users u

JOIN frais_classes fc ON fc.classe_id = u.classe_id
JOIN frais f ON f.id = fc.frais_id

LEFT JOIN paiements p 
    ON p.frais_id = f.id 
    AND p.user_id = u.id

WHERE u.id = ?

GROUP BY f.id;






SELECT 
    f.id AS frais_id,
    f.nom,
    f.montant,

    COALESCE(SUM(p.montant), 0) AS montant_paye,

    (f.montant - COALESCE(SUM(p.montant), 0)) AS reste,

    CASE 
        WHEN COALESCE(SUM(p.montant), 0) >= f.montant THEN 1
        ELSE 0
    END AS est_paye

FROM users u

JOIN frais_classes fc ON fc.classe_id = u.classe_id
JOIN frais f ON f.id = fc.frais_id

LEFT JOIN paiements p 
    ON p.frais_id = f.id 
    AND p.user_id = u.id

WHERE u.id = ?

GROUP BY f.id;

-- hgukyguiygsdyugcuf
HAVING reste > 0;

CREATE TABLE applications (
    id VARCHAR(255) DEFAULT (UUID()),
    code TEXT NOT NULL,
    description TEXT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE companies (
    id VARCHAR(255) NOT NULL DEFAULT (UUID()),
    description TEXT NOT NULL,
    cell TEXT,
    cfpiva TEXT,
    PRIMARY KEY (id)
);

-- CreateTable: users
CREATE TABLE users (
    id VARCHAR(255) DEFAULT (UUID()),
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    picture TEXT,
    isActive BOOLEAN DEFAULT true,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    role ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    companyId VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    password TEXT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT user_companyId_fkey FOREIGN KEY (companyId) REFERENCES companies(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable: password_resets
CREATE TABLE password_resets (
    id VARCHAR(255) DEFAULT (UUID()),
    userId VARCHAR(255) NOT NULL,
    token TEXT NOT NULL,
    used BOOLEAN NOT NULL DEFAULT false,
    expiresAt TIMESTAMP NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT password_resets_userId_fkey FOREIGN KEY (userId) REFERENCES users(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Indexes
CREATE INDEX user_companyId_idx ON users(companyId);
CREATE INDEX password_resets_userId_idx ON password_resets(userId);

START TRANSACTION;

-- Inserisci un nuovo utente e ottieni l'ID
SET @user_id = UUID(); -- Genera un ID unico per l'utente
SET @password_resets_id = UUID();
SET @companies_id = UUID();
SET @applications_id = UUID();

INSERT INTO users (id, firstName, lastName, picture, isActive, createdAt, updatedAt, role, companyId, email, password)
VALUES 
(
    @user_id, 
    'Riccardo', 
    'Meggiolaro', 
    NULL, 
    true, 
    CURRENT_TIMESTAMP, 
    CURRENT_TIMESTAMP, 
    'ADMIN', 
    NULL,
    'riccardo.meggiolaro@baron.it',
    '$2b$10$guEA4WvsiIUTP7nl.sq/XuWMdAERAaUAzdidIHRf7YXqgYQEYZ4tm' -- admin
);

COMMIT;
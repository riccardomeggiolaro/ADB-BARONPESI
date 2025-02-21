CREATE TABLE application (
    id VARCHAR(255) NOT NULL DEFAULT (UUID()),
    code TEXT NOT NULL,
    description TEXT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE company (
    id VARCHAR(255) NOT NULL DEFAULT (UUID()),
    description TEXT NOT NULL,
    cell TEXT,
    cfpiva TEXT,
    PRIMARY KEY (id)
);

CREATE TABLE user (
    id VARCHAR(255) NOT NULL DEFAULT (UUID()),
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    picture TEXT,
    isActive BOOLEAN NOT NULL DEFAULT true,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    role ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    companyId VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT user_companyId_fkey FOREIGN KEY (companyId) REFERENCES company(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE password_reset (
    id VARCHAR(255) NOT NULL DEFAULT (UUID()),
    userId VARCHAR(255) NOT NULL,
    token TEXT NOT NULL,
    used BOOLEAN NOT NULL DEFAULT false,
    expiresAt TIMESTAMP NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT password_reset_userId_fkey FOREIGN KEY (userId) REFERENCES user(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE application_tenant_db (
    id VARCHAR(255) NOT NULL DEFAULT (UUID()),
    applicationId VARCHAR(255) NOT NULL,
    companyId VARCHAR(255) NOT NULL,
    database_connection TEXT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT application_tenant_db_applicationId_fkey FOREIGN KEY (applicationId) REFERENCES application(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT application_tenant_db_companyId_fkey FOREIGN KEY (companyId) REFERENCES company(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Indexes
CREATE INDEX user_companyId_idx ON user(companyId);
CREATE INDEX password_reset_userId_idx ON password_reset(userId);
CREATE INDEX application_tenant_db_applicationId_idx ON application_tenant_db(applicationId);
CREATE INDEX application_tenant_db_companyId_idx ON application_tenant_db(companyId);

-- Inserimento dati
START TRANSACTION;

SET @user_id = UUID();
SET @password_reset_id = UUID();

-- Inserimento di un utente admin associato a un'azienda
INSERT INTO user (id, firstName, lastName, picture, isActive, createdAt, updatedAt, role, email, password)
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
    'riccardo.meggiolaro@baron.it',
    '$2b$10$guEA4WvsiIUTP7nl.sq/XuWMdAERAaUAzdidIHRf7YXqgYQEYZ4tm'
);

COMMIT;
-- CreateTable: users
CREATE TABLE users (
    id VARCHAR(255) NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    picture TEXT,
    isActive BOOLEAN NOT NULL DEFAULT true,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    application_name TEXT,
    datas JSON,

    PRIMARY KEY (id)
);

-- CreateTable: user_identities
CREATE TABLE user_identities (
    id VARCHAR(255) NOT NULL,
    userId VARCHAR(255) NOT NULL,
    provider ENUM('LOCAL', 'GOOGLE', 'GITHUB', 'FACEBOOK') NOT NULL,
    email VARCHAR(255) NOT NULL,
    password TEXT,
    refreshToken TEXT,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    CONSTRAINT user_identities_userId_fkey FOREIGN KEY (userId) REFERENCES users(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable: password_resets
CREATE TABLE password_resets (
    id VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    token TEXT NOT NULL,
    used BOOLEAN NOT NULL DEFAULT false,
    expiresAt TIMESTAMP NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id)
);

-- Indexes
CREATE INDEX user_identities_email_idx ON user_identities(email);
CREATE UNIQUE INDEX user_identities_email_provider_key ON user_identities(email, provider);
CREATE UNIQUE INDEX user_identities_userId_provider_key ON user_identities(userId, provider);
CREATE INDEX password_resets_email_used_idx ON password_resets(email, used);
CREATE INDEX password_resets_expiresAt_idx ON password_resets(expiresAt);
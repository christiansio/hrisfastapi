-- Add to your initialization script before CREATE TABLE statements
DO $$
BEGIN
    -- Install pgcrypto for UUID generation
    IF NOT EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pgcrypto') THEN
        CREATE EXTENSION "pgcrypto";
        RAISE NOTICE 'pgcrypto extension installed';
    END IF;
    
    -- Install citext for case-insensitive emails
    IF NOT EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'citext') THEN
        CREATE EXTENSION "citext";
        RAISE NOTICE 'citext extension installed';
    END IF;
END $$;

-- Create user table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email CITEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'approver', 'admin')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create sessio table
CREATE TABLE session (
    id CHARACTER(50) NOT NULL,
    user_id UUID NOT NULL,

    CONSTRAINT session_pkey PRIMARY KEY (id),
    CONSTRAINT session_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES users(id)
);
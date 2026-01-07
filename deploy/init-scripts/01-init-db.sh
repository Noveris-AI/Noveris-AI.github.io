#!/bin/bash
set -e

# This script is automatically run on PostgreSQL container first start

echo "Initializing Relationship Repair Assistant database..."

# Create additional extensions if needed
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- Enable useful extensions
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";

    -- Create schema (optional, using public by default)
    -- CREATE SCHEMA IF NOT EXISTS app_schema;

    -- Grant permissions (adjust as needed)
    GRANT ALL PRIVILEGES ON SCHEMA public TO $POSTGRES_USER;
    GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_DB TO $POSTGRES_USER;

    -- Display success message
    SELECT 'Database initialized successfully!' AS status;
EOSQL

echo "Database initialization completed!"

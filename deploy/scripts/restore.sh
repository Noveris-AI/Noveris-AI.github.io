#!/bin/bash

# Restore Script for Relationship Repair Assistant
# Usage: ./scripts/restore.sh <backup_file>

set -e

# Configuration
BACKUP_DIR="./backups"
POSTGRES_USER="${POSTGRES_USER:-postgres}"
POSTGRES_DB="${POSTGRES_DB:-relationship_repair}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if backup file is provided
if [ -z "$1" ]; then
    echo -e "${RED}❌ Error: Please provide a backup file${NC}"
    echo -e "Usage: ${YELLOW}./restore.sh <backup_file>${NC}"
    echo -e "Example: ${YELLOW}./restore.sh backup_20240101_120000.sql.gz${NC}"
    exit 1
fi

BACKUP_FILE="$1"

# Check if file exists
if [ ! -f "$BACKUP_FILE" ]; then
    # Try in backup directory
    if [ -f "$BACKUP_DIR/$BACKUP_FILE" ]; then
        BACKUP_FILE="$BACKUP_DIR/$BACKUP_FILE"
    else
        echo -e "${RED}❌ Error: Backup file not found: $BACKUP_FILE${NC}"
        exit 1
    fi
fi

# Confirm restore
echo -e "${YELLOW}⚠️  WARNING: This will replace all current data!${NC}"
echo -e "   Backup file: ${YELLOW}$BACKUP_FILE${NC}"
echo -e ""
read -p "Are you sure you want to continue? (yes/no): " -r
echo

if [[ ! $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
    echo -e "${GREEN}✅ Restore cancelled${NC}"
    exit 0
fi

echo -e "${GREEN}🔄 Starting restore...${NC}"

# Check if container is running
if ! docker-compose ps | grep -q "relationship_repair_postgres.*Up"; then
    echo -e "${YELLOW}🚀 Starting PostgreSQL container...${NC}"
    docker-compose up -d postgres
    sleep 5
fi

# Decompress if needed
if [[ $BACKUP_FILE == *.gz ]]; then
    echo -e "${YELLOW}📦 Decompressing backup...${NC}"
    gunzip -c "$BACKUP_FILE" | docker-compose exec -T postgres psql \
        -U "$POSTGRES_USER" \
        -d "$POSTGRES_DB"
else
    docker-compose exec -T postgres psql \
        -U "$POSTGRES_USER" \
        -d "$POSTGRES_DB" \
        < "$BACKUP_FILE"
fi

echo -e "${GREEN}✅ Restore completed successfully!${NC}"
echo -e "${GREEN}✨ All done!${NC}"

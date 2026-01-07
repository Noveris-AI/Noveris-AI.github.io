#!/bin/bash

# Backup Script for Relationship Repair Assistant
# Usage: ./scripts/backup.sh

set -e

# Configuration
BACKUP_DIR="./backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
POSTGRES_USER="${POSTGRES_USER:-postgres}"
POSTGRES_DB="${POSTGRES_DB:-relationship_repair}"
CONTAINER_NAME="relationship_repair_postgres"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🔄 Starting backup...${NC}"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Check if container is running
if ! docker ps | grep -q "$CONTAINER_NAME"; then
    echo -e "${RED}❌ Error: Container $CONTAINER_NAME is not running${NC}"
    exit 1
fi

# Backup database
echo -e "${YELLOW}📦 Backing up database...${NC}"
docker-compose exec -T postgres pg_dump \
    -U "$POSTGRES_USER" \
    -d "$POSTGRES_DB" \
    --clean \
    --if-exists \
    --no-owner \
    --no-acl \
    > "$BACKUP_DIR/backup_${TIMESTAMP}.sql"

# Compress backup
echo -e "${YELLOW}🗜️  Compressing backup...${NC}"
gzip "$BACKUP_DIR/backup_${TIMESTAMP}.sql"

# Get file size
BACKUP_SIZE=$(du -h "$BACKUP_DIR/backup_${TIMESTAMP}.sql.gz" | cut -f1)

echo -e "${GREEN}✅ Backup completed successfully!${NC}"
echo -e "   File: ${GREEN}backup_${TIMESTAMP}.sql.gz${NC}"
echo -e "   Size: ${GREEN}${BACKUP_SIZE}${NC}"
echo -e "   Location: ${GREEN}${BACKUP_DIR}/backup_${TIMESTAMP}.sql.gz${NC}"

# Cleanup old backups (keep last 7 days)
echo -e "${YELLOW}🧹 Cleaning up old backups...${NC}"
find "$BACKUP_DIR" -name "backup_*.sql.gz" -mtime +7 -delete

echo -e "${GREEN}✨ All done!${NC}"

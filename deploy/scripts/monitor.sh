#!/bin/bash

# Monitor Script for Relationship Repair Assistant
# Usage: ./scripts/monitor.sh

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}📊 Live Monitor - Relationship Repair Assistant${NC}"
echo "=================================================="
echo ""

# Watch interval
WATCH_INTERVAL=2

while true; do
    clear

    # Header with timestamp
    echo -e "${BLUE}📅 $(date '+%Y-%m-%d %H:%M:%S')${NC}"
    echo ""

    # Container status
    echo -e "${YELLOW}🐳 Containers${NC}"
    docker-compose ps
    echo ""

    # Resource usage
    echo -e "${YELLOW}💾 Resources${NC}"
    docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}"
    echo ""

    # PostgreSQL connections
    if docker ps | grep -q "relationship_repair_postgres"; then
        echo -e "${YELLOW}🗄️  PostgreSQL Connections${NC}"
        docker-compose exec -T postgres psql -U postgres -d relationship_repair -c "
            SELECT
                count(*) as total_connections,
                count(*) FILTER (WHERE state = 'active') as active,
                count(*) FILTER (WHERE state = 'idle') as idle
            FROM pg_stat_activity;" 2>/dev/null || echo "Unable to fetch connection info"
        echo ""
    fi

    # Redis info
    if docker ps | grep -q "relationship_repair_redis"; then
        echo -e "${YELLOW}🔴 Redis Info${NC}"
        docker-compose exec -T redis redis-cli INFO server 2>/dev/null | grep -E "redis_version|uptime_in_days|connected_clients" | head -3
        echo ""
    fi

    # Disk usage
    echo -e "${YELLOW}💿 Disk Usage${NC}"
    df -h | grep -E "(Filesystem|/dev/)"
    echo ""

    # Instructions
    echo -e "${CYAN}Press Ctrl+C to exit${NC}"

    sleep $WATCH_INTERVAL
done

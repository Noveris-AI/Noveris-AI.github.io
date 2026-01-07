#!/bin/bash

# Health Check Script for Relationship Repair Assistant
# Usage: ./scripts/health-check.sh

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🏥 Relationship Repair Assistant - Health Check${NC}"
echo "=================================================="
echo ""

# Function to check service
check_service() {
    local service_name=$1
    local container_name=$2
    local check_command=$3

    echo -n "Checking $service_name... "

    if docker ps | grep -q "$container_name"; then
        if eval "$check_command" > /dev/null 2>&1; then
            echo -e "${GREEN}✅ Healthy${NC}"
            return 0
        else
            echo -e "${YELLOW}⚠️  Running but not responding${NC}"
            return 1
        fi
    else
        echo -e "${RED}❌ Not running${NC}"
        return 2
    fi
}

# Check PostgreSQL
check_service "PostgreSQL" \
    "relationship_repair_postgres" \
    "docker-compose exec -T postgres pg_isready -U postgres"

# Check Redis
check_service "Redis" \
    "relationship_repair_redis" \
    "docker-compose exec -T redis redis-cli ping"

# Check PgAdmin (if running)
if docker ps | grep -q "relationship_repair_pgadmin"; then
    check_service "PgAdmin" \
        "relationship_repair_pgadmin" \
        "curl -f http://localhost:5050 > /dev/null 2>&1 || exit 0"
fi

# Check Redis Commander (if running)
if docker ps | grep -q "relationship_repair_redis_commander"; then
    check_service "Redis Commander" \
        "relationship_repair_redis_commander" \
        "curl -f http://localhost:8081 > /dev/null 2>&1 || exit 0"
fi

echo ""
echo "=================================================="
echo -e "${BLUE}📊 Container Status${NC}"
docker-compose ps

echo ""
echo "=================================================="
echo -e "${BLUE}💾 Resource Usage${NC}"
docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}"

echo ""
echo "=================================================="
echo -e "${BLUE}📝 Recent Logs (last 20 lines)${NC}"
echo -e "${YELLOW}PostgreSQL:${NC}"
docker-compose logs --tail=20 postgres 2>&1 | grep -E "(error|ERROR|FATAL|warning|WARNING)" || echo "No errors found"

echo ""
echo -e "${YELLOW}Redis:${NC}"
docker-compose logs --tail=20 redis 2>&1 | grep -E "(error|ERROR|FATAL|warning|WARNING)" || echo "No errors found"

echo ""
echo "=================================================="
echo -e "${GREEN}✨ Health check completed!${NC}"

# Exit with error code if any service is unhealthy
if ! docker-compose ps | grep -q "Exit"; then
    exit 0
else
    exit 1
fi

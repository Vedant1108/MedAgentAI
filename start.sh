#!/bin/bash

# ─────────────────────────────────────────────
#  MedAgent — Full Stack Startup Script
# ─────────────────────────────────────────────

ROOT="$(cd "$(dirname "$0")" && pwd)"
BACKEND="$ROOT/backend"
FRONTEND="$ROOT"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

log()  { echo -e "${GREEN}[✓]${NC} $1"; }
info() { echo -e "${CYAN}[→]${NC} $1"; }
warn() { echo -e "${YELLOW}[!]${NC} $1"; }
err()  { echo -e "${RED}[✗]${NC} $1"; }

# ── Cleanup on exit ──────────────────────────
cleanup() {
  echo ""
  warn "Shutting down all services..."
  kill "$BACKEND_PID" "$FRONTEND_PID" 2>/dev/null
  wait "$BACKEND_PID" "$FRONTEND_PID" 2>/dev/null
  log "All services stopped. Goodbye!"
  exit 0
}
trap cleanup SIGINT SIGTERM

# ── 1. Free ports if occupied ────────────────
info "Checking port 8000..."
OCCUPYING=$(lsof -ti:8000 2>/dev/null)
if [ -n "$OCCUPYING" ]; then
  warn "Port 8000 occupied by PID(s): $OCCUPYING — killing..."
  echo "$OCCUPYING" | xargs kill -9 2>/dev/null
  sleep 1
fi
log "Port 8000 is free."

info "Checking port 3000..."
OCCUPYING3=$(lsof -ti:3000 2>/dev/null)
if [ -n "$OCCUPYING3" ]; then
  warn "Port 3000 occupied by PID(s): $OCCUPYING3 — killing..."
  echo "$OCCUPYING3" | xargs kill -9 2>/dev/null
  sleep 1
fi
log "Port 3000 is free."

# ── 2. Start the Database (Docker) ───────────
info "Starting PostgreSQL via Docker..."
docker compose -f "$ROOT/docker-compose.yml" up -d 2>&1 | tail -2
log "Database is up."

# ── 3. Start the Backend ─────────────────────
info "Starting FastAPI backend..."
if [ ! -d "$BACKEND/venv" ]; then
  err "venv not found at $BACKEND/venv — run: cd backend && python -m venv venv && pip install -r requirements.txt"
  exit 1
fi
source "$BACKEND/venv/bin/activate"
cd "$BACKEND"
uvicorn src.main:app --reload --port 8000 &
BACKEND_PID=$!
log "Backend started (PID: $BACKEND_PID) → http://localhost:8000"

# ── 4. Start the Frontend ─────────────────────
info "Starting Next.js frontend..."
cd "$FRONTEND"
npm run dev &
FRONTEND_PID=$!
log "Frontend started (PID: $FRONTEND_PID) → http://localhost:3000"

# ── 5. Summary ───────────────────────────────
echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}  🚀 MedAgent is running!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "  Frontend  →  ${CYAN}http://localhost:3000${NC}"
echo -e "  Backend   →  ${CYAN}http://localhost:8000${NC}"
echo -e "  API Docs  →  ${CYAN}http://localhost:8000/docs${NC}"
echo -e "  Database  →  ${CYAN}localhost:5433${NC} (PostgreSQL)"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "  Press ${RED}Ctrl+C${NC} to stop all services."
echo ""

# Keep alive
wait
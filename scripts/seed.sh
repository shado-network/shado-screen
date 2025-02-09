echo "scripts/SEED"

tsc && node --loader ts-node/esm src/data/database/seed.ts

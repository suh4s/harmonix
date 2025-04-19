#!/bin/bash

# Activate virtual environment if it exists
if [ -d "venv" ]; then
    source venv/bin/activate
fi

# Set environment variables
export PYTHONPATH=$(pwd)

# Run Alembic migrations
alembic upgrade head 
#!/bin/bash

# Activate virtual environment if it exists
if [ -d "venv" ]; then
    source venv/bin/activate
fi

# Set environment variables for development
export PYTHONPATH=$PYTHONPATH:$(pwd)

# Run the FastAPI application with hot reload
uvicorn main:app --reload --host 0.0.0.0 --port 8000 
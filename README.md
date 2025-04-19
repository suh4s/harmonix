# Harmonix - ConsultantAI

A powerful AI consultant system built using LangChain, FastAPI, Next.js, and LangGraph.

## Features

- AI-powered consultation and analysis
- Secure user authentication
- Customizable AI personalities
- Document processing and insights extraction
- Multi-turn conversation history
- Integration with external knowledge bases

## Project Structure

```
harmonix/
├── frontend/               # Next.js frontend application
├── backend/                # FastAPI backend application
├── shared/                 # Shared code between frontend and backend
├── scripts/                # Utility scripts
├── docs/                   # Documentation
├── tests/                  # Tests
└── tasks/                  # Task management files
```

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+
- PostgreSQL 14+
- API keys for LLM providers (Anthropic, etc.)
- LangSmith account for observability

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/harmonix.git
   cd harmonix
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your API keys and configuration
   ```

3. Install dependencies:
   ```bash
   # Backend
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt

   # Frontend
   cd ../frontend
   npm install
   ```

### Running the Application

1. Start the backend:
   ```bash
   cd backend
   uvicorn app.main:app --reload
   ```

2. Start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```

3. Access the application at `http://localhost:3000`

## Development Workflow

This project uses TaskMaster for task management:

```bash
# Show next task to work on
task-master next

# Mark a task as in-progress
task-master set-status --id=1 --status="in-progress"

# Mark a task as done
task-master set-status --id=1 --status="done"
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

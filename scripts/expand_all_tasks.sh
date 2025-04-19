#!/bin/bash

# Script to attempt expanding all main tasks in tasks.json

# Define the range of task IDs
START_ID=1
END_ID=15

# Navigate to the project root if the script is run from elsewhere
# Assuming the script is in consultantai/scripts
cd "$(dirname "$0")/.."

echo "Attempting to clear and expand tasks $START_ID to $END_ID..."

for (( id=$START_ID; id<=$END_ID; id++ ))
do
  echo "--- Processing Task ID: $id ---"

  # Clear existing subtasks (might fail if ID format is the issue)
  echo "Clearing subtasks for ID: $id"
  task-master clear-subtasks --id="$id"
  if [ $? -ne 0 ]; then
    echo "Warning: Failed to clear subtasks for ID $id (Task may not exist or already has no subtasks)"
  fi

  # Attempt to expand the task with research (might fail)
  echo "Expanding task ID: $id with research and force..."
  task-master expand --id="$id" --research --force
  if [ $? -ne 0 ]; then
    echo "Warning: Failed to expand task ID $id (Task may not be found or other error occurred)"
  fi

  echo "--- Finished processing Task ID: $id ---"
  echo ""
sleep 1 # Add a small delay between API calls if needed
done

echo "Script finished."

# Note: Based on previous errors, the expand command might fail with 'Task not found'.
# The existing tasks.json already contains detailed subtasks. 
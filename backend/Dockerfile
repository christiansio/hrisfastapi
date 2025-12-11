# Use Python 3.10 slim image as base for smaller size
FROM python:3.10-slim

# Set working directory inside container
WORKDIR /code

# Copy requirements file first (for layer caching optimization)
# This way, dependencies are only reinstalled if requirements.txt changes
COPY requirements.txt .

# Install Python dependencies
# --no-cache-dir: Reduces image size by not storing pip cache
# --upgrade: Ensures latest compatible versions are installed
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# Copy the entire application code into the container
COPY . .

# Expose port 8000 for the FastAPI application
EXPOSE 8000

# Run the application using uvicorn
# --host 0.0.0.0: Makes the server accessible from outside the container
# --port 8000: Specifies the port to run on
# Note: --reload flag is removed for production use
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
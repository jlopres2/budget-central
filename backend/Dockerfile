# backend/Dockerfile

FROM python:3.11-slim

# Set environment variables to improve performance and debugging
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your Django project into the container
COPY . .

# Run Django server on container startup
CMD ["python", "manage.py", "runserver", "127.0.0.1:8000"]
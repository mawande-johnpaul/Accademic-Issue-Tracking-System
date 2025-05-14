# Use Python base image
FROM python:3.10-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install pip and pipenv
RUN pip install --upgrade pip
RUN pip install pipenv

# Copy Pipfile (from backend folder)
COPY backend/Pipfile /app/
# Optional: if you have Pipfile.lock
# COPY backend/Pipfile.lock /app/

# Install Python dependencies
RUN pipenv install --skip-lock

# Copy the whole project
COPY . /app/

# Set working directory to backend
WORKDIR /app/backend

# Run Django setup commands
RUN pipenv run python manage.py collectstatic --noinput
RUN pipenv run python manage.py migrate

# Expose port
EXPOSE 8000

# Start the app
CMD ["pipenv", "run", "gunicorn", "AITS.wsgi:application", "--bind", "0.0.0.0:8000"]

# Use official Python image
FROM python:3.10-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set work directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Upgrade pip
RUN pip install --upgrade pip

# Copy requirements.txt
COPY /requirements.txt /app/

# Install dependencies
RUN pip install -r requirements.txt

# Copy project files
COPY . /app/

# Change directory to backend
WORKDIR /app/backend

# Collect static files and migrate
RUN python manage.py collectstatic --noinput
RUN python manage.py migrate

# Expose the port
EXPOSE 8000

# Start server
CMD ["gunicorn", "AITS.wsgi:application", "--bind", "0.0.0.0:8000"]

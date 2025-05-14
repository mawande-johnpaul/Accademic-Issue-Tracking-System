# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install pipenv
RUN pip install --upgrade pip
RUN pip install pipenv

# Copy Pipfile and Pipfile.lock
COPY Pipfile /app/

# Install Python dependencies
RUN pipenv install --deploy --ignore-pipfile --skip-lock

# Copy the entire project
COPY . /app/

# Set the working directory to the backend
WORKDIR /app/backend

# Collect static files and apply migrations
RUN pipenv run python manage.py collectstatic --noinput
RUN pipenv run python manage.py migrate

# Expose the port the app runs on
EXPOSE 8000

# Define the default command to run the application
CMD ["pipenv", "run", "gunicorn", "AITS.wsgi:application", "--bind", "0.0.0.0:8000"]

FROM python:3.10-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip

COPY /requirements.txt /app/

RUN pip install -r requirements.txt

COPY . /app/

WORKDIR /app/backend

RUN python manage.py collectstatic --noinput
#RUN python manage.py migrate

EXPOSE 8000



FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc g++ && rm -rf /var/lib/apt/lists/*

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy all project files
COPY . .

# Create writable directory for SQLite
RUN mkdir -p /tmp/data

# Expose port 7860 (Hugging Face default)
EXPOSE 7860

ENV PORT=7860

CMD ["python", "hf_app.py"]

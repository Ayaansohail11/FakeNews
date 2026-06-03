"""
hf_app.py - Hugging Face Spaces entry point
Runs the Flask backend on port 7860
"""
import os
from dotenv import load_dotenv
load_dotenv()  # load .env if present locally

os.environ['DB_PATH'] = '/tmp/news_cache.db'

# HF Spaces injects secrets as env vars automatically.
# Print which keys are available (no values) for debugging.
print("[HF] GROQ_API_KEY set:", bool(os.getenv('GROQ_API_KEY')))
print("[HF] GOOGLE_GENAI_KEY set:", bool(os.getenv('GOOGLE_GENAI_KEY')))
print("[HF] NEWSAPI_KEY set:", bool(os.getenv('NEWSAPI_KEY')))

from news_scraper import start_scheduler
start_scheduler()  # init DB + immediate scrape + schedule every 30min

from backend_api import app

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=7860, debug=False)

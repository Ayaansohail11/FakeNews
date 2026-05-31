"""
hf_app.py - Hugging Face Spaces entry point
Runs the Flask backend on port 7860
"""
import os
os.environ['DB_PATH'] = '/tmp/news_cache.db'

from news_scraper import start_scheduler
start_scheduler()  # init DB + immediate scrape + schedule every 30min

from backend_api import app

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=7860, debug=False)

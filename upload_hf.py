from huggingface_hub import HfApi
import os
from dotenv import load_dotenv
load_dotenv()

api = HfApi(token=os.getenv('HF_TOKEN', ''))
repo_id = "AyaanS123/FakeNewsSpace"

files = [
    "backend_api.py",
    "hf_app.py",
    "requirements.txt",
    "preprocess.py",
    "dl_predictor.py",
    "fact_swarm.py",
    "news_scraper.py",
    "Dockerfile",
]

for f in files:
    if os.path.exists(f):
        print(f"Uploading {f}...")
        api.upload_file(
            path_or_fileobj=f,
            path_in_repo=f,
            repo_id=repo_id,
            repo_type="space"
        )
        print(f"  Done: {f}")
    else:
        print(f"  SKIP (not found): {f}")

print("\nAll done! HF Space will restart automatically.")

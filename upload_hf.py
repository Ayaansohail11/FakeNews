from huggingface_hub import HfApi
import os

api = HfApi(token=os.getenv('HF_TOKEN', ''))
repo_id = "AyaanS123/FakeNewsSpace"

files = [
    "backend_api.py",
    "preprocess.py",
    "dl_predictor.py",
    "fact_swarm.py",
    "news_scraper.py",
    "requirements.txt",
    "Dockerfile",
    "hf_app.py",
    "tfidf_vectorizer.pkl",
    "models/decision_tree.pkl",
    "models/gradient_boosting.pkl",
    "models/linear_svc.pkl",
    "models/logistic_regression.pkl",
    "models/random_forest.pkl",
    "models/ml_metrics.pkl",
    "saved_model/tokenizer.pkl",
    "saved_model/attention_bilstm_model.keras",
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

print("\nAll files uploaded!")

import sys, json
import pandas as pd
from collections import Counter
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

CSV_PATH = "public/data/nasa_papers_meta_cleaned.csv"

print("⚡ Python script started", flush=True)

def load_data(csv_path):
    print("📂 Loading dataset...", flush=True)
    df = pd.read_csv(csv_path)
    print(f"✅ Loaded {len(df)} rows", flush=True)
    df = df[
        (df['Organism'] != 'N/A') &
        ((df['Gravity_Condition'] != 'N/A') | 
         (df['Experimental_Type'].isin(['Radiation', 'Microgravity'])))
    ]
    df['Abstract'] = df['Abstract'].fillna('')
    print(f"✅ Filtered dataset to {len(df)} rows", flush=True)
    return df

def build_semantic_index(df):
    print("🔎 Building TF-IDF index...", flush=True)
    abstracts = df['Abstract'].tolist()
    vectorizer = TfidfVectorizer(max_features=1000, stop_words='english')
    tfidf_matrix = vectorizer.fit_transform(abstracts)
    print("✅ Index built", flush=True)
    return vectorizer, tfidf_matrix

# (other functions unchanged...)

if __name__ == "__main__":
    print("🚀 Entry point reached", flush=True)

    if len(sys.argv) < 2:
        print(json.dumps({"error": "No query provided"}))
        sys.exit(1)

    query = sys.argv[1].lower()
    print(f"🔍 Query received: {query}", flush=True)

    try:
        df = load_data(CSV_PATH)
        vectorizer, tfidf_matrix = build_semantic_index(df)
        print("✅ Data and model ready", flush=True)

        params = {}
        if "mouse" in query or "mice" in query: params["organism"] = "mouse"
        if "rat" in query: params["organism"] = "rat"
        if "human" in query: params["organism"] = "human"
        if "liver" in query: params["tissue"] = "liver"
        if "heart" in query: params["tissue"] = "heart"
        if "microgravity" in query: params["condition"] = "microgravity"
        if "radiation" in query: params["condition"] = "radiation"

        print(f"🛠 Params parsed: {params}", flush=True)

        result = generate_prediction(params, df, vectorizer, tfidf_matrix)
        print("✅ Prediction complete", flush=True)

        print(json.dumps(result), flush=True)

    except Exception as e:
        print("❌ ERROR in Python:", str(e), flush=True)
        sys.exit(1)

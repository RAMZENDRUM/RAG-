import os
import json
import pandas as pd
from datasets import Dataset
from ragas import evaluate
from ragas.metrics import (
    faithfulness,
    answer_relevancy,
    context_recall,
    context_precision,
)
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv

from langchain_openai import OpenAIEmbeddings

load_dotenv()

# 1. SETUP EVALUATION MODELS (Using NVIDIA NIM)
eval_model = ChatOpenAI(
    model="meta/llama-3.3-70b-instruct",
    openai_api_key=os.getenv("NVIDIA_API_KEY"),
    openai_api_base="https://integrate.api.nvidia.com/v1"
)

eval_embeddings = OpenAIEmbeddings(
    model="nvidia/llama-3.2-1b-instruct", # Using a smaller model for fast embeddings
    openai_api_key=os.getenv("NVIDIA_API_KEY"),
    openai_api_base="https://integrate.api.nvidia.com/v1"
)

# 2. DEFINE THE 'GOLDEN DATASET' (MSAJCE Institutional Truth)
test_data = {
    "question": [
        "Who is the principal of MSAJCE?",
        "What is the intake for the IT department?",
        "Which bus route goes through Velachery?",
        "Who developed the Aura Concierge system?",
        "Is there a hostel facility available?"
    ],
    "contexts": [
        ["Dr.K.S.Srinivasan is the Principal of MSAJCE."],
        ["The Information Technology (IT) department has a total intake of 60 seats."],
        ["MTC Bus 570 and 570S pass through Velachery."],
        ["Aura Concierge was developed by Ramanathan S (Ram), a 2nd year IT student."],
        ["Yes, the college provides separate hostel facilities for boys and girls with all amenities."]
    ],
    "answer": [
        "The Principal of Mohamed Sathak A. J. College of Engineering is Dr.K.S.Srinivasan.",
        "For the IT department, we have a total of 60 seats available for prospective students.",
        "Our students can reach Velachery using the MTC bus routes 570 and 570S.",
        "This AI system, Aura, was proudly developed by Ramanathan S, also known as Ram, a 2nd year student at MSAJCE.",
        "Yes, certainly! MSAJCE provides comfortable hostel accommodation for both boys and girls."
    ],
    "ground_truth": [
        "Dr.K.S.Srinivasan is the Principal.",
        "Intake for IT is 60 seats.",
        "MTC 570 and 570S go to Velachery.",
        "Developed by Ramanathan S (Ram).",
        "Hostels are available for boys and girls."
    ]
}

dataset = Dataset.from_dict(test_data)

async def run_evaluation():
    print("Starting Ragas Evaluation for MSAJCE Aura...")
    
    # 3. EXECUTE METRICS
    result = evaluate(
        dataset,
        metrics=[
            faithfulness,
            answer_relevancy,
            context_recall,
            context_precision
        ],
        llm=eval_model,
        embeddings=eval_embeddings
    )
    
    print("\n[AURA SCORECARD (Ragas v0.4.3)]")
    print("---------------------------------")
    print(result)
    
    # Save to CSV for the user
    df = result.to_pandas()
    df.to_csv("production_data/aura_ragas_scorecard.csv", index=False)
    print(f"\nDetailed Scorecard saved to: production_data/aura_ragas_scorecard.csv")

if __name__ == "__main__":
    import asyncio
    asyncio.run(run_evaluation())

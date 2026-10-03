import sys
import os

# Add parent to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from src.ai.rag import add_medical_context

MOCK_GUIDELINES = [
    {
        "id": "cdc-vitamin-d",
        "metadata": {"source": "CDC", "topic": "Vitamin D"},
        "text": "Vitamin D levels below 20 ng/mL are considered deficient. Levels between 20-29 ng/mL are insufficient. Normal levels are 30-100 ng/mL. Severe deficiency can lead to bone diseases. Supplementation of 1000-4000 IU daily is often recommended for deficiency."
    },
    {
        "id": "who-cholesterol",
        "metadata": {"source": "WHO", "topic": "Cholesterol"},
        "text": "Total cholesterol levels above 200 mg/dL are considered borderline high, and above 240 mg/dL is high. High cholesterol increases the risk of cardiovascular diseases. Dietary changes reducing saturated fats and increasing physical activity are primary interventions."
    },
    {
        "id": "icmr-fever-headache",
        "metadata": {"source": "ICMR", "topic": "Viral Infections"},
        "text": "The combination of fever and headache is often indicative of acute viral infections such as influenza, dengue, or common seasonal viruses. Management includes hydration, antipyretics like paracetamol, and rest. If fever persists beyond 3 days or is accompanied by severe symptoms, consult a physician."
    },
    {
        "id": "cdc-hypertension",
        "metadata": {"source": "CDC", "topic": "Blood Pressure"},
        "text": "Normal blood pressure is below 120/80 mmHg. Hypertension stage 1 is 130-139 systolic or 80-89 diastolic. Lifestyle modifications including sodium restriction, DASH diet, and exercise are first-line treatments."
    }
]

def seed_chroma():
    print("Seeding ChromaDB with medical guidelines...")
    
    documents = [item["text"] for item in MOCK_GUIDELINES]
    metadatas = [item["metadata"] for item in MOCK_GUIDELINES]
    ids = [item["id"] for item in MOCK_GUIDELINES]
    
    add_medical_context(documents, metadatas, ids)
    print(f"Successfully added {len(MOCK_GUIDELINES)} documents to ChromaDB.")

if __name__ == "__main__":
    seed_chroma()

import chromadb
from chromadb.utils import embedding_functions

# Use a fast, local embedding model
sentence_transformer_ef = embedding_functions.SentenceTransformerEmbeddingFunction(model_name="all-MiniLM-L6-v2")

# Initialize ChromaDB client (local persistent storage)
client = chromadb.PersistentClient(path="./chroma_db")

# Get or create collections for medical knowledge
medical_collection = client.get_or_create_collection(
    name="medical_guidelines",
    embedding_function=sentence_transformer_ef
)

def add_medical_context(documents: list[str], metadatas: list[dict], ids: list[str]):
    """Add medical context chunks to the vector database."""
    medical_collection.add(
        documents=documents,
        metadatas=metadatas,
        ids=ids
    )

def query_medical_context(query_texts: list[str], n_results: int = 3) -> list[str]:
    """Search the vector database for relevant medical context."""
    results = medical_collection.query(
        query_texts=query_texts,
        n_results=n_results
    )
    
    if not results['documents'] or not results['documents'][0]:
        return []
    
    return results['documents'][0]

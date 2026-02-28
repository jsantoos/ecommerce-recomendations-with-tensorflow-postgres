# 🛍️ E-commerce Recommendation System

## Two-Stage Architecture with Vector Retrieval + Neural Re-ranking

This project implements a **modern two-stage recommendation system**
combining:

-   🔎 **Vector Retrieval (ANN)** using PostgreSQL + pgvector\
-   🧠 **Neural Re-ranking** using TensorFlow.js

The system demonstrates how scalable production recommender systems
operate by separating:

1.  **Candidate Generation (Approximate Nearest Neighbor Search)**
2.  **Deep Neural Ranking**

------------------------------------------------------------------------

# 🧠 Architecture Overview

    Frontend (Web + TensorFlow.js Worker)
            │
            ├── Train Neural Model
            │
            ├── Generate Product Embeddings
            │
            ├── Send Embeddings → Backend API
            │
    Backend (Node.js + Express)
            │
            ├── Store Embeddings in PostgreSQL
            │
            ├── Perform ANN Search (pgvector)
            │
    Database (PostgreSQL 16 + pgvector)
            │
            └── ivfflat Vector Index

------------------------------------------------------------------------

# 🚀 Technologies Used

-   TensorFlow.js
-   PostgreSQL 16
-   pgvector
-   Express.js
-   Docker
-   Web Workers
-   Node.js (ES Modules)

------------------------------------------------------------------------

# 📂 Project Structure

    .
    ├── docker-compose.yml
    ├── .env.example
    ├── README.md
    ├── data/
    │   ├── products.json
    │   └── users.json
    └── src/
        ├── controller/
        ├── service/
        ├── view/
        ├── workers/
        │    └── modelTrainingWorker.js
        └── backend/
             ├── server.js
             ├── db.js
             ├── vectorSearch.js
             ├── package.json

------------------------------------------------------------------------

# ⚙️ Setup Instructions

## 1️⃣ Clone the Repository

``` bash
git clone <ecommerce-recomendations-with-tensorflow-postgres>
cd <ecommerce-recomendations-with-tensorflow-postgres>
```

------------------------------------------------------------------------

## 2️⃣ Configure Environment Variables

Create a `.env` file in the project root:

``` bash
cp .env.example .env
```

Example `.env`:

``` env
POSTGRES_USER=ecommerce
POSTGRES_PASSWORD=ecommerce
POSTGRES_DB=ecommerce
POSTGRES_PORT=5432

DB_HOST=localhost
DB_PORT=5432
DB_USER=ecommerce
DB_PASSWORD=ecommerce
DB_NAME=ecommerce
PORT=3001

VECTOR_DIM=14
```

------------------------------------------------------------------------

## 3️⃣ Start PostgreSQL (Vector Database)

``` bash
docker compose up -d
```

------------------------------------------------------------------------

## 4️⃣ Create Vector Table

``` bash
docker exec -it ecommerce-vector-db psql -U ecommerce -d ecommerce
```

``` sql
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE product_embeddings (
    product_id TEXT PRIMARY KEY,
    embedding VECTOR(14)
);

CREATE INDEX idx_product_embedding
ON product_embeddings
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);
```

------------------------------------------------------------------------

## 5️⃣ Start Backend API

``` bash
cd src/backend
npm install
node server.js
```

Expected output:

    Vector API running on http://localhost:3001

------------------------------------------------------------------------

## 6️⃣ Start Frontend

Start the frontend server (e.g., Live Server or `npm start`).

Open:

    http://localhost:8080

------------------------------------------------------------------------

# 🔄 System Flow

## 🔵 Training Phase

1.  Neural model trains using user purchase history.
2.  Product embeddings are generated.
3.  Embeddings are sent to backend.
4.  Backend stores embeddings in PostgreSQL (pgvector).

------------------------------------------------------------------------

## 🟢 Recommendation Phase

1.  User vector is generated.
2.  Backend performs ANN search (Top-K similar products).
3.  Neural network re-ranks candidates.
4.  Sorted recommendations are returned.

------------------------------------------------------------------------

# 🔬 How to Validate Vector Retrieval

To confirm the system is using the vector database:

``` sql
DELETE FROM product_embeddings;
```

Click **Recommend**.

If no products are returned, retrieval is correctly being used (no
in-memory fallback).

------------------------------------------------------------------------

# 📈 Why Two-Stage Architecture?

Without retrieval:

O(N) comparisons against all products

With vector search:

O(log N) + O(K)

Where: - N = total products - K = number of candidates retrieved (e.g.,
200)

------------------------------------------------------------------------

# 🎓 Academic Context

This project demonstrates:

-   Approximate Nearest Neighbor Search
-   Deep Learning Re-ranking
-   Separation of Concerns
-   Scalable Recommendation Architecture

Developed as part of an AI Engineering postgraduate program.

------------------------------------------------------------------------

# 🏁 Current Status

-   ✅ Two-Stage Recommender
-   ✅ pgvector Integration
-   ✅ Dockerized Database
-   ✅ Environment-based Configuration
-   ✅ Production-like Architecture

------------------------------------------------------------------------

# 📌 License

For academic and educational purposes.

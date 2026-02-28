import express from "express"
import { pool } from "./db.js"

const router = express.Router()

router.post("/index", async (req, res) => {
    console.log("🔥 INDEX ROUTE HIT")
    try {
      const { products } = req.body
  
      for (const p of products) {
        const formattedVector = `[${p.vector.join(",")}]`
        await pool.query(
        `
        INSERT INTO product_embeddings (product_id, embedding)
        VALUES ($1, $2::vector)
        ON CONFLICT (product_id)
        DO UPDATE SET embedding = $2::vector
        `,
        [p.name, formattedVector]
        )
      }
  
      res.json({ status: "Indexed successfully" })
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: "Indexing failed" })
    }
  })


router.post("/search", async (req, res) => {
    console.log("🔎 SEARCH ROUTE HIT")
    try {
      const { vector, k } = req.body
  
      const formattedVector = `[${vector.join(",")}]`
  
      const result = await pool.query(
        `
        SELECT product_id
        FROM product_embeddings
        ORDER BY embedding <=> $1::vector
        LIMIT $2
        `,
        [formattedVector, k || 200]
      )
  
      res.json(result.rows)
  
    } catch (err) {
      console.error("Vector search error:", err)
      res.status(500).json({ error: "Internal server error" })
    }
})

export default router
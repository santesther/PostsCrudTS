import { Pool } from "pg"

// Criar pool de conexão com o PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? false : false, // Desativado para desenvolvimento local
})

// Função para executar queries
export async function query(text: string, params?: any[]) {
  try {
    const start = Date.now()
    const res = await pool.query(text, params)
    const duration = Date.now() - start
    console.log("Executed query", { text, duration, rows: res.rowCount })
    return res
  } catch (error) {
    console.error("Error executing query:", error)
    throw error
  }
}

// Função para verificar a conexão com o banco
export async function checkConnection() {
  try {
    const client = await pool.connect()
    client.release()
    console.log("Database connection successful")
    return true
  } catch (error) {
    console.error("Database connection error:", error)
    return false
  }
}

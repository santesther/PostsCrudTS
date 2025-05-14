"use server"

import { v4 as uuidv4 } from "uuid"
import { revalidatePath } from "next/cache"
import { query } from "./db"

// Ler todos os posts
export async function getPosts() {
  try {
    const result = await query("SELECT * FROM posts ORDER BY created_at DESC", [])
    return result.rows
  } catch (error) {
    console.error("Erro ao ler posts:", error)
    return []
  }
}

// Obter um post específico por ID
export async function getPostById(id: string) {
  try {
    const result = await query("SELECT * FROM posts WHERE id = $1", [id])
    return result.rows[0] || null
  } catch (error) {
    console.error("Erro ao buscar post:", error)
    return null
  }
}

// Criar um novo post
export async function createPost(title: string, content: string) {
  try {
    const id = uuidv4()
    const result = await query("INSERT INTO posts (id, title, content) VALUES ($1, $2, $3) RETURNING *", [
      id,
      title,
      content,
    ])

    revalidatePath("/")
    return result.rows[0]
  } catch (error) {
    console.error("Erro ao criar post:", error)
    throw new Error("Falha ao criar post")
  }
}

// Atualizar um post existente
export async function updatePost(id: string, title: string, content: string) {
  try {
    const result = await query("UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *", [
      title,
      content,
      id,
    ])

    if (result.rowCount === 0) {
      throw new Error("Post não encontrado")
    }

    revalidatePath("/")
    revalidatePath(`/edit/${id}`)
    return result.rows[0]
  } catch (error) {
    console.error("Erro ao atualizar post:", error)
    throw new Error("Falha ao atualizar post")
  }
}

// Excluir um post
export async function deletePost(formData: FormData) {
  const id = formData.get("id") as string

  try {
    await query("DELETE FROM posts WHERE id = $1", [id])
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Erro ao excluir post:", error)
    throw new Error("Falha ao excluir post")
  }
}

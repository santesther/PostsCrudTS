"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createPost, updatePost } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Link from "next/link"

type Post = {
  id: string
  title: string
  content: string
  created_at: string // Alterado de createdAt para created_at para corresponder ao PostgreSQL
}

export function PostForm({ post }: { post?: Post }) {
  const router = useRouter()
  const [title, setTitle] = useState(post?.title || "")
  const [content, setContent] = useState(post?.content || "")
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (post) {
        await updatePost(post.id, title, content)
      } else {
        await createPost(title, content)
      }
      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("Erro ao salvar post:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Digite o título do post"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">Conteúdo</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          placeholder="Digite o conteúdo do post"
          rows={6}
        />
      </div>
      <div className="flex justify-end gap-2">
        <Link href="/">
          <Button variant="outline" type="button">
            Cancelar
          </Button>
        </Link>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : post ? "Atualizar" : "Criar"}
        </Button>
      </div>
    </form>
  )
}

import Link from "next/link"
import { getPosts, deletePost } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Edit, Plus } from "lucide-react"

export default async function Home() {
  const posts = await getPosts()

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Posts</h1>
        <Link href="/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Post
          </Button>
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">Nenhum post encontrado. Crie seu primeiro post!</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{new Date(post.created_at).toLocaleDateString("pt-BR")}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3">{post.content}</p>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <form action={deletePost}>
                  <input type="hidden" name="id" value={post.id} />
                  <Button variant="destructive" size="icon" type="submit">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </form>
                <Link href={`/edit/${post.id}`}>
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </main>
  )
}

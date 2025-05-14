import { PostForm } from "@/components/post-form"
import { getPostById } from "@/lib/actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { notFound } from "next/navigation"

interface PageParams {
  id: string
}

export default async function EditPostPage({ params }: { params: PageParams }) {
  const post = await getPostById(params.id)

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Editar Post</CardTitle>
        </CardHeader>
        <CardContent>
          <PostForm post={post} />
        </CardContent>
      </Card>
    </div>
  )
}

import { PostForm } from "@/components/post-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CreatePostPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Criar Novo Post</CardTitle>
        </CardHeader>
        <CardContent>
          <PostForm />
        </CardContent>
      </Card>
    </div>
  )
}

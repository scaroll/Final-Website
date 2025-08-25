import { MediaGallery } from "@/components/MediaGallery"

export default function GalleryPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Media Gallery</h1>
          <p className="text-muted-foreground">Browse and manage all your uploaded media files</p>
        </div>

        <MediaGallery />
      </div>
    </div>
  )
}

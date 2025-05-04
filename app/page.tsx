import { FileUploader } from "@/components/file-uploader"
import { Hero } from "@/components/hero"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow bg-gradient-to-b from-white to-gray-100">
        <Hero />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <FileUploader />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

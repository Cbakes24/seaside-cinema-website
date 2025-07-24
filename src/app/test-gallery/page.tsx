import Gallery from '../components/Gallery';
import SimpleGallery from '../components/SimpleGallery';
import ImageTest from '../components/ImageTest';

export default function TestGalleryPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Gallery Test Page</h1>
        
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-6">Image Loading Test</h2>
            <p className="text-gray-600 mb-4">Test if images are accessible from public directory</p>
            <ImageTest />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Simple Gallery (Debug Version)</h2>
            <p className="text-gray-600 mb-4">Using regular img tags instead of Next.js Image component</p>
            <SimpleGallery maxImages={8} />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Original Gallery (Next.js Image)</h2>
            <p className="text-gray-600 mb-4">Using Next.js Image component</p>
            <Gallery maxImages={8} />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Limited Gallery (6 Images)</h2>
            <Gallery maxImages={6} />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">JPEG Only</h2>
            <Gallery 
              imageExtensions={['.jpg', '.jpeg', '.JPG', '.JPEG']}
              maxImages={8}
            />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">PNG Only</h2>
            <Gallery 
              imageExtensions={['.png', '.PNG']}
              maxImages={10}
            />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Custom Grid (2x2)</h2>
            <Gallery 
              gridCols={{
                sm: 1,
                md: 2,
                lg: 2,
                xl: 2,
                '2xl': 2
              }}
              maxImages={4}
            />
          </section>
        </div>
      </div>
    </div>
  );
} 

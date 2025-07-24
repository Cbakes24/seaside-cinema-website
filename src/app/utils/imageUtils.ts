// Utility functions for image handling

export interface GalleryImage {
  src: string;
  alt: string;
  filename: string;
  width?: number;
  height?: number;
}

// Common image extensions
export const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.JPG', '.JPEG', '.PNG', '.WEBP', '.GIF'];

// Function to generate alt text from filename
export const generateAltText = (filename: string): string => {
  // Remove file extension
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
  
  // Convert camelCase, snake_case, or kebab-case to readable text
  const readableName = nameWithoutExt
    .replace(/([A-Z])/g, ' $1') // Add space before capital letters
    .replace(/[-_]/g, ' ') // Replace hyphens and underscores with spaces
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, l => l.toUpperCase()); // Capitalize first letter of each word
  
  return readableName;
};

// Function to filter images by extension
export const filterImagesByExtension = (
  images: GalleryImage[],
  extensions: string[] = IMAGE_EXTENSIONS
): GalleryImage[] => {
  return images.filter(img => 
    extensions.some(ext => img.filename.toLowerCase().endsWith(ext.toLowerCase()))
  );
};

// Function to sort images (you can customize this)
export const sortImages = (images: GalleryImage[]): GalleryImage[] => {
  return images.sort((a, b) => {
    // Sort by filename alphabetically
    return a.filename.localeCompare(b.filename);
  });
}; 

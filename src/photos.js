// Your pictures live in public/images.
// Add or remove file names here. The viewer caption is made from the file name.
// A name that does not match a real file is skipped, so a typo never breaks the page.
// If no photo loads at all, generated placeholders are shown instead.
export const PHOTOS = [
  "Beauty Editorial.jfif", // rename your first file to this, or change this line to its real name
  "Best Seller_ Mascara.jfif",
  "Black And With Portrait.jfif",
  "Hair Up Headshot.jfif",
  "Models Poses.jfif",
  "Shooting Pose.jfif",
  "Single Man Photoshoot.jfif",
  "Sitting Portrait Poses.jfif",
];

// "Best Seller_ Mascara.jfif" -> "Best Seller: Mascara"
export function captionFrom(file) {
  return file
    .replace(/\.[^.]+$/, "")
    .replace(/_\s*/g, ": ")
    .replace(/\s+/g, " ")
    .trim();
}

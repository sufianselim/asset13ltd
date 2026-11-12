import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function ProjectGallery({ images, title }) {
  const [index, setIndex] = useState(null);
  const dialogRef = useRef(null);
  const isOpen = index !== null;
  const current = images[index ?? 0];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        setIndex((value) => (value - 1 + images.length) % images.length);
      }
      if (event.key === "ArrowRight") {
        setIndex((value) => (value + 1) % images.length);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, images.length]);

  if (!images?.length) return null;

  return (
    <>
      <div className="gallery">
        {images.map((image, imageIndex) => (
          <button
            className="gallery-btn reveal"
            key={image.src}
            type="button"
            style={{ "--reveal-delay": `${imageIndex * 0.08}s` }}
            onClick={() => setIndex(imageIndex)}
            aria-label={`Open image: ${image.caption}`}
          >
            <img
              src={image.src}
              alt={image.alt}
              width="1400"
              height="1050"
              loading="lazy"
              decoding="async"
            />
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label={`${title} image gallery`}
        onClose={() => setIndex(null)}
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close();
        }}
      >
        <div className="lightbox-inner">
          <button
            className="lightbox-close"
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close gallery"
          >
            <X size={20} aria-hidden="true" />
          </button>
          <img className="lightbox-img" src={current.src} alt={current.alt} />
          <p className="lightbox-caption">{current.caption}</p>
          <button
            className="lightbox-nav lightbox-prev"
            type="button"
            onClick={() =>
              setIndex((value) => (value - 1 + images.length) % images.length)
            }
            aria-label="Previous image"
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button
            className="lightbox-nav lightbox-next"
            type="button"
            onClick={() => setIndex((value) => (value + 1) % images.length)}
            aria-label="Next image"
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      </dialog>
    </>
  );
}

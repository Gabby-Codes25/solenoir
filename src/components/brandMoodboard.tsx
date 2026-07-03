import Image from "next/image";

// type MoodboardImage = {
//   src: string;
//   alt: string;
// };

type Props = {
//   images: [MoodboardImage, MoodboardImage, MoodboardImage];
  colors: { label: string; hex: string }[];
  feelWords: string[];
};

export default function BrandMoodboard({ colors, feelWords }: Props) {
  return (
    <section className="border-b border-line">
      <div className="grid grid-cols-3">
        {/* {images.map((img, i) => (
          <div key={i} className="relative aspect-square w-full">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 33vw, 400px"
            />
          </div>
        ))} */}
      </div>

      <div className="grid grid-cols-1 gap-8 bg-ink px-6 py-10 text-paper sm:grid-cols-2 sm:px-12">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-paper/60">
            Colours
          </p>
          <div className="mt-4 flex gap-3">
            {colors.map((c) => (
              <span
                key={c.hex}
                title={c.label}
                className="h-10 w-10 rounded-full border border-paper/20"
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>

        <div className="sm:border-l sm:border-paper/15 sm:pl-8">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-paper/60">
            Feel
          </p>
          <ul className="mt-4 space-y-1">
            {feelWords.map((word) => (
              <li key={word} className="font-display text-lg font-bold uppercase tracking-wide">
                {word}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
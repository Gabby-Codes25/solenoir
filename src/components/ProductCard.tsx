import Image from "next/image";
import { ProductRecommendation } from "@/lib/posts";

export default function ProductCard({ product }: { product: ProductRecommendation }) {
  return (
    <div className="not-prose my-8 overflow-hidden rounded-card border border-line bg-card">
      <div className="flex flex-col sm:flex-row">
        <div className="relative aspect-square w-full shrink-0 bg-paper sm:w-56">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 224px"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between p-5">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="sku-tag">{product.sku}</p>
                <h4 className="mt-1 font-display text-lg font-bold leading-tight text-ink">
                  {product.name}
                </h4>
                <p className="mt-0.5 text-sm text-stone">{product.brand}</p>
              </div>
              <p className="whitespace-nowrap font-mono text-base font-semibold text-clay">
                {product.price}
              </p>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink/80">{product.blurb}</p>
          </div>

          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="nofollow sponsored noopener"
            className="btn-primary border rounde mt-4 self-start"
          >
            Check Price
          </a>
        </div>
      </div>
    </div>
  );
}

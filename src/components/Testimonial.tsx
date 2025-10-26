import React from "react";

export type Testimonial = {
  id: string;
  name: string;
  location?: string;
  quote: string;
  rating?: 1 | 2 | 3 | 4 | 5;
};

type Props = {
  title?: string;
  items: Testimonial[];
};

const Star: React.FC<{ filled?: boolean; className?: string }> = ({ filled, className }) => (
  <svg
    viewBox="0 0 20 20"
    className={className ?? "h-4 w-4"}
    aria-hidden="true"
    fill={filled ? "currentColor" : "none"}
  >
    <path
      d="M10 2.5l2.47 4.99 5.51.8-3.99 3.89.94 5.49L10 15.87 5.07 17.87l.94-5.49L2.02 8.29l5.51-.8L10 2.5z"
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.5}
      className={filled ? "" : "text-sky-400"}
    />
  </svg>
);

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <article className="rounded-2xl border border-pricing-color bg-white p-5 shadow-sm">
    {children}
  </article>
);

export const Testimonials: React.FC<Props> = ({ title = "What neighbors are saying", items }) => {
  return (
    <section aria-labelledby="testimonials-title" className="mx-auto max-w-5xl">
      <div className="text-left">
        {items.map(({ id, name, location, quote, rating = 5 }) => (
          <Card key={id}>
            {/* Rating */}
            <div className="mb-2 flex items-center gap-1 text-sky-600">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} filled={i < rating} className={`h-4 w-4 ${i < rating ? "text-sky-600" : "text-sky-300"}`} />
              ))}
              <span className="sr-only">{rating} out of 5 stars</span>
            </div>

            {/* Quote */}
            <p className="mb-4 text-slate-700 italic">
              “{quote}”
            </p>

            {/* Person */}
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sky-700 font-semibold">
                {name.charAt(0)}
              </div>
              <div className="leading-tight">
                <p className="font-medium text-slate-800">{name}</p>
                {location && <p className="text-sm text-slate-500">{location}</p>}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};
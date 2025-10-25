import React, { useRef, useState, useLayoutEffect } from "react";

export type AccordionItem = {
  id: string;
  title: string;
  content: React.ReactNode;
  defaultOpen?: boolean;
};

export const AccordionItem: React.FC<AccordionItem> = ({
  id,
  title,
  content,
  defaultOpen = false,
}) => {
  const [open, setOpen] = useState(defaultOpen);
  const [height, setHeight] = useState<number>(0);
  const innerRef = useRef<HTMLDivElement>(null);

  // Measure content for smooth height animation
  useLayoutEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const measure = () => setHeight(el.scrollHeight);
    measure();
    // re-measure on font load/resize
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <section
      key={id}
      className="bg-white border border-pricing-color rounded-2xl shadow-sm"
    >
      {/* Header has NO border; border lives on section only */}
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-controls={`panel-${id}`}
        className={`flex w-full justify-between px-4 py-3 text-left text-slate-800`}
      >
        <span className="font-medium">{title}</span>
        <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Collapsible region */}
      <div
        id={`panel-${id}`}
        role="region"
        aria-hidden={!open}
        // animate height instead of relying on grid tricks
        style={{ height: open ? height : 0 }}
        className="overflow-hidden transition-[height] duration-300 ease-out text-left"
      >
        <div ref={innerRef} className="px-4 pb-4 text-slate-700 rounded-b-2xl bg-white">
          {content}
        </div>
      </div>
    </section>
  );
};

export const Accordion: React.FC<{ items: Item[] }> = ({ items }) => {
  return (
    <div className="space-y-3">
      {items.map(item => (
        <AccordionItem key={item.id} {...item} />
      ))}
    </div>
  );
};
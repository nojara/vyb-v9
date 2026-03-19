import React from 'react';

export const formatText = (text: string) => {
  if (!text) return text;
  const parts = text.split(/(VYB)/i);
  return parts.map((part, i) =>
    part.toUpperCase() === 'VYB' ? (
      <span key={i} className="font-serif italic font-light tracking-normal px-[0.05em] text-[1.15em]">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
};

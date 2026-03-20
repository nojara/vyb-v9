import React from 'react';

/** #13: Vyb brand mark consistently sized at 1em relative to surrounding text */
export const formatText = (text: string) => {
  if (!text) return text;
  const parts = text.split(/(VYB|Vyb)/gi);
  return parts.map((part, i) =>
    part.toUpperCase() === 'VYB' ? (
      <span
        key={i}
        className="font-serif italic font-light tracking-normal"
        style={{ fontSize: '1em', lineHeight: 'inherit' }}
      >
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
};

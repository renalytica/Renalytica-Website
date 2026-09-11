/**
 * ==============================================================================
 * RENALYTICA MDX COMPONENTS (components/MDXComponents.tsx)
 * ==============================================================================
 * Implementation for SOP 02: Static Content Architecture.
 * Enforces brand typography (Inter, JetBrains Mono, 60-30-10 color hierarchy)
 * across compiled MDX Case Studies, Whitepapers, and Insights.
 * ==============================================================================
 */

import React from 'react';

export const MDXComponents = {
  h1: ({ className = '', ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={`text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary mb-6 leading-tight ${className}`}
      {...props}
    />
  ),
  h2: ({ className = '', ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={`text-2xl sm:text-3xl font-bold tracking-tight text-text-primary mt-10 mb-4 pb-2 border-b border-border-light leading-snug ${className}`}
      {...props}
    />
  ),
  h3: ({ className = '', ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={`text-xl font-bold text-text-primary mt-8 mb-3 leading-snug ${className}`}
      {...props}
    />
  ),
  p: ({ className = '', ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={`text-base sm:text-lg text-text-secondary leading-relaxed mb-6 font-normal ${className}`}
      {...props}
    />
  ),
  ul: ({ className = '', ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={`list-disc list-inside space-y-2 mb-6 text-text-secondary ${className}`} {...props} />
  ),
  ol: ({ className = '', ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={`list-decimal list-inside space-y-2 mb-6 text-text-secondary ${className}`} {...props} />
  ),
  li: ({ className = '', ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={`text-base text-text-secondary ${className}`} {...props} />
  ),
  blockquote: ({ className = '', ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={`border-l-4 border-accent-momentum bg-accent-momentum/5 pl-6 pr-4 py-4 rounded-r-xl my-6 text-text-primary italic font-serif ${className}`}
      {...props}
    />
  ),
  code: ({ className = '', ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={`font-mono text-xs sm:text-sm bg-surface-gray px-1.5 py-0.5 rounded border border-border-light text-accent-momentum font-semibold ${className}`}
      {...props}
    />
  ),
  pre: ({ className = '', ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className={`font-mono text-xs sm:text-sm bg-canvas-dark text-text-dark-primary p-5 rounded-xl overflow-x-auto border border-border-dark my-6 leading-relaxed ${className}`}
      {...props}
    />
  ),
  table: ({ className = '', ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-8 border border-border-light rounded-xl shadow-sm">
      <table className={`w-full text-left text-sm border-collapse ${className}`} {...props} />
    </div>
  ),
  thead: ({ className = '', ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className={`bg-surface-gray border-b-2 border-border-strong font-mono uppercase text-xs text-text-secondary ${className}`} {...props} />
  ),
  th: ({ className = '', ...props }: React.HTMLAttributes<HTMLTableHeaderCellElement>) => (
    <th className={`p-3.5 font-bold tracking-wider ${className}`} {...props} />
  ),
  td: ({ className = '', ...props }: React.HTMLAttributes<HTMLTableDataCellElement>) => (
    <td className={`p-3.5 border-b border-border-light text-text-primary align-middle ${className}`} {...props} />
  ),
  // Custom Callout Box for Empirical Findings
  Callout: ({ title, children, type = 'info' }: { title?: string; children: React.ReactNode; type?: 'info' | 'warning' | 'data' }) => (
    <div className={`p-5 rounded-xl border my-6 ${
      type === 'data' ? 'bg-surface-gray border-border-strong' :
      type === 'warning' ? 'bg-amber-50 border-amber-200 text-amber-900' :
      'bg-accent-momentum/5 border-accent-momentum/25 text-text-primary'
    }`}>
      {title && <div className="font-mono text-xs font-bold uppercase tracking-wider text-accent-momentum mb-2">{title}</div>}
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  )
};

export default MDXComponents;

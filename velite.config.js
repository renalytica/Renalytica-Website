/**
 * ==============================================================================
 * VELITE STATIC CONTENT CONFIGURATION (velite.config.js)
 * ==============================================================================
 * Implementation for SOP 02: Static Content Architecture (MDX).
 * Defines strict frontmatter schemas for CaseStudies, Whitepapers, and Market Insights.
 * ==============================================================================
 */

module.exports = {
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true
  },
  collections: {
    caseStudies: {
      name: 'CaseStudy',
      pattern: 'case-studies/**/*.mdx',
      schema: {
        title: { type: 'string', required: true },
        slug: { type: 'string', required: true },
        category: { type: 'string', default: 'CaseStudies' },
        publishedDate: { type: 'string', required: true },
        author: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            title: { type: 'string' }
          }
        },
        summary: { type: 'string', required: true },
        clientIndustry: { type: 'string' },
        geographicScope: { type: 'array', items: { type: 'string' } },
        metrics: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              label: { type: 'string' },
              value: { type: 'string' },
              delta: { type: 'string' }
            }
          }
        },
        deliverableAsset: {
          type: 'object',
          properties: {
            fileId: { type: 'string' },
            format: { type: 'string' }
          }
        },
        body: { type: 'mdx' }
      }
    },
    whitepapers: {
      name: 'Whitepaper',
      pattern: 'whitepapers/**/*.mdx',
      schema: {
        title: { type: 'string', required: true },
        slug: { type: 'string', required: true },
        publishedDate: { type: 'string', required: true },
        pages: { type: 'number' },
        summary: { type: 'string' },
        body: { type: 'mdx' }
      }
    }
  }
};

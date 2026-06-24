# Capability Spec: SEO AI Discovery And Cleanup Ops

### Requirement: Discovery artifacts represent production content only

#### Scenario: Production metadata is generated

GIVEN the site contains published, draft, and preview-only content states
WHEN SEO and AI discovery artifacts are built
THEN canonical tags, feeds, sitemaps, structured data, and optional `llms.txt` include only production-safe public content.

### Requirement: Cleanup automation is safe by default

#### Scenario: The cleanup worker runs in production

GIVEN the cleanup worker has not yet proven its deletion logic
WHEN it runs in its initial production mode
THEN it performs a dry-run report instead of deleting referenced or uncertain assets.

### Requirement: Referenced assets are preserved

#### Scenario: A stored object is still used by public content

GIVEN a media object appears in the current referenced manifest
WHEN the cleanup worker evaluates the bucket
THEN the worker must not quarantine or delete that object.

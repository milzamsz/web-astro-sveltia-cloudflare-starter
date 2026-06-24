# Capability Spec: Blog Docs And Search Experience

### Requirement: Blog content is localized and production-safe

#### Scenario: Production content is built

GIVEN blog posts may exist in draft and published states
WHEN the production build runs
THEN only published public posts are emitted and indexed, with locale-aware routes and metadata.

### Requirement: Docs are served from the shared project

#### Scenario: A visitor opens documentation

GIVEN Starlight is mounted inside the Astro application
WHEN the visitor opens `/docs` in a supported locale
THEN the docs render with localized navigation and shared site integration.

### Requirement: Search covers only public localized content

#### Scenario: A visitor searches the site

GIVEN Pagefind indexing has completed
WHEN the visitor queries public content
THEN results include localized blog and docs entries and exclude drafts, admin, auth, and preview-only content.

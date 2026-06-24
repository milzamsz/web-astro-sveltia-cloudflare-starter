# Capability Spec: Media Pipeline And R2 Delivery

### Requirement: CMS media is stored outside Git

#### Scenario: An editor uploads a new image

GIVEN the editor uses the CMS media library
WHEN they upload a supported asset
THEN the file is stored in the configured R2 environment instead of being committed as a Git binary.

### Requirement: Public image delivery is preset-driven

#### Scenario: A public page renders an image

GIVEN the page uses the shared image component
WHEN it requests an optimized variant
THEN the component emits only approved transformation presets and rejects arbitrary transformation parameters.

### Requirement: Media governance is environment-safe

#### Scenario: Preview and production assets are reviewed

GIVEN separate environments exist
WHEN operators inspect the configuration
THEN preview and production use distinct storage bindings and least-privilege credentials.

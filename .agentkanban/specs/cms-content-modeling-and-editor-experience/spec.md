# Capability Spec: CMS Content Modeling And Editor Experience

### Requirement: Core content types are editable through Sveltia

#### Scenario: An editor opens the CMS

GIVEN the CMS configuration is loaded
WHEN the editor browses the collections
THEN they can manage the planned public pages, blog content, docs content, legal content, and site settings without manual repository edits.

### Requirement: CMS output matches repository schemas

#### Scenario: Content changes are validated

GIVEN an editor updates content through the CMS
WHEN validation runs
THEN the generated markdown, MDX, and YAML structures match the repository's typed schemas and locale rules.

### Requirement: CMS config contains no embedded secrets

#### Scenario: The admin bundle is reviewed

GIVEN `/public/admin` is a public asset
WHEN configuration files are inspected
THEN no secret credential or privileged token value is committed there.

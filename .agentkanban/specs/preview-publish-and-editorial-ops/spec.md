# Capability Spec: Preview Publish And Editorial Ops

### Requirement: Draft changes stay isolated from production

#### Scenario: An editor saves draft content

GIVEN the editor is authorized to create drafts
WHEN they save content through the CMS workflow
THEN the change lands in `content-preview` and does not alter production output.

### Requirement: Preview access is protected

#### Scenario: A reviewer opens the preview site

GIVEN preview content exists
WHEN a reviewer accesses the preview deployment
THEN the system requires authorized access and displays the preview state clearly.

### Requirement: Publishing is role-gated and conflict-aware

#### Scenario: A publisher promotes approved content

GIVEN preview content has passed checks and the user has publish permission
WHEN they trigger the publish action
THEN the system verifies build status and merge safety before updating `main`.

# Capability Spec: Bootstrap Governance And Skills Lock

### Requirement: Repository bootstrap contracts exist

#### Scenario: A developer starts from a blank clone

GIVEN the repository has no implementation yet
WHEN a developer reads the bootstrap docs
THEN they can identify the required runtime, package manager, license, locales, branch model, and environment classes without consulting external notes.

### Requirement: Skills are project-scoped and reviewed

#### Scenario: Skills are installed for the project

GIVEN a skill source is proposed for use
WHEN it is accepted into the project
THEN the repository records the source, commit pin, install date, reviewer, and audit status in `.agent-skills.lock.md`.

### Requirement: No secret or environment ambiguity is introduced

#### Scenario: Operators prepare deployment

GIVEN local, preview, and production environments are required
WHEN the bootstrap artifacts are reviewed
THEN they describe separate resources and secret requirements without embedding credential values in version control.

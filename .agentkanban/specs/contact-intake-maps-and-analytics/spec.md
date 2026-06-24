# Capability Spec: Contact Intake Maps And Analytics

### Requirement: Contact submissions are protected and validated

#### Scenario: A visitor submits the contact form

GIVEN the visitor completes the public contact form
WHEN the submission reaches the server
THEN the system verifies Turnstile, validates the payload, applies abuse controls, and stores only accepted requests.

### Requirement: Contact processing protects privacy

#### Scenario: Analytics and logs are reviewed

GIVEN contact interactions generate telemetry
WHEN analytics payloads and logs are inspected
THEN they do not contain prohibited PII such as email addresses, phone numbers, or freeform message content.

### Requirement: Analytics remain configuration-driven

#### Scenario: Operators switch analytics providers

GIVEN analytics may be disabled, GTM, Umami, or both
WHEN configuration changes provider state
THEN the site updates adapter behavior without requiring public page rewrites.

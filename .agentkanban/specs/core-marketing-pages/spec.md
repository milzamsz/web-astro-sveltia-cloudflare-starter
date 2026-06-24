# Capability Spec: Core Marketing Pages

### Requirement: Core public pages are available in both locales

#### Scenario: A visitor navigates the marketing site

GIVEN the visitor chooses either supported locale
WHEN they browse the homepage, about, services, pricing, contact, or legal sections
THEN each route renders localized content with consistent navigation and metadata.

### Requirement: Services support list and detail views

#### Scenario: A visitor opens a service detail page

GIVEN services are published
WHEN the visitor selects a service from the listing
THEN the application resolves the corresponding localized detail page with stable slug-based routing.

### Requirement: Public pages are CMS-ready

#### Scenario: Content modeling is reviewed for editorial use

GIVEN the core marketing pages are implemented
WHEN the CMS task maps content to editor collections later
THEN the page structures can be driven by typed content data without redesigning the route model.

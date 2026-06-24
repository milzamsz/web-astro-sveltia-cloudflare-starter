# Capability Spec: I18n Routing And Locale Governance

### Requirement: Core routes exist in both supported locales

#### Scenario: A visitor opens a localized route

GIVEN the application supports Indonesian and English
WHEN a visitor requests a core public route in either locale
THEN the application resolves the correct localized URL structure and page metadata.

### Requirement: Missing translations are not hidden

#### Scenario: A required content translation is missing

GIVEN a page or content item lacks its required locale pair
WHEN validation or build checks run
THEN the repository reports the missing translation as an actionable failure.

### Requirement: Equivalent language switching is preserved

#### Scenario: A visitor switches languages on a translated page

GIVEN the current content has a localized counterpart
WHEN the visitor changes locale
THEN the switcher routes to the equivalent content item instead of a generic landing page.

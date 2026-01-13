# SaaS Registration – Event Database Structure v1

## 1. `events`


### Table: `events`

| Column      | Type      | Particulars                                                        | Description                                                | Example                                                |
| ----------- | --------- | ------------------------------------------------------------------ | ---------------------------------------------------------- | ------------------------------------------------------ |
| id          | uuid      | PK                                                                 | Unique identifier for the event                            |                                                        |
| type        | enum      | conference / ticketing / carnival / workshop / meetup / exhibition | Categorizes the event to drive UI, features, and workflows |                                                        |
| name        | string    | —                                                                  | Public-facing event name                                   | `Tech Expo 2026`                                       |
| description | text      | nullable                                                           | Detailed description shown on event pages and listings     | `Annual technology exhibition with paid entry tickets` |
| status      | enum      | draft / published / paused / cancelled / archived                  | Controls visibility, availability, and lifecycle state     |                                                        |
| start_date  | date      | —                                                                  | Overall start date of the event                            |                                                        |
| end_date    | date      | —                                                                  | Overall end date of the event                              |                                                        |
| timezone    | string    | IANA timezone                                                      | Used for schedule consistency, reminders, and check-ins    | `Asia/Kolkata`                                         |
| archived_at | timestamp | nullable                                                           | Soft archival timestamp for historical retention           |                                                        |
| created_at  | timestamp | auto                                                               | Record creation timestamp                                  |                                                        |
| updated_at  | timestamp | auto                                                               | Last update timestamp                                      |                                                        |
---

## 2. `organization_events` (Pivot)
### Table: `organization_events`

| Column          | Type      | Particulars           | Description                                                                      |
| --------------- | --------- | --------------------- | -------------------------------------------------------------------------------- |
| event_id        | uuid      | FK → events.id        | **Many-to-One** relationship to `events` (multiple rows can reference one event) |
| organization_id | uuid      | FK → organizations.id | **Many-to-One** relationship to `organizations` (multiple rows per organization) |
| created_at      | timestamp | auto                  | Timestamp when the organization was associated with the event                    |
| updated_at      | timestamp | auto                  | Timestamp when the association was last updated                                  |

## 3. `event_settings`

| Column                              | Type      | Particulars                                            | Description                                                                         |
| ----------------------------------- | --------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| id                                  | uuid      | PK                                                     | Unique identifier for the settings record                                           |
| event_id                            | uuid      | FK → events.id, unique                                 | **One-to-One** relationship with `events` (each event has exactly one settings row) |
| registration_requirement            | enum      | none / optional / required                             | Determines whether user registration is needed                                      |
| registration_flow                   | enum      | ticket_before_registration / ticket_after_registration | Defines whether ticket selection occurs before or after registration                |
| checkout_mode                       | enum      | single_page / multiple_page                            | Controls checkout UX flow                                                           |
| is_back_navigation_allowed          | boolean   | default true                                           | Allows users to navigate back during registration or checkout                       |
| primary_identifier                  | enum      | email / phone                                          | Primary identity used to recognize and deduplicate users                            |
| is_identifier_verification_required | boolean   | default false                                          | Enforces verification (OTP/email) for the selected identifier                       |
| created_at                          | timestamp | auto                                                   | Settings creation timestamp                                                         |
| updated_at                          | timestamp | auto                                                   | Settings last updated timestamp                                                     |
---

## 4. `event_locations`

### Table: `event_locations`

| Column        | Type      | Particulars    | Description                                                                     | Example                              |
| ------------- | --------- | -------------- | ------------------------------------------------------------------------------- | ------------------------------------ |
| id            | uuid      | PK             | Unique identifier for the event location                                        |                                      |
| event_id      | uuid      | FK → events.id | **Many-to-One** relationship to `events` (an event can have multiple locations) |                                      |
| venue         | string    | —              | Venue name                                                                      | `Kochi Convention Center`            |
| location      | string    | full address   | Complete venue address                                                          | `Marine Drive, Kochi, Kerala, India` |
| venue_map_url | string    | nullable       | Optional external map URL for navigation                                        | `https://maps.google.com/?q=Kochi+Convention+Center`                      |
| start_date    | date      | —              | Start date of the event at this specific location                               |                                      |
| end_date      | date      | —              | End date of the event at this specific location                                 |                                      |
| created_at    | timestamp | auto           | Location record creation timestamp                                              |                                      |
| updated_at    | timestamp | auto           | Location record last updated timestamp                                          |                                      |
---
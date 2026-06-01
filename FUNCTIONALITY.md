# Interfriends User Web App — Functional Overview

This document summarizes user-visible functionality based on routes, components, and services under `src/app`.

**App structure**
- Angular 12 app with hash-based routing (`useHash: true`).
- Two main feature areas:
- Public site (Home module)
- Authenticated user area (User module)

**Public site (Home module)**
Entry path: `/` (Landing page)

Public routes and pages
- `/` — Landing page
- `/login` — User login
- `/register` — User registration
- `/verifyUser/:token` — Verify user via token
- `/forgotPassword` — Request password reset
- `/resetPassword/:token` — Reset password via token
- `/about-us` — About us
- `/how-it-works` — How it works
- `/our-products` — Products overview
- `/faq` — FAQ
- `/user-details` — User details capture (pre‑signup)
- `/contact-us` — Contact us
- `/co-operative` — Co‑operative info
- `/privacyPolicy` — Privacy policy
- `/term&condition` — Terms and conditions

Access control
- Public pages use `AuthHomeGuard` to redirect authenticated users away from public auth screens.

**Authenticated user area (User module)**
Base path: `/user` (requires `AuthUserGuard`)

User routes and pages
- `/user/welcome` — Welcome screen after login
- `/user/dashboard` — Dashboard overview
- `/user/myLoans` — My loans summary
- `/user/applyLoan` — Apply for a loan
- `/user/welfareLoan` — Welfare loan list
- `/user/emergencyLoanList` — Emergency loan list
- `/user/miscellaneousList` — Miscellaneous loan list
- `/user/savingDetail` — Savings detail
- `/user/JNRsavingDetail/:lifeCycleType` — JNR savings detail
- `/user/PFsavingDetails/:fromPF` — PF savings detail
- `/user/HepToBuysavingDetail/:lifeCycleType` — Help‑to‑Buy savings detail
- `/user/pfList` — Provident fund list
- `/user/safeKeepingList` — Safe‑keeping list
- `/user/investmentList` — Investment list
- `/user/investmentProfit` — Investment profit summary
- `/user/investmentOpportunity` — Investment opportunities
- `/user/help2buylayout/:groupId/:userId` — Help‑to‑Buy layout
- `/user/help2buyloanlist/:loanType` — Help‑to‑Buy loan list
- `/user/userProfile` — User profile
- `/user/circle-list` — Circle members list
- `/user/notificationList` — Notifications
- `/user/changePassword` — Change password
- `/user/help` — Help request
- `/user/contactUs` — Contact support
- `/user/privacyPolicy` — Privacy policy
- `/user/term&condition` — Terms and conditions
- `/user/recommendUser` — Recommend a new user
- `/user/progessBar` — Progress bar view (dashboard/supporting UI)
- `/user/donutChart` — Donut chart view (dashboard/supporting UI)
- `/user/imageMagnifyPage` — Image magnify demo/test page

**Approval and decline links**
- `/handleApproval/:token/:id` — Shows approval status messages by token stage:
- `second_recommender` — Awaiting circle lead/deputy approval
- `circle_lead` — Awaiting admin approval
- `admin` — Final approval completed
- `/handleDecline/:token/:id` — Decline page

**Core functional areas (from services)**
Authentication and user management
- Login, logout, session storage, auto‑auth on reload
- Registration via referral (`/Admin/addUserByRecommended`)
- Forgot/reset password and verification by token
- Profile update and user detail retrieval
- Change password

Savings and cycles
- Group cycle lists and per‑cycle summaries
- Savings details by lifecycle type (standard, JNR, Help‑to‑Buy)
- Average savings, payouts, and safe‑keeping summaries

Loans
- Apply for loan with supporting documents
- Loan lists by status and type
- Welfare loans
- Emergency loans
- Loan payments list

Investments
- Investment list and totals
- Investment profit summary
- Investment opportunities
- Property list and property images
- Request an investment for a property

Funds and safe‑keeping
- PF list and PF interest/amount
- Safe‑keeping list and withdrawal requests

Notifications and messaging
- Notification list and notification counters
- Firebase Cloud Messaging token registration

Community and referrals
- Circle list
- Recommend a new user

Support and policies
- Help requests
- Contact us
- Privacy policy and terms content from API

**Integrations and platform features**
- Backend API base: `environment.apiUrl`
- Admin API base: `environment.adminUrl`
- Firebase Cloud Messaging + Service Worker (`firebase-messaging-sw.js`)
- UI libraries: Angular Material spinner, ngx‑toastr, ngx‑image‑cropper, ngx‑image‑zoom, Google Maps, carousel

**Data models (key domain objects)**
- Loans, emergency loans, investments, PF, safe‑keeping, notifications, user, group cycles, payouts

**Notes for rebuild**
- The UI and routes are tightly coupled to API endpoints and response shapes from the backend.
- Auth state is stored in `sessionStorage` under keys like `token_interFriendWeb`.
- Hash routing (`/#/`) is used; adjust if you move to path routing.

**Rebuild timeline (Angular 20, from scratch)**
Assumptions
- Team: 2 frontend engineers + 1 QA (part‑time)
- Backend APIs remain compatible or provide stable mocks
- Design assets are available or can be recreated from the current UI

Estimated schedule (12–14 weeks total)
1. Week 1: Discovery and setup
   - Confirm scope, API contracts, and data models
   - Create Angular 20 workspace, CI, linting, routing strategy
2. Weeks 2–3: Core shell and auth
   - App layout, navigation, guards, session handling
   - Login, register, verify, forgot/reset password
3. Weeks 4–6: User dashboard and profile
   - Dashboard, profile, notifications, circle list
   - Contact/help flows
4. Weeks 7–9: Savings and funds
   - Savings detail variants, PF, safe‑keeping
   - Cycle summaries, payouts, averages
5. Weeks 10–11: Loans and investments
   - Apply loan, loan lists, welfare/emergency/misc
   - Investments, property lists, opportunities
6. Week 12: Public marketing pages and policy pages
   - Landing, about, how‑it‑works, products, FAQ, co‑op
   - Privacy policy, terms
7. Weeks 13–14: QA hardening and release
   - E2E checks, accessibility pass, performance, bug fixes
   - Release candidate and production rollout

Notes
- If API changes are required, add 2–4 weeks depending on backend availability.
- If designs need a full redesign, add 2–3 weeks for UI/UX.


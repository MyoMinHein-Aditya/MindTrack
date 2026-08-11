# MindBridge — SIH-Ready Product Blueprint

## From silent struggle to timely, human-led support

> **One-line pitch:** MindBridge is a privacy-first student wellbeing platform that detects concerning changes early, offers safe and personalized support, and connects students with human counselors through a closed-loop follow-up system.

> **Important boundary:** MindBridge is a support, screening-assistance, and coordination system. It does not diagnose, treat, prescribe, or replace qualified mental-health professionals.

---

## 1. Executive Summary

Students often experience academic pressure, loneliness, sleep disruption, financial stress, relationship difficulties, anxiety, and burnout without seeking help early. Existing solutions commonly stop at a chatbot, a static resource page, or a one-time questionnaire.

MindBridge creates an **early-intervention loop**:

```text
Check in → Detect change → Explain concern → Offer safe support
    → Connect to a counselor → Follow up → Measure outcome
```

The system serves three groups:

- Students receive private check-ins, grounded resources, safe AI support, appointments, and progress tracking.
- Counselors receive explainable, prioritized cases and a structured follow-up workspace.
- Institutions receive only aggregated insights that help plan services without exposing unnecessary personal data.

The most important design decision is that AI does not make the final clinical decision. A deterministic safety protocol and qualified human oversight govern escalation.

---

## 2. SIH Problem Framing

### The gap

```text
Distress begins → Student hesitates → No early signal reaches support staff
→ Symptoms persist → Academic and social functioning deteriorate
```

### Why current approaches are insufficient

| Existing approach | Limitation | MindBridge response |
|---|---|---|
| One-time survey | Misses changing trajectories | Longitudinal check-ins and trend detection |
| Generic chatbot | Can hallucinate or miss crisis signals | Safety layer, rules, RAG, and human escalation |
| Static resource directory | Students must search while distressed | Contextual, institution-approved recommendations |
| Manual counselor queue | Triage is slow and inconsistent | Explainable support-priority queue |
| Individual dashboard only | Does not improve institutional planning | Privacy-preserving aggregate analytics |
| Risk score without action | Detection does not guarantee help | Intervention, owner, deadline, and follow-up |

### Problem statement

How can higher-education institutions identify concerning wellbeing changes early, provide safe first-line support, and connect students to appropriate human help while preserving consent, privacy, dignity, and human control?

---

## 3. Product Principles

MindBridge must be:

1. **Human-led:** AI assists; counselors and institutional protocols remain accountable.
2. **Privacy-first:** Collect the minimum necessary data and expose it only to authorized roles.
3. **Safety-over-engagement:** A crisis signal must never be treated as an ordinary chat.
4. **Explainable:** Every support-priority alert includes observable contributing indicators and model version.
5. **Action-oriented:** Every alert has a recommended next step, owner, and follow-up state.
6. **Inclusive:** Support multiple languages, disabilities, socioeconomic contexts, and help-seeking preferences.
7. **Evidence-aware:** Use approved screening instruments and institution-verified resources; never invent evidence or contacts.
8. **Non-stigmatizing:** Use “support priority” and “wellbeing indicator,” not labels such as “dangerous student” or “mentally ill.”

---

## 4. Personas and User Journeys

### Student journey

```text
Consent → 30-second check-in → Personal trend view
→ Safe recommendation → Optional appointment → Follow-up
```

A student can use MindBridge anonymously at first if the institution permits it, then create an account only when they want appointments or continuity. The product must never make counseling participation visible to teachers, peers, or administrators by default.

### Counselor journey

```text
Secure login → Priority queue → Review evidence and consent
→ Contact or appointment → Record intervention → Schedule follow-up
```

Counselors should see the minimum useful context, not an unfiltered dump of every student message. They must be able to correct an alert, mark it as a false positive, override a recommendation, and document the reason.

### Administrator journey

```text
Aggregated dashboard → Identify service demand → Allocate resources
→ Review outcomes at population level
```

Administrators must not be able to drill down from an aggregate chart to an individual student. Apply a minimum-group-size rule before displaying department or cohort statistics.

---

## 5. Feature Scope

### MVP for the SIH demonstration

- Student, counselor, and administrator authentication with role-based access control.
- Consent and privacy preference flow.
- Daily check-in for mood, stress, sleep, concern, and optional free text.
- Longitudinal wellbeing graph with a clearly non-clinical label.
- Approved screening workflow with non-diagnostic language.
- Institution-curated resource directory.
- Safety-aware AI companion for low-risk support and resource navigation.
- Rule-based support-priority engine using trends and current signals.
- Explainable counselor queue with case assignment and follow-up dates.
- Appointment request or booking flow.
- Intervention log and outcome check-in.
- Aggregated administrator analytics with suppression for small groups.
- Audit log, synthetic demo data, tests, and a crisis-flow simulation.

### Post-MVP

- Multilingual content reviewed by native speakers and mental-health professionals.
- Campus SSO integration and verified counselor calendars.
- Human-in-the-loop model retraining from reviewed cases.
- Offline-friendly progressive web app for low-connectivity campuses.
- Accessibility audit, usability study, and institutional pilot.
- De-identified research export with ethics approval and governance review.

### Explicit non-goals

Do not build in the first release:

- Diagnosis or treatment recommendations.
- Medication or dosage advice.
- Facial, voice, or biometric emotion recognition.
- Public social feeds or peer diagnosis.
- Automatic contacting of family, faculty, or police without a defined safety protocol and legal/institutional basis.
- A claim that the system predicts suicide or any psychiatric disorder.
- Gamification that rewards disclosure or makes wellbeing a competition.

---

## 6. Safety-Critical Design

### Separate the four decision layers

```text
Layer 1: Safety detection      Is there a possible immediate safety concern?
Layer 2: Policy rules           What action is permitted by institutional protocol?
Layer 3: Support prioritization How urgently should a counselor review this?
Layer 4: Conversational support  What safe, grounded response can be given now?
```

The LLM must not decide whether an emergency intervention occurs. Crisis routing should be handled by deterministic rules, reviewed classifiers, and trained human staff.

### Suggested operational states

| State | Meaning | Default action |
|---|---|---|
| Green | No concerning signal identified | Self-help resources and routine check-in |
| Amber | Persistent or moderate concern | Tailored resources and optional counselor appointment |
| Orange | Multiple worsening indicators or high screening concern | Priority counselor review within an institutional timeframe |
| Red | Possible immediate danger or explicit safety concern | Crisis protocol, human review, and verified emergency options |

These labels are operational support states, not diagnoses. Exact thresholds, timeframes, and contacts must be approved by the institution and qualified mental-health professionals before deployment.

### Crisis flow

1. Pause ordinary chatbot behavior.
2. Acknowledge the message without judgment.
3. Encourage immediate human help and ask whether the person is in immediate danger, where appropriate to the approved protocol.
4. Present verified local emergency and campus contacts, with location confirmation where required.
5. Offer connection to an on-call counselor or trained responder.
6. Create a minimum-necessary safety event for authorized human review, subject to consent and the institution’s emergency policy.
7. Record the action and require a follow-up outcome.

Never promise confidentiality that the institution cannot legally or operationally maintain. Display the limits of confidentiality before sensitive use, not only during a crisis.

### Safe-response policy

The AI should:

- Use warm, brief, non-judgmental language.
- Reflect the student’s concern without diagnosing it.
- Recommend practical, low-risk steps.
- Cite or link only approved resources from the knowledge base.
- Encourage human support when distress persists or worsens.
- Say when it is uncertain and avoid pretending to know the student’s situation.

The AI must not:

- Diagnose, prescribe, shame, threaten, or debate a student’s feelings.
- Generate unsupported emergency contacts.
- Give instructions that could enable self-harm or harm to others.
- Claim that a risk score is a clinical conclusion.
- Hide that a human may review a safety event when policy requires it.

---

## 7. Consent, Privacy, and Governance

### Consent screens must answer

- What information is collected?
- Which features require it?
- Who can see it?
- Is participation voluntary?
- What happens in a safety emergency?
- How long is it retained?
- How can the student withdraw or request correction?
- Does deleting data affect appointment or safety records required by policy?

Use separate, granular consent for check-ins, AI conversations, counselor sharing, analytics, and research. Do not bundle optional research consent into access to basic support.

### Data minimization and retention

Define a retention schedule before implementation. For example: raw chat content for the shortest operational period, structured risk events only when needed for care coordination, and aggregate analytics retained without re-identification. The final values must be approved by the institution’s privacy and legal authorities rather than copied from a generic template.

### Access model

| Role | Permitted access |
|---|---|
| Student | Own records, consent, appointments, and recommendations |
| Counselor | Assigned or explicitly authorized cases; minimum necessary context |
| Safety responder | Safety events required by the approved protocol |
| Administrator | Aggregated statistics and service-level trends only |
| System operator | Technical metadata and audited support access; no routine clinical content |

Every sensitive access must create an immutable audit event containing actor, time, purpose, record type, and action. Add break-glass access only for defined emergencies, with mandatory justification and review.

### Governance board

Create an advisory group before pilot deployment containing a counselor or psychologist, student representative, privacy/security lead, faculty or student-welfare representative, accessibility representative, and technical lead. This group approves content, escalation rules, model changes, incident handling, and pilot continuation.

---

## 8. Technical Architecture

```text
Student / Counselor / Admin clients
                │
        HTTPS + secure session
                │
        API gateway / FastAPI
                │
     Authentication + authorization
                │
 ┌──────────────┼────────────────┐
 │              │                │
 ▼              ▼                ▼
PostgreSQL   Workflow service  Audit service
 │              │                │
 ▼              ▼                ▼
Check-ins    Intervention     Security logs
Assessments  appointments

Chat request → input safety classifier → policy router
       ├── crisis protocol → verified contacts + human queue
       └── ordinary support → retrieval → LLM → output safety filter

Signals → feature service → rules/model → explanation → counselor queue
```

### Recommended implementation stack

- Frontend: React, TypeScript, Vite, accessible component system, responsive PWA support.
- Backend: Python, FastAPI, Pydantic, SQLAlchemy, background task queue.
- Database: PostgreSQL with migrations and encrypted sensitive fields where appropriate.
- AI: LLM behind a provider abstraction, retrieval layer, prompt/version registry, input/output safety filters.
- ML: Python, pandas, scikit-learn; begin with interpretable baselines before complex models.
- Operations: Docker, environment-based secrets, structured logging, monitoring, backup and restore procedure.

### Model strategy

Start with a transparent rules-plus-baseline approach. Use a trained predictive model only after collecting an ethically governed, representative, consented dataset and validating it against counselor-reviewed outcomes.

Do not report accuracy on synthetic data as evidence of real-world performance. In the demo, clearly label synthetic data and show the evaluation design rather than inventing numbers.

---

## 9. Data Model Additions

The existing entities should be expanded with:

```text
users
  id, role, status, created_at, last_login_at

consents
  id, user_id, consent_type, version, granted, granted_at, withdrawn_at

checkins
  id, student_id, mood, stress, sleep, concern, free_text_ref, created_at

assessments
  id, student_id, instrument, version, answers_ref, score, interpretation, created_at

risk_events
  id, student_id, state, reasons, source, model_version, created_at, reviewed_at

interventions
  id, risk_event_id, type, owner_id, status, started_at, completed_at, outcome

appointments
  id, student_id, counselor_id, slot, status, accessibility_request, created_at

resource_documents
  id, title, category, language, source_owner, verified_at, expiry_at, content_hash

conversations
  id, student_id, consent_version, retention_expiry, created_at

messages
  id, conversation_id, sender, safety_state, resource_refs, created_at

audit_events
  id, actor_id, action, object_type, object_id, purpose, created_at

model_registry
  id, component, version, training_data_note, approved_by, active_from, retired_at
```

Use pseudonymous student identifiers in counselor views where possible. Keep identity mapping separate from wellbeing data, protected by an additional authorization boundary.

---

## 10. API and Workflow Requirements

Important endpoints should include:

```text
POST   /auth/login
POST   /consents
GET    /me/privacy
POST   /checkins
GET    /me/trends
POST   /assessments/{instrument}/submit
POST   /chat/sessions/{id}/messages
GET    /resources?category=&language=
POST   /appointments/requests
GET    /counselor/queue
POST   /cases/{id}/review
POST   /cases/{id}/interventions
POST   /cases/{id}/follow-up
GET    /admin/analytics/aggregate
GET    /audit/events                  # restricted
```

Every sensitive endpoint must enforce server-side authorization; hiding a button in the frontend is not access control. Add rate limits, input validation, idempotency for appointments, pagination, error-safe responses, and correlation IDs for incident investigation.

---

## 11. Explainability and Fairness

Each alert should show:

```text
Support priority: Orange
Observed indicators:
- Stress increased across three recent check-ins
- Sleep quality declined
- Wellbeing indicator declined over four weeks
Data freshness: 2 hours ago
Model/rules version: v0.1
Recommended next step: counselor review
```

Do not expose sensitive model internals to students in a way that creates fear or stigma. Give students a plain-language explanation, the ability to correct inaccurate data, and a route to human review.

Audit performance across relevant groups where lawful and ethically appropriate. Check missing-data patterns, language differences, false-positive burden, false-negative risk, calibration, and whether students with limited access or low check-in frequency are unfairly deprioritized.

---

## 12. Reliability and Security Requirements

### Non-functional targets for the prototype

- Core API p95 response time: under 500 ms excluding LLM generation.
- Graceful degradation when the LLM or vector store is unavailable.
- No loss of submitted check-ins after a successful response.
- Automated database backups and a tested restore procedure.
- Accessibility target: keyboard navigation, readable contrast, labels for screen readers, and reduced-motion support.
- Mobile-first design suitable for common student devices.
- Observability for errors, latency, safety-routing failures, and queue backlog.

### Threat model

| Threat | Mitigation |
|---|---|
| Account takeover | Strong password hashing, MFA-ready design, session expiry, rate limits |
| Counselor viewing unauthorized case | Server-side RBAC, assignment checks, audit logs |
| Prompt injection | Treat retrieved documents and user text as untrusted; policy-controlled tools |
| Hallucinated resource | Verified, expiring knowledge base and citation requirement |
| Data leakage in logs | Redaction, restricted logs, retention limits |
| Re-identification from analytics | Minimum group size, suppression, aggregation, review |
| Model drift | Versioning, monitoring, approval gates, rollback |
| Crisis-routing failure | Deterministic fallback page, human escalation, regular drills |
| Malicious student input | Content safety, abuse controls, no punitive profiling |

Run dependency scanning, secret scanning, API authorization tests, backup restore tests, and an incident-response tabletop exercise before the demo.

---

## 13. Evaluation Plan

### Safety and AI evaluation

Build a curated test set of ordinary, ambiguous, crisis, adversarial, multilingual, and resource-seeking messages reviewed by qualified professionals. Measure crisis-routing recall, inappropriate reassurance, unsupported advice, hallucinated contacts, resource grounding, response helpfulness, and time to human notification.

### Risk-engine evaluation

Use counselor-reviewed labels only when ethically and methodologically appropriate. Report precision, recall, F1, confusion matrix, calibration, subgroup performance, alert burden, and false-negative review. For a prototype with no real labels, present this as an evaluation plan and demonstrate the pipeline on synthetic cases; do not present synthetic performance as clinical validation.

### Product evaluation

Track:

- Check-in completion and return rate.
- Time from alert to counselor review.
- Appointment request and completion rate.
- Follow-up completion.
- Resource usefulness rating.
- Student-reported sense of control and trust.
- Counselor workload and perceived usefulness.
- Number of alerts closed as false positives.

### Pilot design

Use a staged pilot: usability testing with synthetic data, supervised counselor review, limited opt-in deployment, safety review, then expansion. Define stop conditions in advance, such as repeated unsafe responses, unreviewed critical alerts, unacceptable privacy incident, or a concerning disparity between groups.

---

## 14. SIH Differentiation

MindBridge should be presented as **support infrastructure, not an AI chatbot**.

### Five memorable innovations

1. **Trajectory-first detection:** worsening patterns matter more than a single score.
2. **Human-in-the-loop escalation:** alerts become owned cases with deadlines and follow-up.
3. **Grounded campus support:** the AI answers from verified, expiring institutional resources.
4. **Privacy-preserving command center:** administrators see service demand, not student secrets.
5. **Outcome loop:** the system records whether a recommended intervention was completed and whether the student reported improvement.

### Strong differentiator statement

> Most solutions answer “What did the student say?” MindBridge also asks “What changed, what support is appropriate, who is responsible for the next step, and did that support help?”

---

## 15. SIH Demo Script

### Demo story

Use a fictional student and clearly label all records as synthetic.

1. The student grants granular consent and completes a 30-second check-in.
2. The dashboard shows four weeks of declining indicators, not a diagnosis.
3. The system explains the change using stress, sleep, and mood trends.
4. The AI suggests a verified academic-support resource and a short grounding activity.
5. The student requests a counselor appointment.
6. The counselor queue displays the case with reasons, freshness, and recommended review time.
7. The counselor records an intervention and schedules follow-up.
8. The student completes follow-up; the dashboard records the outcome.
9. The administrator sees an aggregate academic-stress trend, while the individual record remains inaccessible.
10. Run a second message containing a crisis signal to demonstrate that ordinary chat stops and the safety flow begins.

### Demo success criteria

- The audience understands the problem in 30 seconds.
- The full detect-to-follow-up loop is visible in under 5 minutes.
- One privacy boundary is demonstrated live.
- One explainable alert is demonstrated live.
- One failure case is demonstrated live.
- No fabricated model accuracy, user numbers, or clinical claims appear on screen.

---

## 16. SIH Presentation Structure

1. Human story and problem.
2. Why one-time surveys and chatbots are insufficient.
3. MindBridge’s early-intervention loop.
4. Live student-to-counselor demo.
5. Safety architecture and human oversight.
6. Privacy and role-based access demonstration.
7. Technical architecture and implementation feasibility.
8. Evaluation plan and pilot roadmap.
9. Impact metrics and scalability.
10. Memorable closing line.

### Closing line

> MindBridge does not replace the counselor. It helps the right counselor notice the right change at the right time—with the student’s dignity and consent protected.

---

## 17. Implementation Roadmap

### Sprint 1 — Foundation

Repository, database migrations, authentication, roles, consent, seed data, CI, and design system.

### Sprint 2 — Student experience

Check-ins, assessments, trend graph, privacy settings, resource directory, and accessibility pass.

### Sprint 3 — Safety and AI

Verified resource ingestion, retrieval, prompt policy, input/output safety filters, crisis-flow fallback, and evaluation test set.

### Sprint 4 — Counselor operations

Queue, assignment, case review, appointment requests, intervention records, follow-up workflow, and audit events.

### Sprint 5 — Analytics and hardening

Aggregate dashboards, suppression rules, monitoring, security tests, backup restore, performance tests, and demo data.

### Sprint 6 — SIH polish

Usability refinement, bilingual content if validated, architecture diagrams, pitch deck, judge Q&A, rehearsal, and failure-mode demo.

---

## 18. Risks and Mitigations

| Risk | Severity | Mitigation |
|---|---:|---|
| False reassurance during crisis | Critical | Separate safety classifier, deterministic crisis route, human review |
| False positives overwhelm counselors | High | Calibrated thresholds, queue caps, counselor feedback, prioritization |
| Student distrust | High | Granular consent, clear access visibility, no hidden surveillance |
| Hallucinated campus information | High | Verified RAG, expiry dates, source owner, fallback to “I don’t know” |
| Privacy breach | Critical | Encryption, RBAC, audit logs, minimization, incident plan |
| Biased prioritization | High | Missingness analysis, subgroup evaluation, human override |
| Low engagement | Medium | 30-second check-in, useful immediate feedback, low notification burden |
| Scope creep | High | Protect MVP; defer avatars, wearables, and complex prediction |
| No real training data | High | Start rules-based, use synthetic data only for demonstration, plan ethical pilot |

---

## 19. Judge Questions and Answers

**Is this a diagnosis system?** No. It presents non-clinical indicators and support priorities, while qualified professionals make care decisions.

**Why use AI at all?** AI helps with conversational access and resource navigation; safety routing, escalation policy, and accountability remain outside the LLM.

**What if the model is wrong?** The system shows contributing indicators, supports human override, logs decisions, uses conservative escalation, and provides a fallback safety flow when AI services fail.

**How do you protect student privacy?** Granular consent, minimum-necessary access, pseudonymous views, encrypted transport/storage where appropriate, audit logs, aggregate-only administrator analytics, and defined retention.

**Where did the model accuracy come from?** During the prototype, we will not claim clinical performance without representative, counselor-reviewed data. We will show the evaluation protocol and clearly label synthetic demonstration data.

**How is this different from a chatbot?** It connects longitudinal signals, verified campus resources, explainable prioritization, counselor workflow, follow-up, and outcome tracking in one closed loop.

**Can it scale to another institution?** The core platform is multi-tenant in design, while resources, escalation policy, counselors, languages, consent wording, and emergency contacts are institution-configurable.

**What happens when no counselor is available?** The system provides verified self-help and emergency resources, records the pending support state, shows expected response timing, and follows the institution’s approved backup protocol.

---

## 20. Final Acceptance Checklist

### Product

- [ ] Student, counselor, and administrator journeys work end to end.
- [ ] Synthetic data is visibly labeled.
- [ ] Every recommendation has a next step.
- [ ] Follow-up can be scheduled and completed.

### Safety

- [ ] Crisis messages leave ordinary chat flow.
- [ ] Verified contacts are configurable and tested.
- [ ] Human escalation and fallback behavior are documented.
- [ ] No diagnosis, medication, or fabricated claim appears in UI or pitch.

### Privacy

- [ ] Consent is granular and revocable.
- [ ] Access is enforced on the server.
- [ ] Audit events are generated and reviewable.
- [ ] Small groups are suppressed in analytics.

### Technical

- [ ] API validation and authorization tests pass.
- [ ] LLM outage does not break check-ins or safety resources.
- [ ] Database backup and restore are tested.
- [ ] Model and prompt versions are recorded.

### SIH readiness

- [ ] Problem is explained in one sentence.
- [ ] Demo completes the detect-to-follow-up loop.
- [ ] Novelty is visible, not only described.
- [ ] Architecture, metrics, roadmap, and risks are ready for questions.

---

## Final SIH Positioning

MindBridge is not promising to predict mental illness. It is solving a more practical and defensible problem: **reducing the distance between a student’s changing distress and timely, appropriate, human support**.

```text
DETECT → UNDERSTAND → SUPPORT → ESCALATE → INTERVENE → FOLLOW UP → MEASURE
```

> **MindBridge: a safer bridge from silent struggle to timely support.**

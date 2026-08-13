# MindTrack

## Digital Mental Health and Psychological Support System for Students in Higher Education

> **Tagline:** From silent struggle to timely support.

---

# 1. Problem Statement

### Official Problem Statement

> Development of a Digital Mental Health and Psychological Support System for Students in Higher Education

---

# 2. Problem Understanding

Students in higher education frequently experience:

- Academic stress
- Examination pressure
- Career uncertainty
- Loneliness
- Sleep problems
- Financial concerns
- Relationship difficulties
- Family-related stress
- Burnout
- Anxiety and emotional distress

However, many students do not seek professional support early.

The conventional support cycle often looks like:

```text
Student experiences distress
        ↓
Student ignores/minimizes symptoms
        ↓
Problem persists
        ↓
Academic/social functioning is affected
        ↓
Student eventually seeks help
        ↓
Counselor intervention
```

This is primarily a **reactive model**.

MindBridge aims to introduce an **early-intervention model**:

```text
Continuous wellbeing monitoring
        ↓
Early identification of concerning trends
        ↓
Personalized low-risk support
        ↓
Professional referral when appropriate
        ↓
Counselor intervention
        ↓
Follow-up
        ↓
Outcome tracking
```

---

# 3. Proposed Solution

## MindTrack

MindTrack is a privacy-conscious digital mental-health support platform designed specifically for higher-education institutions.

The platform connects:

```text
Students
   ↓
Wellbeing Monitoring
   ↓
AI-Assisted Support
   ↓
Risk & Trend Analysis
   ↓
Personalized Intervention
   ↓
Counselor Escalation
   ↓
Follow-up
```

The system is **not intended to diagnose mental-health disorders or replace qualified professionals**.

Instead, it acts as a:

- Early-support system
- Screening assistance platform
- Student wellbeing tracker
- AI-assisted support system
- Counselor coordination system
- Institutional wellbeing analytics platform

---

# 4. Core Objectives

MindBridge aims to:

1. Encourage students to regularly monitor their wellbeing.
2. Identify concerning changes in wellbeing at an early stage.
3. Provide personalized, low-risk psychological support.
4. Provide students with relevant university resources.
5. Connect students with professional counselors when appropriate.
6. Help counselors prioritize follow-ups.
7. Provide institutions with privacy-preserving wellbeing analytics.
8. Maintain strong privacy, consent, and access-control mechanisms.
9. Reduce the gap between experiencing distress and receiving support.
10. Measure whether interventions are actually helping.

---

# 5. Target Users

MindBridge has three primary user roles.

## 5.1 Students

Students can:

- Complete wellbeing check-ins.
- Track mood.
- Complete psychological screening questionnaires.
- Chat with the AI companion.
- Receive personalized resources.
- Track wellbeing trends.
- Book counseling appointments.
- Receive intervention recommendations.
- Manage privacy and consent.

---

## 5.2 Counselors

Counselors can:

- View assigned students.
- View student wellbeing trends.
- Review risk indicators.
- Manage appointments.
- Record interventions.
- Schedule follow-ups.
- Track intervention outcomes.
- Prioritize cases requiring attention.

---

## 5.3 University Administrators

Administrators can view:

- Aggregated wellbeing statistics.
- Department-level trends.
- Academic-stress trends.
- Counseling demand.
- Intervention statistics.
- System usage statistics.

Administrators should **not** receive unnecessary individual student mental-health information.

---

# 6. Core System Modules

MindBridge consists of five major modules.

```text
┌──────────────────────────────────────────────┐
│                  MINDBRIDGE                  │
├──────────────────────────────────────────────┤
│                                              │
│  1. Student Wellbeing                        │
│  2. AI Support                               │
│  3. Risk & Early Detection                   │
│  4. Counselor System                         │
│  5. Institutional Analytics                  │
│                                              │
└──────────────────────────────────────────────┘
```

---

# 7. Module 1 — Student Wellbeing

## Features

- Daily wellbeing check-in
- Mood tracking
- Stress tracking
- Sleep tracking
- Primary-concern tracking
- Psychological screening
- Wellbeing score
- Historical trends
- Personalized recommendations

---

# 8. Daily Check-in

The daily check-in should be short enough that students will actually use it.

## Question 1 — Mood

```text
How are you feeling today?

😞   😕   😐   🙂   😊
```

---

## Question 2 — Stress

```text
How stressed have you felt today?

0 ─────────────── 10
```

---

## Question 3 — Sleep

```text
How well did you sleep?

Poor
Average
Good
```

---

## Question 4 — Primary Concern

```text
What is affecting you most right now?

- Academics
- Relationships
- Financial concerns
- Family
- Loneliness
- Career
- Sleep
- Other
```

---

# 9. Psychological Screening

MindBridge can support validated screening instruments where their use and licensing requirements permit.

Potential assessments include:

| Assessment | Purpose |
|---|---|
| PHQ-9 | Depressive symptom screening |
| GAD-7 | Anxiety symptom screening |
| WHO-5 | General wellbeing |
| Academic Stress Scale | Academic pressure |
| Burnout Assessment | Exhaustion/disengagement |

## Important

These assessments should be presented as **screening tools, not diagnoses**.

Example:

```text
Wellbeing Assessment

Overall Wellbeing
██████████████░░ 72%

Stress
████████████░░░░ Moderate

Anxiety Indicators
███████░░░░░░░░░ Mild

Depressive Indicators
████░░░░░░░░░░░░ Low

────────────────────────────

This assessment does not provide
a medical diagnosis.

Recommended:
Continue monitoring your wellbeing
and consider speaking with a
qualified counselor if concerns persist.
```

---

# 10. Wellbeing Score

MindBridge can calculate a normalized wellbeing indicator from available non-diagnostic signals.

Potential inputs:

```text
Mood
Stress
Sleep
Wellbeing questionnaire
Activity trends
Historical changes
```

The score should be clearly presented as a **platform wellbeing indicator**, not a clinical diagnosis.

Example:

```text
Wellbeing

72 / 100

↗ Improving
```

---

# 11. Module 2 — AI Support

## MindBridge Companion

The AI assistant provides conversational support for common student concerns.

It can help with:

- Academic stress
- Study pressure
- General emotional support
- Grounding exercises
- Breathing exercises
- Sleep-related habits
- Time management
- Loneliness
- Career-related stress
- Finding university resources
- Encouraging professional support

---

# 12. AI Safety Boundaries

The AI should **not**:

- Diagnose mental-health disorders.
- Prescribe medication.
- Recommend medication changes.
- Claim to replace a therapist.
- Provide dangerous medical advice.
- Encourage self-harm.
- Treat crisis conversations as normal conversations.
- Fabricate university resources.

The AI should instead:

- Provide supportive responses.
- Recognize safety concerns.
- Encourage appropriate human support.
- Use institution-approved resources.
- Escalate according to predefined safety protocols.

---

# 13. AI Architecture

```text
                    USER MESSAGE
                         │
                         ▼
                ┌─────────────────┐
                │ Safety Detector │
                └────────┬────────┘
                         │
                ┌────────┴────────┐
                │                 │
              SAFE            HIGH RISK
                │                 │
                ▼                 ▼
        Intent Classification   Crisis Flow
                │                 │
                ▼                 ▼
        Context / RAG          Human Support
                │
                ▼
               LLM
                │
                ▼
          Safety Filter
                │
                ▼
             Response
```

---

# 14. Safety Classifier

The safety layer should identify potentially concerning messages.

Possible categories:

```text
NORMAL
ACADEMIC_STRESS
ANXIETY
LONELINESS
SLEEP
RELATIONSHIP
EMOTIONAL_DISTRESS
SELF_HARM_RISK
IMMEDIATE_DANGER
```

The exact taxonomy should be validated during development.

---

# 15. Retrieval-Augmented Generation

MindBridge should not rely entirely on the LLM's internal knowledge.

A university-specific knowledge base can contain:

- Counseling center information
- Counselor availability
- Academic support
- Hostel support
- Student welfare services
- Financial assistance
- Anti-ragging resources
- University policies
- Emergency/support contacts
- Study resources

Architecture:

```text
Student Question
       ↓
Embedding
       ↓
Vector Database
       ↓
Relevant Documents
       ↓
LLM
       ↓
Grounded Response
```

This reduces hallucination and allows the AI to provide institution-specific information.

---

# 16. Module 3 — Risk & Early Detection

This is one of MindBridge's primary technical components.

The system should not simply classify a student as:

```text
Happy
Sad
Stressed
```

Instead, it can estimate a **support priority** using multiple signals.

Example:

```text
Support Priority: HIGH

Observed indicators:

- Persistent academic stress
- Declining wellbeing
- Reduced sleep quality
- Increasing anxiety indicators

Recommended action:

- Encourage counselor appointment
- Provide appropriate support resources
- Schedule follow-up
```

The result should never be presented as a medical diagnosis.

---

# 17. Risk Engine

Potential feature vector:

```python
[
    wellbeing_score,
    stress_score,
    anxiety_score,
    depression_score,
    sleep_score,
    mood_trend,
    stress_trend,
    checkin_frequency,
    academic_stress,
    crisis_indicator
]
```

The model can produce a probability or support-priority classification.

---

# 18. Risk Categories

```text
LOW
│
├── Self-help resources
├── Continue monitoring
└── Regular check-ins


MODERATE
│
├── Personalized resources
├── Additional check-in
└── Counseling recommendation


HIGH
│
├── Professional support recommendation
├── Counselor referral
└── Priority follow-up


CRITICAL
│
├── Immediate safety protocol
├── Human intervention
└── Relevant emergency/support resources
```

The exact escalation protocol must be developed with qualified mental-health professionals and the institution's policies.

---

# 19. Machine Learning

Potential models:

- Logistic Regression
- Random Forest
- XGBoost

The initial implementation can compare several models.

Example evaluation structure:

```text
Model Comparison

Logistic Regression
Accuracy: [actual result]

Random Forest
Accuracy: [actual result]

XGBoost
Accuracy: [actual result]
```

No performance numbers should be fabricated.

---

# 20. Explainable AI

The risk engine should explain why a student was flagged.

Example:

```text
Support Priority: HIGH

Contributing Indicators:

████████ Academic stress
███████   Declining wellbeing
██████    Poor sleep
█████     Increasing anxiety indicators
```

This provides counselors with interpretable information rather than an unexplained model output.

---

# 21. Trend Detection

MindBridge should analyze **changes over time**, rather than only today's information.

Example:

```text
Week 1 → 78
Week 2 → 74
Week 3 → 66
Week 4 → 57
```

The system can detect:

```text
⚠ Significant downward wellbeing trend
```

Possible intervention:

```text
- Send wellbeing check-in
- Recommend support resources
- Suggest counselor appointment
- Schedule follow-up
```

---

# 22. Wellbeing Digital Twin

## Concept

The Wellbeing Digital Twin is a longitudinal representation of a student's wellbeing trajectory.

It is **not a medical digital twin**.

It represents changes in:

- Mood
- Stress
- Sleep
- Wellbeing indicators
- Assessment results
- Interventions
- Follow-ups

Example:

```text
                 Student Wellbeing

100 ┤
 90 ┤ ●
 80 ┤   ●
 70 ┤      ●
 60 ┤         ●
 50 ┤             ●
 40 ┤
    └────────────────────────
      W1 W2 W3 W4 W5 W6
```

The system can identify:

```text
Your wellbeing indicator has declined
significantly over the last four weeks.

Potential contributing indicators:

- Academic stress increased
- Sleep quality declined
- Mood scores decreased
```

---

# 23. Module 4 — Intervention Engine

The risk engine should not stop at classification.

It should trigger appropriate actions.

```text
Risk Detection
      ↓
Intervention Recommendation
      ↓
Action
      ↓
Follow-up
      ↓
Outcome
```

Possible interventions:

- Breathing exercise
- Grounding exercise
- Study-break recommendation
- Sleep guidance
- University resource recommendation
- Counselor appointment
- Follow-up check-in

---

# 24. Module 5 — Counselor System

## Counselor Dashboard

```text
┌──────────────────────────────────────────────┐
│ Counselor Dashboard                          │
├──────────────────────────────────────────────┤
│                                              │
│ Active Cases       42                        │
│ High Priority      7                         │
│ Follow-ups Due     11                        │
│ Appointments Today 8                         │
│                                              │
├──────────────────────────────────────────────┤
│ Risk Distribution                            │
│                                              │
│ LOW       █████████████████                  │
│ MODERATE  ███████                            │
│ HIGH      ███                                │
│                                              │
├──────────────────────────────────────────────┤
│ Priority Cases                               │
│                                              │
│ STU-1024    HIGH       Follow-up today       │
│ STU-1148    HIGH       Appointment pending   │
│ STU-0912    MODERATE   Check-in due          │
│                                              │
└──────────────────────────────────────────────┘
```

---

# 25. Student Timeline

Counselors can view an authorized student's longitudinal timeline.

Example:

```text
Student: STU-1024

────────────────────────────────

Aug 01
Wellbeing: 74
Stress: 5/10

Aug 03
Wellbeing: 68
Stress: 7/10

Aug 05
Assessment completed

Aug 07
Support priority elevated

Aug 08
Counselor appointment scheduled

Aug 09
Follow-up completed
```

Access should follow strict authorization and privacy rules.

---

# 26. Appointment System

Students can view available counselors.

Example:

```text
Available Counselors

Counselor A

Available:
10:00 AM
11:30 AM
03:00 PM

[ Book Appointment ]
```

Counselors can manage:

- Availability
- Appointments
- Follow-ups
- Intervention records

---

# 27. Institutional Analytics

Administrators receive **aggregated and privacy-preserving information**.

Example:

```text
University Wellbeing Overview

Students participating: 8,420

Average wellbeing indicator: 71

Academic stress: 38%

Sleep concerns: 24%

Counseling demand: +17%
```

---

# 28. Department-Level Analytics

Example:

```text
Department Wellbeing Trends

CSE          █████████
Mechanical   ██████
Civil        █████
ECE          ███████
```

The system should avoid exposing individual students through these dashboards.

---

# 29. Intervention Effectiveness

The platform can track whether interventions are associated with improvement.

Example:

```text
Students receiving intervention

Before intervention:
Average wellbeing = [actual result]

After intervention:
Average wellbeing = [actual result]
```

The system should distinguish **observed association** from causal claims unless a proper study design supports causal conclusions.

---

# 30. Privacy Architecture

Privacy is a first-class requirement.

## Data Minimization

Only collect data necessary for the platform's functions.

## Encryption

Use:

```text
HTTPS
+
secure password hashing
+
encrypted sensitive storage where appropriate
```

## Role-Based Access Control

```text
STUDENT
   ↓
Own authorized data


COUNSELOR
   ↓
Assigned/authorized cases


ADMIN
   ↓
Aggregated institutional analytics
```

## Audit Logging

Record important access events:

```text
Who accessed data?
When?
What was accessed?
What action was performed?
```

## Consent

Students should clearly understand:

- What data is collected.
- Why it is collected.
- Who can access it.
- How it is used.
- How it can be managed.

---

# 31. Security Architecture

```text
                    CLIENT
                       │
                     HTTPS
                       │
                       ▼
                ┌──────────────┐
                │   FastAPI    │
                └──────┬───────┘
                       │
              Authentication
                       │
                       ▼
                Authorization
                       │
                       ▼
              Role-Based Access
                       │
           ┌───────────┼───────────┐
           ▼           ▼           ▼
       Student     Counselor      Admin
           │           │           │
           └───────────┼───────────┘
                       ▼
                  PostgreSQL
```

---

# See line 2067-2104 for the final technology stack
# 32. Technology Stack
## Frontend

```text
React
Vite
```

## Backend

```text
Python
FastAPI
Pydantic
SQLAlchemy
```

## Database

```text
PostgreSQL
```

## Machine Learning

```text
Python
pandas
NumPy
scikit-learn
```

## AI

```text
LLM
Safety Classifier
RAG
Embedding Model
Vector Database
```

## Authentication

```text
JWT
bcrypt
Role-Based Access Control
```

---

# 33. High-Level System Architecture

```text
                         ┌───────────────┐
                         │    STUDENT    │
                         └───────┬───────┘
                                 │
                                 ▼
                       ┌──────────────────┐
                       │   React Client   │
                       └────────┬─────────┘
                                │
                                ▼
                       ┌──────────────────┐
                       │     FastAPI      │
                       │     Backend      │
                       └────────┬─────────┘
                                │
              ┌─────────────────┼─────────────────┐
              │                 │                 │
              ▼                 ▼                 ▼
        ┌───────────┐     ┌────────────┐    ┌─────────────┐
        │ PostgreSQL│     │ AI Engine  │    │ Risk Engine │
        └───────────┘     └─────┬──────┘    └──────┬──────┘
                                │                  │
                         ┌──────┴───────┐          │
                         │              │          │
                         ▼              ▼          ▼
                       LLM       Safety Model   ML Model
                         │              │          │
                         └──────────────┼──────────┘
                                        │
                                        ▼
                              ┌──────────────────┐
                              │ Intervention     │
                              │ Engine           │
                              └────────┬─────────┘
                                       │
                         ┌─────────────┼──────────────┐
                         ▼             ▼              ▼
                    Self-help      Counselor       Safety /
                    Resources      Escalation      Support Flow
```

---

# 34. Database Schema

## Users

```text
users
────────────────
id
email
password_hash
role
created_at
updated_at
```

---

## Student Profiles

```text
student_profiles
────────────────
id
user_id
student_id
department
year
consent_status
created_at
```

---

## Check-ins

```text
checkins
────────────────
id
student_id
mood
stress
sleep
primary_concern
created_at
```

---

## Assessments

```text
assessments
────────────────
id
student_id
type
score
severity
created_at
```

---

## Risk Assessments

```text
risk_assessments
────────────────
id
student_id
risk_level
probability
factors
model_version
created_at
```

---

## Conversations

```text
conversations
────────────────
id
student_id
session_id
created_at
```

---

## Messages

```text
messages
────────────────
id
conversation_id
sender
content
safety_level
created_at
```

---

## Appointments

```text
appointments
────────────────
id
student_id
counselor_id
scheduled_at
status
notes
```

---

## Interventions

```text
interventions
────────────────
id
student_id
type
recommended_by
status
created_at
```

---

# 35. API Architecture

## Authentication

```text
POST /auth/register
POST /auth/login
```

## Students

```text
GET /students/profile
PUT /students/profile
```

## Check-ins

```text
POST /checkins
GET /checkins/history
```

## Assessments

```text
POST /assessments
GET /assessments/results
```

## Risk

```text
POST /risk/evaluate
GET /risk/history
```

## AI

```text
POST /chat/message
```

## Resources

```text
GET /resources
GET /resources/{id}
```

## Appointments

```text
GET /appointments/available
POST /appointments/book
DELETE /appointments/{id}
```

## Counselor

```text
GET /counselor/dashboard
GET /counselor/students
GET /counselor/students/{id}
```

## Analytics

```text
GET /analytics/overview
GET /analytics/trends
```

---

# 36. Frontend Page Map

## Student

```text
/login
/register
/student/dashboard
/student/checkin
/student/assessment
/student/assessment/{id}
/student/chat
/student/wellbeing
/student/resources
/student/appointments
/student/profile
/student/privacy
```

## Counselor

```text
/counselor/dashboard
/counselor/students
/counselor/students/{id}
/counselor/appointments
/counselor/interventions
/counselor/profile
```

## Administrator

```text
/admin/dashboard
/admin/analytics
/admin/trends
/admin/departments
/admin/system
```

---

# 37. SIH Novelty

MindBridge should differentiate itself through the following concepts.

| Conventional Approach | MindBridge |
|---|---|
| AI chatbot | AI + safety architecture |
| One-time questionnaire | Continuous monitoring |
| Generic responses | Personalized interventions |
| Static resources | RAG-powered university resources |
| Simple risk label | Explainable risk assessment |
| Student-only system | Student + counselor + institution |
| Reactive support | Early intervention |
| No follow-up | Intervention tracking |
| Generic information | Institution-specific knowledge |
| Centralized access | Role-based privacy |

---

# 38. Key Innovation

## Early Intervention Loop

The central innovation is:

```text
DETECT
   ↓
UNDERSTAND
   ↓
SUPPORT
   ↓
ESCALATE
   ↓
INTERVENE
   ↓
FOLLOW UP
   ↓
MEASURE
```

This creates a continuous support cycle instead of a one-time chatbot interaction.

---

# 39. Major Differentiator

## Wellbeing Digital Twin

The platform maintains a longitudinal wellbeing representation.

```text
Daily Check-ins
       +
Assessments
       +
Mood
       +
Stress
       +
Sleep
       +
Interventions
       ↓
Wellbeing Timeline
       ↓
Trend Detection
       ↓
Early Intervention
```

This allows the system to detect **changes**, not merely isolated events.

---

# 40. AI + ML Division

A major architectural principle:

> **The LLM should not be responsible for everything.**

Use different components for different jobs.

```text
LLM
│
├── Conversational support
├── Explanation
└── Resource guidance


Safety Model
│
├── Safety classification
└── Crisis detection


ML Risk Model
│
├── Risk estimation
└── Trend-based prediction


Rules Engine
│
├── Safety thresholds
├── Escalation logic
└── Institutional policies


RAG
│
├── University resources
├── Policies
└── Support information
```

This is substantially more robust than:

```text
User → LLM → Answer
```

---

# 41. MVP

The first working version should contain:

## Foundation

- React frontend
- FastAPI backend
- PostgreSQL
- Authentication
- Role-based access

## Student

- Dashboard
- Daily check-in
- Mood tracking
- Assessment system
- Wellbeing graph

## AI

- AI companion
- Safety layer
- RAG resource system
- Personalized recommendations

## Risk

- Risk scoring
- Trend detection
- Explainability

## Counselor

- Dashboard
- Student cases
- Appointments
- Intervention tracking

## Admin

- Aggregated analytics
- Department trends

---

# 42. Development Phases

## Phase 1 — Foundation

```text
Project setup
↓
Database
↓
Backend
↓
Authentication
↓
RBAC
```

---

## Phase 2 — Student Module

```text
Dashboard
↓
Check-ins
↓
Assessments
↓
Mood tracking
↓
Wellbeing visualization
```

---

## Phase 3 — AI

```text
AI assistant
↓
Safety classifier
↓
RAG
↓
Resource recommendations
```

---

## Phase 4 — ML

```text
Feature engineering
↓
Dataset preparation
↓
Baseline model
↓
Random Forest
↓
XGBoost
↓
Evaluation
↓
Explainability
```

---

## Phase 5 — Counselor

```text
Counselor dashboard
↓
Student cases
↓
Risk alerts
↓
Appointments
↓
Interventions
↓
Follow-ups
```

---

## Phase 6 — Administration

```text
Aggregated analytics
↓
Department trends
↓
Institutional insights
↓
Intervention statistics
```

---

## Phase 7 — SIH Polish

```text
Security
↓
Privacy
↓
Audit logs
↓
Demo dataset
↓
Testing
↓
Evaluation
↓
Architecture diagrams
↓
Presentation
↓
Demo
```

---

# 43. SIH Demonstration Scenario

The final demo should tell a story.

## Scenario

A student is experiencing increasing academic pressure.

### Step 1 — Check-in

```text
Mood: 3/5
Stress: 8/10
Sleep: Poor
Primary concern: Academics
```

---

### Step 2 — Historical Data

The system notices:

```text
Week 1 → Wellbeing 78
Week 2 → Wellbeing 72
Week 3 → Wellbeing 64
Week 4 → Wellbeing 55
```

---

### Step 3 — Trend Detection

```text
⚠ Significant downward wellbeing trend detected.
```

---

### Step 4 — Risk Engine

```text
Support Priority: HIGH

Contributing indicators:

- Increasing academic stress
- Declining wellbeing
- Poor sleep
- Increasing anxiety indicators
```

---

### Step 5 — Intervention

MindBridge recommends:

```text
- Guided grounding exercise
- Academic stress resources
- Counselor appointment
- Follow-up check-in
```

---

### Step 6 — Counselor

The counselor receives an authorized priority notification.

```text
STU-1024

Support Priority: HIGH

Reason:
Declining wellbeing trajectory

Recommended:
Follow-up within institutional policy timeframe
```

---

### Step 7 — Follow-up

After intervention:

```text
Wellbeing trajectory:

55 → 61 → 67
```

The system records the intervention outcome.

---

# 44. Evaluation Metrics

The project should be evaluated across multiple dimensions.

## ML

- Precision
- Recall
- F1-score
- ROC-AUC
- Confusion matrix
- Calibration

For safety-critical classification, **recall for high-risk classes** should receive particular attention.

---

## AI

Evaluate:

- Response safety
- Hallucination rate
- Resource grounding
- Relevance
- Toxicity
- Crisis-routing accuracy

---

## System

Measure:

- API response time
- Availability
- Concurrent users
- Database performance
- Error rate

---

## Product

Measure:

- Check-in completion
- Resource engagement
- Counselor referrals
- Follow-up completion
- User satisfaction

---

# 45. Privacy & Ethical Requirements

MindBridge should follow privacy-by-design principles.

Key principles:

```text
Consent
+
Data Minimization
+
Purpose Limitation
+
Access Control
+
Encryption
+
Auditability
+
Transparency
+
Human Oversight
```

The system must clearly communicate that AI-generated output is not professional diagnosis or treatment.

---

# 46. What We Should NOT Build

Avoid unnecessary features that increase complexity without improving the core problem.

Do not initially build:

- Social media feeds
- Public student profiles
- AI therapist avatars
- Medication recommendation systems
- Medical diagnosis
- Unrestricted AI conversations
- Facial emotion recognition
- Voice emotion detection without a strong validated need
- Excessive gamification
- Complex wearable integrations

The goal is:

> **Reliable intervention infrastructure, not an AI gimmick.**

---

# 47. Recommended Project Architecture

```text
mindbridge/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── ai/
│   │   ├── ml/
│   │   └── main.py
│   │
│   └── requirements.txt
│
├── ml/
│   ├── data/
│   ├── notebooks/
│   ├── training/
│   ├── evaluation/
│   └── models/
│
├── ai/
│   ├── prompts/
│   ├── safety/
│   ├── rag/
│   └── evaluation/
│
├── database/
│   ├── migrations/
│   └── seed/
│
├── docs/
│   ├── architecture/
│   ├── api/
│   ├── diagrams/
│   └── research/
│
├── tests/
│   ├── backend/
│   ├── frontend/
│   ├── ai/
│   └── ml/
│
├── .env.example
├── docker-compose.yml
├── README.md
└── LICENSE
```

---

# 48. Final Product Architecture

```text
                         ┌────────────────────┐
                         │      STUDENT       │
                         └─────────┬──────────┘
                                   │
                                   ▼
                         ┌────────────────────┐
                         │   React Frontend   │
                         └─────────┬──────────┘
                                   │
                                   ▼
                         ┌────────────────────┐
                         │      FastAPI       │
                         │       API          │
                         └─────────┬──────────┘
                                   │
              ┌────────────────────┼────────────────────┐
              │                    │                    │
              ▼                    ▼                    ▼
       ┌─────────────┐      ┌─────────────┐      ┌─────────────┐
       │ PostgreSQL  │      │  AI Engine  │      │ Risk Engine │
       └─────────────┘      └──────┬──────┘      └──────┬──────┘
                                   │                    │
                           ┌───────┼───────┐            │
                           │       │       │            │
                           ▼       ▼       ▼            ▼
                          LLM     RAG   Safety      ML Model
                                           │            │
                                           └──────┬─────┘
                                                  │
                                                  ▼
                                        ┌──────────────────┐
                                        │ Intervention     │
                                        │ Engine           │
                                        └────────┬─────────┘
                                                 │
                              ┌──────────────────┼──────────────────┐
                              │                  │                  │
                              ▼                  ▼                  ▼
                         Resources          Counselor          Safety Flow
                              │                  │
                              ▼                  ▼
                         STUDENT            PROFESSIONAL
                                              SUPPORT
```

---

# 49. Core Philosophy

MindBridge should follow one fundamental principle:

> **AI should augment mental-health support, not replace mental-health professionals.**

The system should therefore prioritize:

```text
Early Detection
      +
Safe Support
      +
Human Oversight
      +
Privacy
      +
Continuous Follow-up
```

---

# 50. One-Line SIH Pitch

> **MindBridge is a privacy-first, AI-assisted student wellbeing platform that detects concerning wellbeing trends early, provides personalized support, and intelligently connects students with professional counselors before problems escalate.**

---

# 51. Short SIH Pitch

> Students often experience academic stress, anxiety, loneliness, burnout, and other psychological challenges without seeking support early. Existing digital solutions frequently stop at chatbots or one-time assessments.
>
> MindBridge introduces a continuous early-intervention approach. It combines student wellbeing check-ins, validated screening, longitudinal trend analysis, a safety-aware AI companion, explainable risk assessment, personalized interventions, counselor escalation, and privacy-preserving institutional analytics.
>
> Rather than replacing mental-health professionals, MindBridge acts as a bridge between students and professional support — helping institutions identify concerning trends earlier and respond more effectively.

---

# 52. Development Principle

We will build MindBridge **incrementally**.

```text
Architecture
      ↓
Database
      ↓
Backend
      ↓
Authentication
      ↓
Student Module
      ↓
AI Module
      ↓
Risk Engine
      ↓
Counselor Module
      ↓
Admin Module
      ↓
Integration
      ↓
Testing
      ↓
Security
      ↓
Deployment
      ↓
SIH Demo
```

We should **not** generate the entire project in one shot.

Each module should be:

```text
Designed
   ↓
Implemented
   ↓
Tested
   ↓
Integrated
   ↓
Verified
```

before moving to the next module.

---

# 53. Project North Star

```text
DETECT
   ↓
UNDERSTAND
   ↓
SUPPORT
   ↓
ESCALATE
   ↓
INTERVENE
   ↓
FOLLOW UP
   ↓
MEASURE
```

## MindBridge

> ### From silent struggle to timely support.
```
╔════════════════════════════════════════════╗
║          MINDBRIDGE — ZERO COST            ║
╠════════════════════════════════════════════╣
║                                            ║
║ Frontend                                   ║
║ React + Vite + Tailwind + Recharts         ║
║                                            ║
║ Backend                                    ║
║ FastAPI + Pydantic + SQLAlchemy            ║
║                                            ║
║ Database                                   ║
║ PostgreSQL — Local                         ║
║                                            ║
║ Vector Database                            ║
║ Qdrant — Self-hosted                       ║
║                                            ║
║ LLM                                        ║
║ Ollama — Local                             ║
║                                            ║
║ Embeddings                                 ║
║ Sentence Transformers — Local              ║
║                                            ║
║ ML                                         ║
║ pandas + NumPy + scikit-learn              ║
║                                            ║
║ Authentication                             ║
║ JWT + bcrypt                               ║
║                                            ║
║ Testing                                    ║
║ pytest + Vitest                            ║
║                                            ║
║ Infrastructure                             ║
║ Docker + Git + GitHub                      ║
║                                            ║
║ Cost                                       ║
║ ₹0                                         ║
╚════════════════════════════════════════════╝
```

---

# 12. Technical Implementation Status (Completed)

All phases of the SIH Ready Blueprint have been fully implemented in the current codebase:

- **Phase 1 (Auth & RBAC):** JWT-based Auth with multi-role routing (Student, Counselor, Admin). School-based registration system fully active.
- **Phase 2 (Student Experience):** Longitudinal `/checkins/` endpoints with Recharts-powered dashboard visualizers.
- **Phase 3 (Safety & AI):** Global `MindBridgeChat.jsx` integrated with Groq LLM and a robust Safety Classification layer.
- **Phase 4 (Counselor Operations):** `RiskEvent` priority queues, enabling counselors to triage high-risk crisis detections instantly.
- **Phase 5 (Resource Hub):** A curated `ResourceHub.jsx` highlighting Indian national helplines and evidence-based stress strategies.
- **Phase 6 (Gamification & Polish):** Streak counters and check-in point systems natively integrated into backend models and beautifully displayed on the student dashboard. User sign-up flow fully operational.
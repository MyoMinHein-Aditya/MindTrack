from sqlalchemy.orm import Session
from app.models.assessment import Assessment, AssessmentResponse, WellbeingScore, WellbeingFactor, AssessmentQuestion

# Base weights according to the prompt
WEIGHTS = {
    "Mood": 0.20,
    "Sleep": 0.15,
    "Energy": 0.10,
    "Academic pressure": 0.15,
    "Social connection": 0.15,
    "School experience": 0.15,
    "Support availability": 0.10,
}

def get_category_label(score: float) -> str:
    if score >= 80:
        return "Thriving"
    elif score >= 60:
        return "Stable"
    elif score >= 40:
        return "Needs attention"
    else:
        return "Significant concern"

def calculate_and_store_wellbeing(db: Session, assessment_id: int, student_id: int):
    # 1. Fetch responses for this assessment
    responses = db.query(AssessmentResponse).filter(AssessmentResponse.assessment_id == assessment_id).all()
    
    # 2. Map questions to categories and calculate raw scores
    category_scores = {}
    for r in responses:
        question = db.query(AssessmentQuestion).filter(AssessmentQuestion.id == r.question_id).first()
        if question and question.category in WEIGHTS:
            # Assume responses are 1-5, normalize to 0-100
            # Example: 1 = 20, 5 = 100
            normalized = (r.score / 5.0) * 100
            if question.category not in category_scores:
                category_scores[question.category] = []
            category_scores[question.category].append(normalized)

    # 3. Apply weights and calculate total score
    total_score = 0.0
    factor_records = []
    
    # Fetch previous assessment to calculate change (Explainable Score)
    previous_assessment = db.query(Assessment).filter(
        Assessment.student_id == student_id, 
        Assessment.id < assessment_id
    ).order_by(Assessment.created_at.desc()).first()
    
    prev_factors = {}
    if previous_assessment and previous_assessment.wellbeing_score:
        for f in previous_assessment.wellbeing_score.factors:
            prev_factors[f.category] = f.score_contribution

    for cat, weight in WEIGHTS.items():
        cat_scores = category_scores.get(cat, [50.0]) # Default 50 if missing
        avg_cat_score = sum(cat_scores) / len(cat_scores)
        contribution = avg_cat_score * weight
        total_score += contribution
        
        change = None
        if cat in prev_factors:
            change = contribution - prev_factors[cat]

        factor_records.append({
            "category": cat,
            "score_contribution": contribution,
            "change_from_previous": change
        })

    # 4. Save WellbeingScore
    ws = WellbeingScore(
        assessment_id=assessment_id,
        total_score=total_score,
        category_label=get_category_label(total_score)
    )
    db.add(ws)
    db.flush()

    # 5. Save WellbeingFactors
    for f in factor_records:
        db.add(WellbeingFactor(
            wellbeing_score_id=ws.id,
            category=f["category"],
            score_contribution=f["score_contribution"],
            change_from_previous=f["change_from_previous"]
        ))

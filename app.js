const express = require('express');
const cors = require('cors');
const app = express(); // Middleware 
app.use(cors()); 
app.use(express.json()); 
// Dados mock do JSON de bureau 
const bureauData = { "bureau_info": { "name": "BureauScore Brasil", "cnpj": "12.345.678/0001-90", "api_version": "3.2.1", "integration_type": "REST_API", "response_timestamp": new Date().toISOString(), "query_id": "Q-20260901-001", "query_timestamp": new Date().toISOString() }, "query": { "cpf_queried": "05390824903", "query_type": "onboarding_kyc", "query_status": "success" }, "score_response": { "score": 789, "score_brand": "SCORE_BUREAUSCORE", "score_range": "EXCELENTE", "percentile_rank": 87, "score_valid_until": "2026-12-01", "score_trend": "ESTÁVEL", "score_interpretation": "Cliente com perfil excelente para crédito" }, "credit_profile": { "profile_classification": "BAIXO_RISCO", "credit_status": "ATIVO", "years_as_customer": 12, "customer_since": "2014-03-15", "total_inquiries_last_year": 2, "inquiry_frequency": "NORMAL" }, "financial_summary": { "total_accounts": 3, "active_accounts": 3, "inactive_accounts": 0, "closed_accounts": 0, "total_credit_limit": 85000, "total_utilization": 5000, "utilization_percentage": 5.9, "total_debt": 0, "in_default": false, "payment_history": "IMPECÁVEL", "average_days_overdue": 0 }, "negative_records": { "total_negatives": 0, "atrasos_30_dias": 0, "atrasos_60_dias": 0, "atrasos_90_dias": 0, "atrasos_superior_90_dias": 0, "contratos_vencidos": 0, "protessos": 0, "negativos_últimos_12_meses": 0, "status": "SEM_REGISTROS_NEGATIVOS" }, "risk_indicators": { "default_risk": "MUY_BAJO", "payment_pattern_risk": "BAJO", "account_volatility": "ESTÁVEL", "fraud_risk": "BAJO", "credit_behavior_score": 95 }, "decision_metrics": { "overall_risk_score": 15, "risk_level": "BAIXO", "recommendedAction": "APROBAR_AUTOMATICO", "approval_confidence": 0.96, "approval_reasoning": "Score excelente, sem negativos, histórico impecável, risco muito baixo", "required_documentation": "MÍNIMA", "enhanced_due_diligence_required": false }, "pep_check": { "pep_status": "NO_ENCONTRADO", "sanction_match": false, "aml_risk": "BAJO" } }; 
// ========================================== 
// ENDPOINT 1: Retorna dados mock fixos 
// ========================================== 
app.get('/api/consulta/:cpf', (req, res) => { const { cpf } = req.params; 
// Simula processamento (delay de 450ms como uma bureau real) 
// ========================================== 
// ENDPOINT 2: Health check (Railway precisa) 
// ========================================== 
app.get('/', (req, res) => { res.json({ status: "OK", service: "BureauScore Brasil Mock API", version: "1.0.0", endpoints: [ "GET /api/consulta/:cpf - Consulta score de crédito", "GET / - Health check" ] }); }); // ========================================== // Iniciar servidor // ========================================== 
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => { console.log(`🎉 Servidor rodando em http://localhost:${PORT}`); 
console.log(`📊 Teste: http://localhost:${PORT}/api/consulta/05390824903`); });

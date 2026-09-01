const express = require('express');
const cors = require('cors');
 
const app = express();
 
// Middleware
app.use(cors());
app.use(express.json());
 
// Dados mock do JSON de bureau
const bureauData = {
  "bureau_info": {
    "name": "BureauScore Brasil",
    "cnpj": "12.345.678/0001-90",
    "api_version": "3.2.1",
    "integration_type": "REST_API",
    "response_timestamp": "2026-09-01T14:35:22Z",
    "query_id": "Q-20260901-001",
    "query_timestamp": "2026-09-01T14:30:15Z"
  },
  "query": {
    "cpf_queried": "05390824903",
    "query_type": "onboarding_kyc",
    "query_status": "success"
  },
  "score_response": {
    "score": 789,
    "score_brand": "SCORE_BUREAUSCORE",
    "score_range": "EXCELENTE",
    "percentile_rank": 87,
    "score_valid_until": "2026-12-01",
    "score_trend": "ESTÁVEL",
    "score_interpretation": "Cliente com perfil excelente para crédito"
  },
  "credit_profile": {
    "profile_classification": "BAIXO_RISCO",
    "credit_status": "ATIVO",
    "years_as_customer": 12,
    "customer_since": "2014-03-15",
    "total_inquiries_last_year": 2,
    "inquiry_frequency": "NORMAL"
  },
  "financial_summary": {
    "total_accounts": 3,
    "active_accounts": 3,
    "inactive_accounts": 0,
    "closed_accounts": 0,
    "total_credit_limit": 85000,
    "total_utilization": 5000,
    "utilization_percentage": 5.9,
    "total_debt": 0,
    "in_default": false,
    "payment_history": "IMPECÁVEL",
    "average_days_overdue": 0
  },
  "accounts_detail": [
    {
      "account_id": "ACC-001",
      "account_type": "CARTÃO_CRÉDITO",
      "financial_institution": "BANCO_DO_BRASIL",
      "status": "ATIVO",
      "open_date": "2015-01-10",
      "credit_limit": 45000,
      "current_balance": 3000,
      "utilization_percentage": 6.7,
      "last_payment_date": "2026-08-28",
      "days_since_last_payment": 4,
      "payment_status": "EM_DIA"
    },
    {
      "account_id": "ACC-002",
      "account_type": "CARTÃO_CRÉDITO",
      "financial_institution": "CAIXA_ECONÔMICA",
      "status": "ATIVO",
      "open_date": "2017-06-15",
      "credit_limit": 40000,
      "current_balance": 2000,
      "utilization_percentage": 5.0,
      "last_payment_date": "2026-08-25",
      "days_since_last_payment": 7,
      "payment_status": "EM_DIA"
    },
    {
      "account_id": "ACC-003",
      "account_type": "EMPRÉSTIMO_PESSOAL",
      "financial_institution": "BANCO_BRADESCO",
      "status": "QUITADO",
      "open_date": "2020-02-20",
      "close_date": "2023-08-10",
      "original_amount": 25000,
      "final_balance": 0,
      "number_of_payments": 36,
      "missed_payments": 0,
      "payment_status": "QUITADO_ADIMPLENTE"
    }
  ],
  "negative_records": {
    "total_negatives": 0,
    "atrasos_30_dias": 0,
    "atrasos_60_dias": 0,
    "atrasos_90_dias": 0,
    "atrasos_superior_90_dias": 0,
    "contratos_vencidos": 0,
    "protessos": 0,
    "falências": 0,
    "recuperações": 0,
    "negativos_últimos_12_meses": 0,
    "negativos_últimos_24_meses": 0,
    "status": "SEM_REGISTROS_NEGATIVOS"
  },
  "payment_behavior": {
    "payment_pattern": "REGULAR_EXCELENTE",
    "punctuality_index": 100,
    "average_days_to_payment": 2,
    "most_recent_payment": "2026-08-28",
    "payment_consistency": "MUITO_CONSISTENTE",
    "behavioral_classification": "PAGADOR_EXEMPLAR"
  },
  "risk_indicators": {
    "default_risk": "MUY_BAJO",
    "payment_pattern_risk": "BAJO",
    "account_volatility": "ESTÁVEL",
    "fraud_risk": "BAJO",
    "credit_behavior_score": 95,
    "mlr_compatibility": {
      "score": 96,
      "status": "ALTAMENTE_COMPATÍVEL"
    }
  },
  "address_information": {
    "current_address": "Rua dos Pinheiros, 456 - Apto 1205 - Vila Mariana",
    "city": "São Paulo",
    "state": "SP",
    "postal_code": "04226-130",
    "address_verified": true,
    "address_confidence": 0.98,
    "address_history": 1,
    "previous_addresses": [],
    "years_at_current_address": 3
  },
  "pep_check": {
    "pep_status": "NO_ENCONTRADO",
    "sanction_match": false,
    "aml_risk": "BAJO",
    "politically_exposed_person": false,
    "government_positions": [],
    "restricted_list_match": false
  },
  "sanction_screening": {
    "status": "CLEAR",
    "sanction_lists_checked": [
      "OFAC_SDN_LIST",
      "UN_SECURITY_COUNCIL",
      "EU_SANCTIONS",
      "BACEN_LISTA_RESTRITIVA",
      "PEP_BACEN"
    ],
    "matches_found": 0,
    "screening_confidence": 0.99,
    "last_screening_date": "2026-09-01T14:30:15Z"
  },
  "decision_metrics": {
    "overall_risk_score": 15,
    "risk_level": "BAIXO",
    "recommendedAction": "APROBAR_AUTOMATICO",
    "approval_confidence": 0.96,
    "approval_reasoning": "Score excelente, sem negativos, histórico impecável, risco muito baixo",
    "required_documentation": "MÍNIMA",
    "enhanced_due_diligence_required": false
  },
  "document_verification": {
    "cpf_validation": {
      "cpf_format": "05390824903",
      "cpf_valid": true,
      "cpf_active": true,
      "cpf_registered": true,
      "date_cpf_registration": "2003-08-15",
      "validation_confidence": 1.0
    }
  },
  "additional_flags": {
    "income_level_indicator": "MEDIO_ALTO",
    "employment_stability": "ALTA",
    "account_age_indicator": "MADURO",
    "credit_seeking_pattern": "NORMAL",
    "recent_credit_applications": 0,
    "debt_concentration_risk": "BAIXO"
  },
  "response_metadata": {
    "api_response_time_ms": 450,
    "data_freshness_hours": 0,
    "bureau_status": "ONLINE",
    "data_source": "LIVE_QUERY",
    "cache_used": false
  }
};
 
// Endpoint: Consulta bureau
app.get('/api/consulta/:cpf', (req, res) => {
  const { cpf } = req.params;
 
  // Simula delay de processamento (450ms como uma bureau real)
   
// Endpoint: Health check
app.get('/', (req, res) => {
  res.json({
    status: "OK",
    service: "BureauScore Brasil Mock API",
    version: "1.0.0",
    endpoints: [
      "GET /api/consulta/:cpf - Consulta score de crédito",
      "GET / - Health check"
    ]
  });
});
 
// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🎉 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📊 Teste: http://localhost:${PORT}/api/consulta/05390824903`);
});

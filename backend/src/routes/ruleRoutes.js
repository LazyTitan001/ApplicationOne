const express = require('express');
const {
  getAllRules,
  createRule,
  updateRule,
  updateRuleOperator,
  getRuleById,
  deleteRule,
  combineRulesController,
  evaluateRuleController
} = require('../controllers/ruleController');

const router = express.Router();

// Basic CRUD operations
router.get('/', getAllRules);
router.post('/', createRule);
router.get('/:id', getRuleById);
router.put('/:id', updateRule);
router.delete('/:id', deleteRule);

// Specialized operations
router.put('/:id/operator', updateRuleOperator);
router.post('/combine', combineRulesController);
router.post('/evaluate', evaluateRuleController);

module.exports = router;
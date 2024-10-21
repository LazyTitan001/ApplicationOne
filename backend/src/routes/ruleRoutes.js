const express = require('express');
const {
  getAllRules,
  createRule,
  getRuleById,
  combineRulesController,
  evaluateRuleController
} = require('../controllers/ruleController');

const router = express.Router();

router.get('/', getAllRules);
router.post('/create', createRule);
router.get('/:id', getRuleById);
router.post('/combine', combineRulesController);
router.post('/evaluate', evaluateRuleController);

module.exports = router;
const Rule = require('../models/Rule');
const { parseRule, combineRules, evaluateRule } = require('../utils/ruleUtils');

const getAllRules = async (req, res) => {
  try {
    const rules = await Rule.find({}, 'name ruleString ast');
    res.json(rules);
  } catch (error) {
    console.error('Error in getAllRules:', error);
    res.status(500).json({ error: error.message });
  }
};

const createRule = async (req, res) => {
  try {
    console.log('Received request body:', JSON.stringify(req.body, null, 2));
    const { name, ruleString } = req.body;
    if (!name || !ruleString) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const ast = parseRule(ruleString);
    const rule = new Rule({ name, ruleString, ast });
    await rule.save();
    res.status(201).json({
      id: rule._id,
      name: rule.name,
      ruleString: rule.ruleString,
      ast: rule.ast
    });
  } catch (error) {
    console.error('Error in createRule:', error);
    res.status(500).json({ error: error.message });
  }
};

const getRuleById = async (req, res) => {
  try {
    const ruleId = req.params.id;
    const rule = await Rule.findById(ruleId);
    if (!rule) {
      return res.status(404).json({ error: 'Rule not found' });
    }
    res.json({
      id: rule._id,
      name: rule.name,
      ruleString: rule.ruleString,
      ast: rule.ast
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const combineRulesController = async (req, res) => {
  try {
    const { ruleIds } = req.body;
    const rules = await Rule.find({ _id: { $in: ruleIds } });
    const ruleAsts = rules.map(rule => rule.ast);
    const combinedAst = combineRules(ruleAsts);
    res.json(combinedAst);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const evaluateRuleController = (req, res) => {
  try {
    const { ast, data } = req.body;
    const result = evaluateRule(ast, data);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllRules,
  createRule,
  getRuleById,
  combineRulesController,
  evaluateRuleController
};
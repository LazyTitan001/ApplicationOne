// controllers/ruleController.js

const Rule = require('../models/Rule');
const { parseRule, combineRules, evaluateRule } = require('../utils/ruleParser');

const getAllRules = async (req, res) => {
  try {
    const rules = await Rule.find({}, 'name ruleString ast');
    res.json(rules);
  } catch (error) {
    console.error('Error in getAllRules:', error);
    res.status(500).json({
      error: 'Failed to fetch rules',
      details: error.message
    });
  }
};

const createRule = async (req, res) => {
  try {
    const { name, ruleString } = req.body;

    // Validate input
    if (!name || typeof name !== 'string') {
      return res.status(400).json({
        error: 'Invalid name format',
        details: 'Name must be a non-empty string'
      });
    }

    if (!ruleString || typeof ruleString !== 'string') {
      return res.status(400).json({
        error: 'Invalid rule string format',
        details: 'Rule string must be a non-empty string'
      });
    }

    // Parse and validate rule
    let ast;
    try {
      ast = parseRule(ruleString);
    } catch (parseError) {
      return res.status(400).json({
        error: 'Invalid rule format',
        details: parseError.message
      });
    }

    // Check for duplicate name
    const existingRule = await Rule.findOne({ name });
    if (existingRule) {
      return res.status(409).json({
        error: 'Duplicate rule name',
        details: 'A rule with this name already exists'
      });
    }

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
    res.status(500).json({
      error: 'Failed to create rule',
      details: error.message
    });
  }
};

const getRuleById = async (req, res) => {
  try {
    const ruleId = req.params.id;

    if (!ruleId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        error: 'Invalid rule ID format'
      });
    }

    const rule = await Rule.findById(ruleId);
    if (!rule) {
      return res.status(404).json({
        error: 'Rule not found',
        details: `No rule found with ID: ${ruleId}`
      });
    }

    res.json({
      id: rule._id,
      name: rule.name,
      ruleString: rule.ruleString,
      ast: rule.ast
    });

  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch rule',
      details: error.message
    });
  }
};

const combineRulesController = async (req, res) => {
  try {
    const { ruleIds } = req.body;

    if (!Array.isArray(ruleIds) || ruleIds.length === 0) {
      return res.status(400).json({
        error: 'Invalid input',
        details: 'ruleIds must be a non-empty array'
      });
    }

    // Validate all IDs
    if (!ruleIds.every(id => id.match(/^[0-9a-fA-F]{24}$/))) {
      return res.status(400).json({
        error: 'Invalid rule ID format',
        details: 'One or more rule IDs are invalid'
      });
    }

    const rules = await Rule.find({ _id: { $in: ruleIds } });

    if (rules.length !== ruleIds.length) {
      return res.status(404).json({
        error: 'Rules not found',
        details: 'One or more rules could not be found'
      });
    }

    const ruleAsts = rules.map(rule => rule.ast);
    const combinedAst = combineRules(ruleAsts);

    res.json(combinedAst);

  } catch (error) {
    res.status(500).json({
      error: 'Failed to combine rules',
      details: error.message
    });
  }
};

const evaluateRuleController = (req, res) => {
  try {
    const { ast, data } = req.body;

    if (!ast || typeof ast !== 'object') {
      return res.status(400).json({
        error: 'Invalid AST format',
        details: 'AST must be a valid object'
      });
    }

    if (!data || typeof data !== 'object') {
      return res.status(400).json({
        error: 'Invalid data format',
        details: 'Data must be a valid object'
      });
    }

    const result = evaluateRule(ast, data);
    res.json({ result });

  } catch (error) {
    res.status(500).json({
      error: 'Rule evaluation failed',
      details: error.message
    });
  }
};

module.exports = {
  getAllRules,
  createRule,
  getRuleById,
  combineRulesController,
  evaluateRuleController
};
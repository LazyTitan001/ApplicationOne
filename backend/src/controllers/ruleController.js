const Rule = require('../models/Rule');
const { parseRule, combineRules, evaluateRule } = require('../utils/ruleUtils');

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

const updateRule = async (req, res) => {
  try {
    const ruleId = req.params.id;
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

    // Parse and validate new rule
    let ast;
    try {
      ast = parseRule(ruleString);
    } catch (parseError) {
      return res.status(400).json({
        error: 'Invalid rule format',
        details: parseError.message
      });
    }

    // Check if rule exists
    const existingRule = await Rule.findById(ruleId);
    if (!existingRule) {
      return res.status(404).json({
        error: 'Rule not found',
        details: `No rule found with ID: ${ruleId}`
      });
    }

    // Check for duplicate name, excluding the current rule
    const duplicateRule = await Rule.findOne({ 
      name, 
      _id: { $ne: ruleId }
    });
    if (duplicateRule) {
      return res.status(409).json({
        error: 'Duplicate rule name',
        details: 'A different rule with this name already exists'
      });
    }

    // Update the rule
    const updatedRule = await Rule.findByIdAndUpdate(
      ruleId,
      { name, ruleString, ast },
      { new: true }
    );

    res.json({
      id: updatedRule._id,
      name: updatedRule.name,
      ruleString: updatedRule.ruleString,
      ast: updatedRule.ast
    });

  } catch (error) {
    console.error('Error in updateRule:', error);
    res.status(500).json({
      error: 'Failed to update rule',
      details: error.message
    });
  }
};

const updateRuleOperator = async (req, res) => {
  try {
    const ruleId = req.params.id;
    const { path, newOperator } = req.body;

    if (!Array.isArray(path) || path.length === 0) {
      return res.status(400).json({
        error: 'Invalid path format',
        details: 'Path must be a non-empty array'
      });
    }

    if (!newOperator || typeof newOperator !== 'string') {
      return res.status(400).json({
        error: 'Invalid operator',
        details: 'Operator must be a non-empty string'
      });
    }

    const rule = await Rule.findById(ruleId);
    if (!rule) {
      return res.status(404).json({
        error: 'Rule not found',
        details: `No rule found with ID: ${ruleId}`
      });
    }

    // Deep clone the AST
    const newAst = JSON.parse(JSON.stringify(rule.ast));
    
    // Navigate to the specified path and update the operator
    let current = newAst;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    current[path[path.length - 1]].operator = newOperator;

    // Validate the modified AST
    try {
      evaluateRule(newAst, {});
    } catch (error) {
      return res.status(400).json({
        error: 'Invalid operator modification',
        details: error.message
      });
    }

    rule.ast = newAst;
    await rule.save();

    res.json({
      id: rule._id,
      name: rule.name,
      ruleString: rule.ruleString,
      ast: rule.ast
    });

  } catch (error) {
    console.error('Error in updateRuleOperator:', error);
    res.status(500).json({
      error: 'Failed to update rule operator',
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

const deleteRule = async (req, res) => {
  try {
    const ruleId = req.params.id;

    if (!ruleId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        error: 'Invalid rule ID format'
      });
    }

    const rule = await Rule.findByIdAndDelete(ruleId);
    if (!rule) {
      return res.status(404).json({
        error: 'Rule not found',
        details: `No rule found with ID: ${ruleId}`
      });
    }

    res.json({
      message: 'Rule successfully deleted',
      id: rule._id
    });

  } catch (error) {
    console.error('Error in deleteRule:', error);
    res.status(500).json({
      error: 'Failed to delete rule',
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
  updateRule,
  updateRuleOperator,
  getRuleById,
  deleteRule,
  combineRulesController,
  evaluateRuleController
};
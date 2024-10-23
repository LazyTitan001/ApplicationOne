// src/utils/ruleUtils.js

function validateTokens(tokens) {
    if (!tokens || tokens.length === 0) {
      throw new Error('Empty or invalid rule string');
    }
  
    for (let i = 0; i < tokens.length; i++) {
      if (['AND', 'OR'].includes(tokens[i])) {
        if (i === 0 || i === tokens.length - 1) {
          throw new Error(`Invalid operator position for '${tokens[i]}'`);
        }
      }
      if (['>', '<', '=', '>=', '<='].includes(tokens[i])) {
        if (i === 0 || i === tokens.length - 1) {
          throw new Error(`Invalid comparison operator position for '${tokens[i]}'`);
        }
      }
    }
  }
  
  function validateValue(value, operator) {
    const cleanValue = value.replace(/'/g, '');
    
    if (['>', '<', '>=', '<='].includes(operator)) {
      if (isNaN(cleanValue)) {
        throw new Error(`Invalid numeric value '${value}' for operator '${operator}'`);
      }
      return Number(cleanValue);
    }
    
    return cleanValue;
  }
  
  function parseRule(ruleString) {
    if (typeof ruleString !== 'string') {
      throw new Error('Rule string must be a string');
    }
  
    const tokens = ruleString.match(/([\(\)])|(\bAND\b|\bOR\b)|([<>=]+)|([a-zA-Z_]\w*)|('(?:[^'\\]|\\.)*'|\d+)/g) || [];
    
    validateTokens(tokens);
    
    let index = 0;
  
    function parseExpression() {
      if (index >= tokens.length) {
        throw new Error('Unexpected end of rule string');
      }
  
      let node = parseTerm();
      
      while (index < tokens.length && (tokens[index] === 'AND' || tokens[index] === 'OR')) {
        const operator = tokens[index++];
        if (index >= tokens.length) {
          throw new Error(`Missing right operand for ${operator}`);
        }
        const right = parseTerm();
        node = {
          type: 'operator',
          operator,
          left: node,
          right
        };
      }
      return node;
    }
  
    function parseTerm() {
      if (tokens[index] === '(') {
        index++;
        const node = parseExpression();
        if (index >= tokens.length || tokens[index] !== ')') {
          throw new Error('Missing closing parenthesis');
        }
        index++;
        return node;
      } else {
        if (index + 2 >= tokens.length) {
          throw new Error('Invalid expression: incomplete comparison');
        }
  
        const field = tokens[index++];
        const operator = tokens[index++];
        const rawValue = tokens[index++];
  
        if (!['>', '<', '=', '>=', '<='].includes(operator)) {
          throw new Error(`Invalid comparison operator: ${operator}`);
        }
  
        const value = validateValue(rawValue, operator);
  
        return {
          type: 'operand',
          field,
          operator,
          value
        };
      }
    }
  
    const ast = parseExpression();
    
    if (index < tokens.length) {
      throw new Error('Unexpected tokens after expression');
    }
  
    return ast;
  }
  
  function combineRules(rules) {
    if (!Array.isArray(rules) || rules.length === 0) {
      throw new Error('Rules must be a non-empty array');
    }
  
    return rules.reduce((combined, rule) => {
      if (!rule || typeof rule !== 'object') {
        throw new Error('Invalid rule object in combination');
      }
      return {
        type: 'operator',
        operator: 'AND',
        left: combined,
        right: rule
      };
    });
  }
  
  function evaluateRule(ast, data) {
    if (!data || typeof data !== 'object') {
      throw new Error('Data must be an object');
    }
  
    if (!ast || typeof ast !== 'object') {
      throw new Error('Invalid AST structure');
    }
  
    if (ast.type === 'operator') {
      if (!ast.left || !ast.right) {
        throw new Error('Operator node missing operands');
      }
  
      const leftResult = evaluateRule(ast.left, data);
      const rightResult = evaluateRule(ast.right, data);
  
      switch (ast.operator) {
        case 'AND':
          return leftResult && rightResult;
        case 'OR':
          return leftResult || rightResult;
        default:
          throw new Error(`Unknown logical operator: ${ast.operator}`);
      }
    } else if (ast.type === 'operand') {
      const fieldValue = data[ast.field];
      if (fieldValue === undefined) {
        throw new Error(`Field '${ast.field}' not found in data`);
      }
  
      const nodeValue = ast.value;
      
      switch (ast.operator) {
        case '>':
          return fieldValue > nodeValue;
        case '<':
          return fieldValue < nodeValue;
        case '=':
          return fieldValue === nodeValue;
        case '>=':
          return fieldValue >= nodeValue;
        case '<=':
          return fieldValue <= nodeValue;
        default:
          throw new Error(`Unknown comparison operator: ${ast.operator}`);
      }
    } else {
      throw new Error(`Invalid node type: ${ast.type}`);
    }
  }
  
  module.exports = {
    parseRule,
    combineRules,
    evaluateRule
  };
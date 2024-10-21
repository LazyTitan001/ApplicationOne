function parseRule(ruleString) {
    const tokens = ruleString.match(/\(|\)|\w+|[<>=]+|\d+|'[^']*'/g) || [];
    let index = 0;
  
    function parseExpression() {
      let node = parseTerm();
      while (index < tokens.length && (tokens[index] === 'AND' || tokens[index] === 'OR')) {
        const operator = tokens[index++];
        const right = parseTerm();
        node = { type: 'operator', operator, left: node, right };
      }
      return node;
    }
  
    function parseTerm() {
      if (tokens[index] === '(') {
        index++;
        const node = parseExpression();
        index++;
        return node;
      } else {
        const field = tokens[index++];
        const operator = tokens[index++];
        const value = tokens[index++];
        return { type: 'operand', field, operator, value: value.replace(/'/g, '') };
      }
    }
  
    return parseExpression();
  }
  
  function combineRules(rules) {
    return rules.reduce((combined, rule) => ({
      type: 'operator',
      operator: 'AND',
      left: combined,
      right: rule
    }));
  }
  
  function evaluateRule(ast, data) {
    if (ast.type === 'operator') {
      const leftResult = evaluateRule(ast.left, data);
      const rightResult = evaluateRule(ast.right, data);
      return ast.operator === 'AND' ? leftResult && rightResult : leftResult || rightResult;
    } else {
      const fieldValue = data[ast.field];
      const nodeValue = ast.value;
      switch (ast.operator) {
        case '>': return fieldValue > nodeValue;
        case '<': return fieldValue < nodeValue;
        case '=': return fieldValue === nodeValue;
        case '>=': return fieldValue >= nodeValue;
        case '<=': return fieldValue <= nodeValue;
        default: throw new Error(`Unknown operator: ${ast.operator}`);
      }
    }
  }
  
  module.exports = { parseRule, combineRules, evaluateRule };
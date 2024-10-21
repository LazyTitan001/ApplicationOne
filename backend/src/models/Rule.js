const mongoose = require('mongoose');

const NodeSchema = new mongoose.Schema({
  type: { type: String, enum: ['operator', 'operand'], required: true },
  left: { type: mongoose.Schema.Types.Mixed },
  right: { type: mongoose.Schema.Types.Mixed },
  value: { type: mongoose.Schema.Types.Mixed },
  operator: { type: String },
  field: { type: String }
});

const RuleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  ruleString: { type: String, required: true },
  ast: { type: NodeSchema, required: true }
});

module.exports = mongoose.model('Rule', RuleSchema);
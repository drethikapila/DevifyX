const Joi = require('joi');

const transferSchema = Joi.object({
  fromAccountId: Joi.number().required(),
  toAccountId: Joi.number().required(),
  amount: Joi.number().positive().required(),
  type: Joi.string().valid('internal', 'external').required(),
  scheduledAt: Joi.alternatives().try(Joi.date(), Joi.valid(null)).optional(),
  recurring: Joi.boolean().optional(),
  fee: Joi.number().min(0).optional() 
});

exports.validateTransfer = (req, res, next) => {
  const { error } = transferSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

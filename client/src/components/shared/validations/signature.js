import Joi from "joi-browser";

const step1Schema = Joi.object({
  attackName: Joi.string().required()
});

const validateStep1 = step1 => {
  const result = step1Schema.validate(step1);
  return result.error ? result.error.details.map(detail => detail.message) : [];
}

export {
  validateStep1
};

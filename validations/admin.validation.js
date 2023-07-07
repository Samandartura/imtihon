const Joi = require("joi");

exports.adminValidation = (data) => {
    const schema = Joi.object({
        full_name: Joi.string().required(),
        user_name: Joi.string().email().required(),
        phone_number: Joi.string().required().min(8),
        tg_link: Joi.string().required().min(8),
        description: Joi.string().required().min(8),
        is_creator: Joi.boolean().default(false),
        is_admin: Joi.boolean().default(false),
    });
    return schema.validate(data, { abortEarly: false });
};



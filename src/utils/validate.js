const Joi = require('joi')

const schema =  Joi.object().keys({
    malaka: Joi.string().required(),
    studyaddress: Joi.string().required(),
    fish: Joi.string().required(),
    number: Joi.number().min(7).required(),
    pass: Joi.string().min(7).required(),
    region: Joi.string().required(),
    district: Joi.string().required(),
    tashkilot: Joi.string().required(),
    info: Joi.string().required(),
    expert: Joi.string().required(),
    level: Joi.string().required(),
    sport: Joi.string().required(),
    shakl: Joi.string().required(),
    turi: Joi.string().required(),
    sportturi: Joi.string().required(),
    til: Joi.string().required(),
    pasport: Joi.required(),
    rasm: Joi.required(),
    diplom: Joi.required(),
    inn: Joi.required(),
    buyruq: Joi.required(),
    unvon: Joi.required()
});

const phoneRegex = /^998[389][012345789][0-9]{7}$/g

  module.exports = {
    schema,
    phoneRegex
  }
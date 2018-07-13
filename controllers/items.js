const { checkSchema, validationResult, oneOf, check, query } = require('express-validator/check');
const { matchedData } = require('express-validator/filter')
const itemsRouter = require('express').Router()
const yleApi = require('../services/yleApi')
const { ItemsQuery } = require('../services/yleQuerys')
const Program = require('../models/program')


const idSchema = checkSchema({
  id: {
    in: ['params'],
    errorMessage: 'ID format is not recognized',
    matches: {
      options: /^[0-9]+-[0-9]+$/,
      //errorMessage: 'asd'
    }
  }
})

itemsRouter.get('/:id', idSchema, async (request, response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(422).json({ errors: errors.array() });
    }

    const item = await yleApi.getItemWithId(request.params.id)
    
    const p = new Program(item[0])
    


    return response.json(p)
  } catch (exception) {
    console.log(exception)
  }
})




const qSchema = oneOf([
  query(ItemsQuery.ID.NAME).matches(/^[0-9]+-[0-9]+$/),
  query(ItemsQuery.TYPE.NAME).isIn(ItemsQuery.TYPE.validationValues()),
  query(ItemsQuery.Q.NAME).exists(),
  query(ItemsQuery.MEDIAOBJECT.NAME).isIn(ItemsQuery.MEDIAOBJECT.validationValues()),
  query(ItemsQuery.CATEGORY.NAME).matches(/^([0-9]+-[0-9]+)(,[0-9]+-[0-9]+)*$/),
  query(ItemsQuery.SERIES.NAME).matches(/^([0-9]+-[0-9]+)(,[0-9]+-[0-9]+)*$/),
  query(ItemsQuery.AVAILABILITY.NAME).isIn(ItemsQuery.AVAILABILITY.validationValues()),
  query(ItemsQuery.ORDER.NAME).isIn(ItemsQuery.ORDER.validationValues()),
  query(ItemsQuery.LIMIT.NAME).isInt(),
  query(ItemsQuery.OFFSET.NAME).isInt()
], 'provide at least one valid query param')



itemsRouter.get('/', qSchema, async (request, response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(422).json({ errors: errors.array() });
    }

    const queryData = matchedData(request, { locations: ['query'] })    
    console.log({queryData})
    const items = await yleApi.getItems(queryData)

    const programs = items.map((i) => new Program(i))
    return response.json(programs)
  } catch (exception) {
    console.log(exception)
  }
})

module.exports = itemsRouter
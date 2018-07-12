const categoriesRouter = require('express').Router()
const yleApi = require('../services/yleApi')

categoriesRouter.get('/', async (request, response) => {
  try {
    const categories = await yleApi.getCategories()
    //console.log(categories)
    //sort(categories)
    console.log('length', categories.length)
    return response.json(categories)
  } catch (exception) {
    console.log(exception)
  }

})

const sort = (categories) => {
  const parents = categories.map((category) => category.broader ? category.broader.id : undefined )
  //const parents = categories.map((category) => category.broader.id)
  const unique = parents.filter((value, index, self) => value && self.indexOf(value) === index)
  const parentCategories = categories.filter((category) => unique.includes(category.id))
  
  console.log(unique)
  
  categories.forEach(element => {
    if (element.broader) {
    let c = parentCategories.find((value) => value.id === element.broader.id)
    if (!c.children) c.children = []
      c.children.push(element.id)

    }
  });
  console.log(parentCategories)
}

module.exports = categoriesRouter
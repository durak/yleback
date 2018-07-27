const categoriesRouter = require('express').Router()
const yleApi = require('../services/yleApi')
const Category = require('../models/category')

categoriesRouter.get('/', async (request, response) => {
  try {
    const categories = await yleApi.getCategories()
    const count = categories.filter((c) => c.id === '5-217')
    //console.log('iidee on5-127 count', count.length)
    //console.log('categories length', categories.length)
    const sorted = sortNodes(categories)
    //console.log('trees', sorted.length)
    //console.log('tv children: ', sorted[0].children.length)
    //console.log('radio 2 children 2 children: ', sorted[1].children[2].children.length)
    //console.log('analyitcs children: ', sorted[2].children.length)

    return response.json(sorted)
  } catch (exception) {
    console.log(exception)
  }

})

/**
 * Recursive search for parent node of category
 * @param {*} node 
 * @param {*} category 
 */
const findParent = (node, category) => {
  if (node.id === category.broader) {
    return node
  } else if (node.children) {    
    let result = null
    for (let i = 0; result === null && i < node.children.length; i++) {
      result = findParent(node.children[i], category)
    }
    return result
  }
  return null
}

/**
 * Sort categories to tree view
 * @param {*} categories 
 */
const sortNodes = (categories) => {

  let trees = []
  categories.forEach((c, currentIndex, self) => {
    
    const category = new Category(c)

    // root categories
    if (!category.broader) {
      category.children = []
      trees.push(category)
    } else {

      let parent = null

      // find parent recursively from previous 
      for (let i = 0; parent === null && i < trees.length; i++) {
        parent = findParent(trees[i], category)
      }

      // parent was not found => must be after current category in the array
      if (parent === null) {
        for (let j = currentIndex; parent === null && j < self.length; j++) {
          if (self[j].id === category.broader) {
            parent = self[j]
            parent = new Category(parent)
          }
        }
      }

      if (!parent.children) {
        parent.children = []
      }
      parent.children.push(category)
    }
  })

  const [tv, radio, ...rest] = trees
  return [tv, radio, { title: 'Analytics', children: rest }]
}

module.exports = categoriesRouter
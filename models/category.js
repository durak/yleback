const Category = function (apidata) {
  this.id = apidata.id
  this.title = apidata.title.fi
  this.inScheme = apidata.inScheme

  if (apidata.broader) {
    this.broader = apidata.broader.id
  }

  if (apidata.children) {
    this.children = apidata.children
  }
}


module.exports = Category
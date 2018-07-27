
const Program = function (apidata) {
  this.id = apidata.id
  this.description = apidata.description.fi ? apidata.description.fi : apidata.description.sv ? apidata.description.sv : 'no description available'
  this.title = apidata.title.fi ? apidata.title.fi : apidata.title.sv ? apidata.title.sv : 'no title available'
  this.type = apidata.type
  this.image = apidata.image
  this.originalTitle = apidata.originalTitle.und

  this.publicationEvent = apidata.publicationEvent
    .filter((e) => e.type === 'OnDemandPublication')
    .map((e) => { return { startTime: e.startTime, endTime: e.endTime, temporalStatus: e.temporalStatus } })
    
  this.categories = apidata.subject
    .filter((c) => c.inScheme === 'areena-content-classification' || c.inScheme === 'areena-analytics-classification')
    .map((c) => { return { id: c.id, title: c.title.fi } })

  if (apidata.partOfSeries) {
    this.episodeNumber = apidata.episodeNumber
    this.partOfSeries = { 
      id: apidata.partOfSeries.id, 
      title: apidata.partOfSeries.title ? apidata.partOfSeries.title.fi : 'no title',
      description: apidata.partOfSeries.description ? apidata.partOfSeries.description.fi : 'no description'
    }
  }

  if (apidata.partOfSeason) {
    this.partOfSeason = {
      id: apidata.partOfSeason.id ? apidata.partOfSeason.id : undefined,
      seasonNumber: apidata.partOfSeason.seasonNumber ? apidata.partOfSeason.seasonNumber : undefined,
      title: apidata.partOfSeason.title ? apidata.partOfSeason.title.fi : undefined
    }
  }  
}


module.exports = Program
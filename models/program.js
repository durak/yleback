
const Program = function (apidata) {
  this.id = apidata.id
  this.description = apidata.description.fi
  this.title = apidata.title.fi
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
    this.partOfSeries = { id: apidata.partOfSeries.id, title: apidata.partOfSeries.title.fi }
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
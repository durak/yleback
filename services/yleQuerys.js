const Type = Object.freeze({
  NAME: 'type',
  VALUES: Object.freeze({
    PROGRAM: "program",
    CLIP: "clip",
    TVCONTENT: "tvcontent",
    TVPROGRAM: "tvprogram",
    TVCLIP: "tvclip",
    RADIOCONTENT: "radiocontent",
    RADIOPROGRAM: "radioprogram",
    RADIOCLIP: "radioclip"
  }),
  validationValues() { return Object.values(this.VALUES) }
})

const Mediaobject = Object.freeze({
  NAME: 'mediaobject',
  VALUES: Object.freeze({
    VIDEO: 'video',
    AUDIO: 'audio'
  }),
  validationValues() { return Object.values(this.VALUES) }
})


const Order = Object.freeze({
  NAME: 'order',
  VALUES: Object.freeze({
    PLAYCOUNT_6H_ASC: "playcount.6h:asc",
    PLAYCOUNT_6H_DESC: "playcount.6h:desc",
    PLAYCOUNT_24H_ASC: "playcount.24h:asc",
    PLAYCOUNT_24H_DESC: "playcount.24h:desc",
    PLAYCOUNT_WEEK_ASC: "playcount.week:asc",
    PLAYCOUNT_WEEK_DESC: "playcount.week:desc",
    PLAYCOUNT_MONTH_ASC: "playcount.month:asc",
    PLAYCOUNT_MONTH_DESC: "playcount.month:desc",
    PUBLICATION_STARTTIME_ASC: "publication.starttime:asc",
    PUBLICATION_STARTTIME_DESC: "publication.starttime:desc",
    PUBLICATION_ENDTIME_ASC: "publication.endtime:asc",
    PUBLICATION_ENDTIME_DESC: "publication.endtime:desc",
    UPDATED_ASC: "updated:asc",
    UPDATED_DESC: "updated:desc"
  }),
  validationValues() { return Object.values(this.VALUES) }
})

const Availability = Object.freeze({
  NAME: 'availability',
  VALUES: Object.freeze({
    ONDEMAND: "ondemand",
    FUTURE_ONDEMAND: "future-ondemand",
    FUTURE_SCHEDULED: "future-scheduled",
    IN_FUTURE: "in-future"
  }),
  validationValues() { return Object.values(this.VALUES) }
})

const ItemsQuery = Object.freeze({
  ID: { NAME: 'id' },
  TYPE: Type,
  Q: { NAME: 'q' },
  MEDIAOBJECT: Mediaobject,
  CATEGORY: { NAME: 'category' },
  SERIES: { NAME: 'series' },
  AVAILABILITY: Availability,
  ORDER: Order,
  LIMIT: { NAME: 'limit' },
  OFFSET: { NAME: 'offset' }
})

module.exports = { Type, Mediaobject, Order, Availability, ItemsQuery }
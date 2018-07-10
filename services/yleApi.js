const Type = Object.freeze({
  PROGRAM: "program",
  CLIP: "clip",
  TVCONTENT: "tvcontent",
  TVPROGRAM: "tvprogram",
  TVCLIP: "tvclip",
  RADIOCONTENT: "radiocontent",
  RADIOPROGRAM: "radioprogram",
  RADIOCLIP: "radioclip"
})

const Order = Object.freeze({
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
})

const Availability = Object.freeze({
  ONDEMAND: "ondemand",
  FUTURE_ONDEMAND: "future-ondemand",
  FUTURE_SCHEDULED: "future-scheduled",
  IN_FUTURE: "in-future"
})
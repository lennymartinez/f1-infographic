var cleanWinners = function (d) {
  return {
    team: d.team,
    year: +d.year,
    driver: d.driver
  }
}

var cleanTeamActivity = function (d) {
  return {
    team: d.team,
    year: +d.year,
    driver: d.driver
  }
}

Promise.all([
  d3.csv('data/winners_annual.csv', cleanWinners),
  d3.csv('data/teams_active_years.csv', cleanTeamActivity)
]).then(function (allData) {
  console.log(allData)
  var w = window.innerWidth
  var h = 900
  var margin = { top: 15, right: 60, bottom: 60, left: 110 }
  var width = w - margin.left - margin.right
  var height = h - margin.top - margin.bottom

  
})

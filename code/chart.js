var cleanWinners = function (d) {
  return {
    team: d.team,
    year: +d.year,
    driver: d.driver
  };
};

var cleanTeamActivity = function (d) {
  return {
    team: d.team,
    year: +d.year,
    driver: d.driver
  };
};

Promise.all([
  d3.csv('data/winners_annual.csv', cleanWinners),
  d3.csv('data/teams_active_years.csv', cleanTeamActivity)
]).then(function (allData) {
  console.log(allData);
});

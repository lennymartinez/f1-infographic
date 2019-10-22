var svg =
  '<path fill="currentColor" d="M552 64H448V24c0-13.3-10.7-24-24-24H152c-13.3 0-24 10.7-24 24v40H24C10.7 64 0 74.7 0 88v56c0 35.7 22.5 72.4 61.9 100.7 31.5 22.7 69.8 37.1 110 41.7C203.3 338.5 240 360 240 360v72h-48c-35.3 0-64 20.7-64 56v12c0 6.6 5.4 12 12 12h296c6.6 0 12-5.4 12-12v-12c0-35.3-28.7-56-64-56h-48v-72s36.7-21.5 68.1-73.6c40.3-4.6 78.6-19 110-41.7 39.3-28.3 61.9-65 61.9-100.7V88c0-13.3-10.7-24-24-24zM99.3 192.8C74.9 175.2 64 155.6 64 144v-16h64.2c1 32.6 5.8 61.2 12.8 86.2-15.1-5.2-29.2-12.4-41.7-21.4zM512 144c0 16.1-17.7 36.1-35.3 48.8-12.5 9-26.7 16.2-41.8 21.4 7-25 11.8-53.6 12.8-86.2H512v16z"></path>';

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
    start: +d.start,
    end: +d.end
  };
};

var color = d3
  .scaleOrdinal()
  .domain([
    'Ferrari',
    'McLaren',
    'Williams',
    'Mercedes',
    'Lotus',
    'Red Bull',
    'Brabham',
    'Renault',
    'Cooper',
    'Benetton',
    'Tyrrell',
    'Alfa Romeo',
    'BRM',
    'Matra',
    'Brawn GP',
    'Maserati'
  ])
  .range([
    '#DC0300',
    '#FB8703',
    '#2086C0',
    '#2ED2BE',
    '#555555',
    '#2041FF',
    '#F4D258',
    '#FDF503',
    '#004225',
    '#00A204',
    '#800080',
    '#9B0502',
    '#8b4513',
    '#f08080',
    '#80f080',
    '#ff682a'
  ]);
var test;
Promise.all([
  d3.csv('data/winners_annual.csv', cleanWinners),
  d3.csv('data/teams_active_years.csv', cleanTeamActivity)
]).then(function (allData) {
  test = allData;
  var winners = allData[0];
  var teams = allData[1];
  var w = 800;
  var h = 400;
  var margin = { top: 15, right: 60, bottom: 60, left: 110 };
  var width = w - margin.left - margin.right;
  var height = h - margin.top - margin.bottom;

  var svg = d3
    .select('body')
    .append('svg')
    .attr('viewBox', `0 0 ${w} ${h}`)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  // define scales
  var x = d3
    .scaleLinear()
    .domain([1950, 2020])
    .range([0, width])
    .clamp(true)
    .nice();

  var y = d3
    .scaleBand()
    .domain(teams.map((d) => d.team))
    .range([0, height])
    .padding(1);

  // create axes
  var x_axis = svg
    .append('g')
    .attr('class', 'x axis')
    .call(
      d3
        .axisBottom(x)
        .tickFormat(d3.format('d'))
        .tickSize(height)
    )
    .selectAll('text')
    .attr('class', 'axis_text')
    .style('text-align', 'middle');

  var y_axis = svg
    .append('g')
    .attr('class', 'y axis')
    .call(d3.axisLeft(y))
    .attr('transform', 'translate(-10, 0)')
    .selectAll('text')
    .attr('class', 'axis_text')
    .style('text-anchor', 'end');

  // draw lines
  var lines = svg
    .selectAll('active_years')
    .data(teams)
    .enter()
    .append('line')
    .attr('x1', (d) => x(d.start))
    .attr('x2', (d) => x(d.end))
    .attr('y1', (d) => y(d.team))
    .attr('y2', (d) => y(d.team))
    .attr('opacity', '0.9')
    .attr('stroke-width', '3')
    .attr('stroke', (d) => color(d.team))
    .attr('class', 'active_years');

  var champions = svg
    .selectAll('winners')
    .data(winners)
    .enter()
    .append('circle')
    .attr('cx', (d) => x(d.year))
    .attr('cy', (d) => y(d.team))
    .attr('r', 4)
    .attr('fill', (d) => color(d.team))
    .attr('stroke-width', '0')
    .attr('stroke', '#333')
    .text((d) => '\uf091');
});

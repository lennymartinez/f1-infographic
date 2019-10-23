var rowConverter = function (d) {
  return {
    team: d.team,
    years_competing: +d.years_competing,
    championships: +d.championships,
    winningest: +d.winningest,
    rank: +d.rank
  };
};
var test;
d3.csv('data/data.csv', rowConverter, function (data) {
  test = data;
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

  // x scale
  var x = d3.scaleLinear()
    .domain([0, 1])
    .range([0, width]);

  // r scale
  var r = d3.scaleLinear()
    .domain([1, 15])
    .range([10, 100]);

  // generate the swarm
  var swarm = d3.beeswarm()
    .data(data)
    .distributeOn(function (d) {
      return x(d.winningest);
    })
    .radius(function (d) {
      return r(d.championships);
    })
    .orientation('horizontal')
    .side('symmetric')
    .arrange();

  // draw the swarm
  svg.selectAll('circle')
    .data(swarm)
    .enter()
    .append('circle')
    .attr('cx', function (bee) {
      return bee.x;
    })
    .attr('cy', function (bee) {
      // return bee.y;
      return h / 2;
    })
    .attr('r', function (bee) {
      // return r(bee.datum.championships);
      return 4;
    })
    .style('fill', 'rgba(0,0,0,0.2)');
});

var rowConverter = function (d) {
  return {
    team: d.team,
    championships: +d.championships,
    winning: +d.winningest,
    log_win: +d.log_win
  };
};
var f;

var test_swarm, test_nodes;
d3.csv('data/data_expanded.csv', rowConverter, function (data) {
  // test = data;
  var w = 900;
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
  var x = d3
    .scaleLinear()
    .domain([0, 1])
    .range([0, width]);

  var logX = d3
    .scaleLinear()
    .domain([-1.35, 0])
    .range([0, width]);

  var xlog = d3
    .scaleLog()
    .domain([0.01, 1])
    .range([0, width]);

  // r scale
  var r = d3
    .scaleLinear()
    .domain([1, 15])
    .range([10, 100]);

  var x_axis = d3.axisBottom().scale(xlog);

  svg
    .append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(x_axis);

  // generate the swarm
  var swarm = d3
    .beeswarm()
    .data(data)
    .distributeOn(function (d) {
      return xlog(d.winning);
    })
    .radius(20)
    .orientation('horizontal')
    .side('symmetric')
    .arrange();

  test_swarm = swarm;

  // do a simulation
  // const simulation = d3.forceSimulation(swarm);
  // simulation.force(
  //   'collide',
  //   d3.forceCollide((d) => r(d.datum.championships)).iterations(20)
  // );
  // simulation.force('x', d3.forceX((d) => d.x));
  // simulation.force('y', d3.forceY((d) => d.y)
  // );
  // simulation.stop();
  // simulation.tick(100);
  // const nodes = simulation.nodes();

  // test_nodes = nodes;

  // draw the nodes
  // svg
  //   .selectAll('circles')
  //   .data(swarm)
  //   .enter()
  //   .append('circle')
  //   .attr('cx', function (d) {
  //     return d.x;
  //   })
  //   .attr('cy', function (d) {
  //     return h / 2;
  //   })
  //   .attr('r', function (d) {
  //     return r(d.datum.championships);
  //   })
  //   .attr('class', function (d) {
  //     return d.datum.team;
  //   })
  //   .style('fill', (d) => color(d.datum.team));

  svg
    .selectAll('circles')
    .data(swarm)
    .enter()
    .append('circle')
    .attr('cx', function (d) {
      return d.x;
    })
    .attr('cy', function (d) {
      return h / 2;
    })
    .attr('r', 15)
    .attr('class', function (d) {
      return d.datum.team;
    })
    .style('fill', '#515151');
});

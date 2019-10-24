var rowConverter = function (d) {
  return {
    team: d.team,
    championships: +d.championships,
    winning: +d.winningest,
    rank: +d.rank
  };
};

function getRandomInt (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
}
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

var test, dog;
d3.csv('data/data.csv', rowConverter, function (data) {
  // test = data;
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
    .domain([1, 16])
    .range([0, width]);

  var logX = d3.scaleLog()
    .domain([0.1, 1])
    .range([0, width]);

  // r scale
  var r = d3.scaleLinear()
    .domain([1, 15])
    .range([10, 100]);

  // generate the swarm
  var swarm = d3.beeswarm()
    .data(data)
    .distributeOn(function (d) {
      return x(d.rank);
    })
    .radius(function (d) {
      return d.datum.championships;
    })
    .orientation('horizontal')
    .side('symmetric')
    .arrange();

  // do a simulation
  const simulation = d3.forceSimulation(swarm);
  simulation.force('collide', d3.forceCollide((d) => d.datum.championships).iterations(20));
  simulation.force('x', d3.forceX((d) => d.x));
  simulation.force('y', d3.forceY((d) => d.y)
  );
  simulation.stop();
  simulation.tick(100);
  const nodes = simulation.nodes();

  test = nodes;
  dog = swarm;

  // draw the nodes
  svg
    .selectAll('circles')
    .data(nodes)
    .enter()
    .append('circle')
    .attr('cx', function (d) {
      return d.x;
    })
    .attr('cy', function (d) {
      return h / 2;
    })
    .attr('r', function (d) {
      return d.datum.championships;
    })
    .style('fill', (d) => color(d.datum.team));
  // .style('fill', 'rgba(0,0,0,0.2)');
  // draw the swarm
  // svg.selectAll('circle')
  //   .data(swarm)
  //   .enter()
  //   .append('circle')
  //   .attr('cx', function (bee) {
  //     return bee.x;
  //   })
  //   .attr('cy', function (bee) {
  //     // return bee.y;
  //     return h / 2;
  //   })
  //   .attr('r', function (bee) {
  //     return r(bee.datum.championships);
  //     // return 4;
  //   })
  //   .style('fill', 'rgba(0,0,0,0.2)');
});

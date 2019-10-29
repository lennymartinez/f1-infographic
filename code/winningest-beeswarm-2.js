var rowConverter = (d) => {
  return {
    team: d.team,
    years: d.years_competing,
    championships: +d.championships,
    winning: +d.winningest
  };
};

var swarmTest;

var color = d3
  .scaleOrdinal()
  .domain([
    'Ferrari',
    'McLaren',
    'Williams',
    'Mercedes',
    'Lotus',
    'RedBull',
    'Brabham',
    'Renault',
    'Cooper',
    'Benetton',
    'Tyrrell',
    'AlfaRomeo',
    'BRM',
    'Matra',
    'Brawn',
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

d3.csv('data/data_expanded.csv', rowConverter, (data) => {
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

  var xlog = d3
    .scaleLog()
    .domain([0.01, 1])
    .range([0, width]);

  // r scale
  var r = d3
    .scaleLinear()
    .domain([1, 15])
    .range([10, 100]);

  var opacityScale = d3
    .scaleLinear()
    .domain([1, 70])
    .range([0.3, 1]);

  var xAxis = d3.axisBottom().scale(xlog);

  svg
    .append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis);

  // generate the swarm
  var swarm = d3
    .beeswarm()
    .data(data)
    .distributeOn((d) => {
      return xlog(d.winning);
    })
    .radius(20)
    .orientation('horizontal')
    .side('symmetric')
    .arrange();

  swarmTest = swarm;

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
  //   .attr('cx', (d) =>  {
  //     return d.x;
  //   })
  //   .attr('cy', (d) =>  {
  //     return h / 2;
  //   })
  //   .attr('r', (d) =>  {
  //     return r(d.datum.championships);
  //   })
  //   .attr('class', (d) =>  {
  //     return d.datum.team;
  //   })
  //   .style('fill', (d) => color(d.datum.team));

  svg
    .selectAll('circles')
    .data(swarm)
    .enter()
    .append('circle')
    .attr('cx', (d) => {
      return d.x;
    })
    .attr('cy', (d) => {
      return h / 2;
    })
    .attr('r', 15)
    .attr('class', (d) => {
      return d.datum.team;
    })
    .style('opacity', (d) => {
      return opacityScale(d.datum.years);
    })
    .style('fill', (d) => {
      return color(d.datum.team);
    });
});

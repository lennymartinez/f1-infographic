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
		start: +d.start,
		end: +d.end
  }
}

var color = d3.scaleOrdinal()
              .domain(["Ferrari", "McLaren", "Williams", "Mercedes",
                      "Lotus", "Red Bull", "Brabham", "Renault",
                      "Cooper", "Benetton", "Tyrrell", "Alfa Romeo",
                      "BRM", "Matra", "Brawn GP", "Maserati"])
              .range(["#DC0300", "#FB8703", "#2086C0", "#2ED2BE",
                      "#555555", "#2041FF", "#F4D258", "#FDF503",
                      "#004225","#00A204", "#800080", "#9B0502",
                      "#8b4513", "#f08080", "#80f080", "#ff682a"]);
var test;
Promise.all([
  d3.csv('data/winners_annual.csv', cleanWinners),
  d3.csv('data/teams_active_years.csv', cleanTeamActivity)
]).then(function (allData) {
  
  test = allData;
  var winners = allData[0];
  var teams = allData[1];
  var w = window.innerWidth;
  var h = 900;
  var margin = { top: 15, right: 60, bottom: 60, left: 110 };
  var width = w - margin.left - margin.right;
  var height = h - margin.top - margin.bottom;

  var svg = d3.select("body")
              .append("svg")
              .attr("viewBox", `0 0 ${w} ${h}`)
              .append('g')
              .attr('transform', `translate(${margin.left},${margin.top})`);

  // define scales
  var x = d3.scaleLinear()
            .domain([1950, 2020])
            .range([0, width])
            .clamp(true)
            .nice();
            
  var y = d3.scaleBand()
            .domain(teams.map( (d) => d.team))
            .range([0, height])
            .padding(1);
  
  // create axes
  var x_axis = svg.append("g")
                  .attr("class", "x axis")
                  .call(d3.axisBottom(x).tickFormat(d3.format("d")).tickSize(height))
                  .selectAll("text")
                  .attr("class", "axis_text")
                  .style("text-align", "middle");

  var y_axis = svg.append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(y))
      .attr("transform", `translate(-10, 0)`)
      .selectAll("text")
      .attr("class", "axis_text")
      .style("text-anchor", "end");

  // draw lines
  var lines = svg.selectAll("active_years")
                  .data(teams)
                  .enter()
                  .append("line")
                  .attr("x1", (d) => x(d.start))
                  .attr("x2", (d) => x(d.end))
                  .attr("y1", (d) => y(d.team))
                  .attr("y2", (d) => y(d.team))
                  .attr("opacity", "0.6")
                  .attr("stroke-width", "10")
                  .attr("stroke", (d) => color(d.team))
                  .attr("class", "active_years");
          
  var champions = svg.selectAll("winners")
                      .data(winners)
                      .enter()
                      .append("text")
                      .attr("class", "trophy")
                      .attr("x", d => x(d.year+0.5))
                      .attr("y", d => y(d.team))
                      .attr("text-anchor", "middle")
                      .attr("dominant-baseline", "middle")
                      .attr('font-family', 'FontAwesome')
                      .attr('font-size', "19px")
                      .attr("fill", d=> color(d.team))
                      .attr("stroke-width", "0.5")
                      .attr("stroke", "#000000")
                      .text(d => "\uf091");
  
})

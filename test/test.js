function getData(callback) {
  $.ajax({
    url: 'https://coronavirus-tracker-api.herokuapp.com/v2/locations',
    type: 'GET'
  }).then(res => {
    callback(res);
  });
}

function buildConfirmedCasesTable(obj) {
  var dataset = [];
  obj.locations.sort((a, b) => b.latest.confirmed - a.latest.confirmed);

  for (let i = 0; i < 15; i++) {
    dataset.push({
      id: i + 1,
      country: obj.locations[i].country,
      confirmedCases: obj.locations[i].latest.confirmed
    });
  }
  console.log(dataset);

  var svg = d3.select('svg'),
    margin = 200,
    width = svg.attr('width') - margin,
    height = svg.attr('height') - margin;

  var xScale = d3.scaleBand().range([0, width]).padding(0.2),
    yScale = d3.scaleLinear().range([height, 0]);

  var g = svg.append('g')
    .attr('transform', 'translate(' + 100 + ',' + 100 + ')');

  xScale.domain(dataset.map(function(d) {return d.country;}));
  yScale.domain([0, d3.max(dataset, function (d) {return d.confirmedCases;})]);

  g.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale))
    .selectAll('text')
    .style('text-anchor', 'end')
    .attr('dx', '-.8em')
    .attr('dy', '.15em')
    .attr('transform', 'rotate(-65)')
    .attr('font-size', '1.4em');

  g.append('g')
    .call(d3.axisLeft(yScale));

  g.selectAll('bar')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', d => xScale(d.country))
    .attr('y', d => yScale(d.confirmedCases))
    .attr('width', xScale.bandwidth())
    .attr('height', d => height - yScale(d.confirmedCases))
    .attr('fill', 'red')
    .append('title')
    .text(d => d.confirmedCases);

  svg.append('text')
    .attr('x', 200)
    .attr('y', 80)
    .text('Most Confirmed Cases by Country')
    .attr('font-weight', 'bold');
}
getData(buildConfirmedCasesTable);
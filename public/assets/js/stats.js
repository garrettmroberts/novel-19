// This file fills out the covid-19 stats modal.
$(document).ready(function() {

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
    console.log(obj.locations);
    obj.locations.sort((a, b) => b.latest.confirmed - a.latest.confirmed);

    for (let i = 0; i < 15; i++) {
      dataset.push({ country: obj.locations[i].country,
        confirmedCases: obj.locations[i].latest.confirmed});
    }

    console.log(dataset);
    const height = 400;
    const width = 500;
    const svg = d3.select('#statsGraph')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    svg.selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('x', i => i * 30)
      .attr('y', d => h - 3 * d)
      .attr('width', 25)
      .attr('height', d => d)
      .attr('fill', 'navy');
  }

  $('#statsButton').on('click', () => {
    getData(buildConfirmedCasesTable);
  });
});

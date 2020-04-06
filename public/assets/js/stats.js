// This file fills out the covid-19 stats modal.
$(document).ready(function () {

  function getData(url, callback) {
    $.ajax({
      url: url,
      type: 'GET'
    }).then(res => {
      callback(res);
    });
  }

  function buildTodaysCasesTable(obj) {
    var data = obj.locations[0].timelines.confirmed.timeline;

    let dataset = [];
    var dates = Object.keys(data);
    var cases = Object.values(data);

    for (var i = dates.length - 1; i > dates.length - 16; i--) {
      var newObj = {
        date: dates[i].split('').splice(0, 10).join(''),
        case: cases[i]
      };

      dataset.push(newObj);
    }

    dataset.reverse();

    var svg = d3.select('#nearMe'),
      margin = 200,
      width = svg.attr('width') - margin,
      height = svg.attr('height') - margin;

    var xScale = d3.scaleBand().range([0, width]).padding(0.2),
      yScale = d3.scaleLinear().range([height, 0]);

    var g = svg.append('g')
      .attr('transform', 'translate(' + 100 + ',' + 100 + ')');

    xScale.domain(dataset.map(function (d) { return d.date; }));
    yScale.domain([0, d3.max(dataset, function (d) { return d.case; })]);

    g.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-50)')
      .attr('font-size', '1.4em');

    g.append('g')
      .call(d3.axisLeft(yScale));

    g.selectAll('bar')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d.date))
      .attr('y', d => yScale(d.case))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - yScale(d.case))
      .attr('fill', 'red')
      .append('title')
      .text(d => d.case);

    svg.append('text')
      .attr('x', 200)
      .attr('y', 80)
      .text(`Confirmed Cases by Day in ${obj.locations[0].country}`)
      .attr('font-weight', 'bold');
  }

  function getUserCountryCode() {
    navigator.geolocation.getCurrentPosition(res => {
      var lat = res.coords.latitude.toFixed(2);
      var long = res.coords.longitude.toFixed(2);

      $.ajax({
        url: `http://api.geonames.org/countryCodeJSON?formatted=true&lat=${lat}&lng=${long}&username=garrettmroberts&style=full`,
        type: 'GET'
      }).then(res => {
        var countryCode = res.countryCode;
        getData(`https://coronavirus-tracker-api.herokuapp.com/v2/locations?country_code=${countryCode}&timelines=1`, buildTodaysCasesTable);
      });
    });
  }

  function buildConfirmedCasesTable(obj) {
    var dataset = [];
    obj.locations.sort((a, b) => b.latest.confirmed - a.latest.confirmed);

    // Select 15 most affected countries
    for (let i = 0; i < 15; i++) {
      dataset.push({
        id: i + 1,
        country: obj.locations[i].country,
        confirmedCases: obj.locations[i].latest.confirmed
      });
    }

    var svg = d3.select('#mostCases'),
      margin = 200,
      width = svg.attr('width') - margin,
      height = svg.attr('height') - margin;

    var xScale = d3.scaleBand().range([0, width]).padding(0.2),
      yScale = d3.scaleLinear().range([height, 0]);

    var g = svg.append('g')
      .attr('transform', 'translate(' + 100 + ',' + 100 + ')');

    xScale.domain(dataset.map(function (d) { return d.country; }));
    yScale.domain([0, d3.max(dataset, function (d) { return d.confirmedCases; })]);

    g.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-50)')
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

  // Builds table showing most cases by country
  getData('https://coronavirus-tracker-api.herokuapp.com/v2/locations', buildConfirmedCasesTable);

  // Builds Table about user's location
  getUserCountryCode();

});

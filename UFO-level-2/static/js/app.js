const tableData = data;
// Helper functions
function checkDontCare(value){
  if(value === 'Dont Care')
  {
    return undefined;
  }
  else
  {
    return value;
  }

}

function buildAquery(query){
  let query1 = {}
  if(query.datetime == null)
  {}else{ query1.datetime = query.datetime  }
  if(query.city == null)
  {}else{
    query1.city = query.city
  }
  if(query.country  == null)
  {}else{
    query1.country = query.country
  }
  if(query.shape  == null)
  {}else{
    query1.shape = query.shape
  }
  if(query.state  == null)
  {}else{
    query1.state = query.state
  }
  return query1;
}

// Date field as input field
const inputField = d3.select("#datetime");
desired_date = inputField.value;
console.log(desired_date)
inputField.on("change", function() {
  desired_date =  d3.event.target.value;
  filtered_data = data.filter(function(e) {
    return e.datetime === d3.event.target.value;
  });
});

// Adding dropdown for cities
let distinctCities = [... new Set(data.map(x=>x.city))];
var selectCity = d3.select("#selectAcity").on('change', onchange); 
distinctCities.unshift('Dont Care');
var options = selectCity
  .selectAll('option')
	.data(distinctCities).enter()
	.append('option')
  .text(function (d) { return d; });
  
  // Initialize the city
  (function() {
    desired_city = document.getElementById('selectAcity').value = 'benton';
  })();
  function onchange() {
    desired_city = checkDontCare(d3.select('#selectAcity').property('value'))
  };


  // Adding dropdown for States
const distinctStates = [... new Set(data.map(x=>x.state))];
var selectState = d3.select("#selectAstate").on('change', onchangestate); 
distinctStates.unshift('Dont Care');
var options = selectState
  .selectAll('option')
	.data(distinctStates).enter()
	.append('option')
  .text(function (d) { return d; });
  // Initialize the city
  (function() {
    desired_state = document.getElementById('selectAstate').value = 'ar';
  })();
 
  function onchangestate() {
    desired_state = checkDontCare(d3.select('#selectAstate').property('value'))
  };

  // Adding dropdown for Countries
const distinctCountries = [... new Set(data.map(x=>x.country))];
var selectCountry = d3.select("#selectAcountry").on('change', onchangeCountry); 
distinctCountries.unshift('Dont Care');
var options = selectCountry
  .selectAll('option')
	.data(distinctCountries).enter()
	.append('option')
  .text(function (d) { return d; });

  // Initialize the country
  (function() {
    desired_country = document.getElementById('selectAcountry').value = 'us';
  })();

  //On event action
  function onchangeCountry() {  
      desired_country = checkDontCare(d3.select('#selectAcountry').property('value'))
  };
   // Adding dropdown for shape
   const distinctShape = [... new Set(data.map(x=>x.shape))];
   var selectShape = d3.select("#selectAshape").on('change', onchangeShape); 
   distinctShape.unshift('Dont Care');
   var options = selectShape
     .selectAll('option')
     .data(distinctShape).enter()
     .append('option')
     .text(function (d) { return d; });
  
     // Initialize the shape
  (function() {
    desired_shape = document.getElementById('selectAshape').value = 'circle';
  })();
     function onchangeShape() {
       desired_shape = checkDontCare(d3.select('#selectAshape').property('value'))
     };


//Handle the button click event     
const button = d3.select("#filter-btn");

button.on("click", function() {
  const tbody = d3.select("tbody");
  tbody.selectAll("tr").remove();
  var query = {
    datetime: desired_date,  
    city: desired_city,
    state: desired_state,
    country: desired_country,
    shape: desired_shape
  }
  console.log(query)
  query1=buildAquery(query)
  console.log(query1)
  filtered_data = data.filter(search, query1);

  function search(data){
    return Object.keys(this).every((key) => data[key] === this[key])
  }
  
  filtered_data.forEach(e => {
    let row = tbody.append("tr");
    row.append("td").text(e.datetime);
    row.append("td").text(e.city);
    row.append("td").text(e.state);
    row.append("td").text(e.country);
    row.append("td").text(e.shape);
    row.append("td").text(e.durationMinutes);
    row.append("td").text(e.comments);
  });
});






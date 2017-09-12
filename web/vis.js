"use strict";

/* Boilerplate jQuery */
$(function() {
  $.get("res/Colleges.csv")
   .done(function (csvData) {
     var data = d3.csvParse(csvData);
     visualize(data);
   })
  .fail(function(e) {
     alert("Failed to load CSV file!");
  });
  $.get("res/UIUC_Demographic.csv")
   .done(function (csvData) {
     var data2 = d3.csvParse(csvData);
     visualize2(data2);
   })
  .fail(function(e) {
     alert("Failed to load CSV file!");
  });
});

var nextht;
/* Visualize the data in the visualize function */
var visualize = function(data) {
  console.log(data);

  // == BOILERPLATE ==
  var margin = { top: 50, right: 50, bottom: 50, left: 50 },
     width = 1200 - margin.left - margin.right,
     height = (data.length * 13);

  nextht = height/3 - 100;
  var svg = d3.select("#chart")
              .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .style("width", width + margin.left + margin.right)
              .style("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                var college_colors = {
                  "KP ": "8DB600",
                  "KL ": "E25822",
                  "KN ": "F3C300",
                  "KM ": "875692",
                  "KR ": "F38400",
                  "KS ": "A1CAF1",
                  "KT ": "BE0032",
                  "KU ": "C2B280",
                  "KV ": "654522",
                  "KW ": "008856",
                  "KY ": "E68FAC",
                  "LC ": "0067A5",
                  "LE ": "F99379",
                  "LG ": "604E97",
                  "LL ": "F6A600",
                  "LN ": "B3446C",
                  "LP ": "DCD300",
                  "NB ": "882D17",
                  "05": "black",
                  "10": "grey",
                  "15": "blue",
                };
                var college_names = {
                  "KP ": "Engineering",
                  "KL ": "Agr, Cons, Env Sci",
                  "KN ": "Education",
                  "KM ": "Business",
                  "KR ": "Fine & Applied Arts",
                  "KS ": "Graduate College",
                  "KT ": "Media",
                  "KU ": "Law",
                  "KV ": "Liberal Arts & Sci",
                  "KW ": "General Studies",
                  "KY ": "Applied Health Sci",
                  "LC ": "Veterinary Medicine",
                  "LE ": "Insitute of Aviation",
                  "LG ": "Labor & Empl. Rel.",
                  "LL ": "School of Social Work",
                  "LN ": "Center Innov in Teach Learn",
                  "LP ": "Library & Info Sci",
                  "NB ": "Provost & VC Acad Affairs",
                  "05" : "Stroke for 2005",
                  "10" : "Stroke for 2010",
                  "15" : "Stroke for 2015",
                };

                var colleges = [    "KP ",
                    "KL ",
                    "KN ",
                    "KM ",
                    "KR ",
                    "KS ",
                    "KT ",
                    "KU ",
                    "KV ",
                    "KW ",
                    "KY ",
                    "LC ",
                    "LE ",
                    "LG ",
                    "LL ",
                    "LN ",
                    "LP ",
                    "NB ",
                    "05",
                    "10",
                    "15"];
                var genderScale = d3.scaleLinear()
                                      .domain([0,100])
                                      .range([0,height]);

                var diversityScale = d3.scaleLinear()
                                       .domain([0,100])
                                       .range([0,width]);

                var xAxis = d3.axisTop().scale(diversityScale);
                var yAxis = d3.axisLeft().scale(genderScale);

                var tip = d3.tip()
                .attr('class','d3-tip')
                .html(function(d) {
                      var nonint = parseInt(d["Hispanic"]) + parseInt(d["Caucasian"]) + parseInt(d["African American"]) + parseInt(d["Asian American"]) + parseInt(d["Native American"]);
                      nonint = parseInt(d["Total"]) - nonint;
                      var result = "<tr><td>College:&emsp;</td><td>          " + college_names[d["College"]] + "</td><br/>" +
                      "<td>Year:&emsp;</td><td>          " + d["Term/Year Code"] + "</td><br/>" +
                      "<td>Total:&emsp;</td><td>          " + d["Total"] + "</td><br/>" +
                      "<td>Caucasian:&emsp;</td><td>          " + parseFloat(d["Caucasian"] / d["Total"] * 100).toFixed(2) + "%</td><br/>" +
                      "<td>Asian American:&emsp;</td><td>          " +  parseFloat(d["Asian American"] / d["Total"] * 100).toFixed(2) + "%</td><br/>" +
                      "<td>African American:&emsp;</td><td>          " + parseFloat(d["African American"] / d["Total"] * 100).toFixed(2) + "%</td><br/>" +
                      "<td>Hispanic:&emsp;</td><td>          " +  parseFloat(d["Hispanic"] / d["Total"] * 100).toFixed(2)+ "%</td><br/>" +
                      "<td>Native American:&emsp;</td><td>          " +  parseFloat(d["Native American"] / d["Total"] * 100).toFixed(2)+ "%</td><br/>" +
                      "<td>International:&emsp;</td><td>          " +  parseFloat(nonint / d["Total"] * 100).toFixed(2)+ "%</td><br/>" +
                      "<td>Unknown:&emsp;</td><td>          " +  parseFloat(d["Unknown"] / d["Total"] * 100).toFixed(2)+ "%</td><br/>" +
                      "</tr>";
                      //var result = "College: " + d["College"] +"; Year: "+d["Term/Year Code"]+"; Total: " +parseInt(d["Total"])+ "; percentCaucasian: "+parseInt(d["percentCaucasian"]) + "%; #African Amercan: "+parseInt(d["African American"]);
                      return result;
                      });

                svg.append("text")
                .attr("y", margin.top - 200)
                .attr("x", width/2)
                .attr("dy", "1em")
                .style("text-anchor", "middle")
                .text("Diversity (gender and race) UIUC, 2005-2015");

                svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", margin.left - 100)
                .attr("x",0 - (height / 2))
                .attr("dy", "1em")
                .style("text-anchor", "middle")
                .text("% Male");

                svg.append("text")
                .attr("y", margin.top - 100)
                .attr("x", width/2)
                .attr("dy", "1em")
                .style("text-anchor", "middle")
                .text("% Caucasian");

                svg.append("g").call(yAxis);
                svg.append("g").call(xAxis);
                svg.call(tip);

                  var legend = svg.append("g")
                  	  .attr("class", "legend")
                      .attr("transform", "translate(" + (margin.right - 100) + "," + (margin.top - 30) + ")")
                  	  .attr("height", 100)
                  	  .attr("width", 100);

                  	legend.selectAll('g').data(colleges)
                        .enter()
                        .append('g')
                        .each(function(d, i) {
                          var g = d3.select(this);
                          if (d == "05" || d == "10" || d == "15") {
                            g.append("rect")
                              .attr("x", width - 65)
                              .attr("y", i*25)
                              .attr("width", 10)
                              .attr("height", 10)
                              .style("fill", "transparent")
                              .attr("stroke-width", 2)
                              .attr("stroke", function (d) {
                                var color = college_colors[d];
                                return color
                              });
                          }
                          else {
                            g.append("rect")
                              .attr("x", width - 65)
                              .attr("y", i*25)
                              .attr("width", 10)
                              .attr("height", 10)
                              .style("fill", function (d) {
                                var color = college_colors[d];
                                return color;
                              });
                          }

                          g.append("text")
                            .attr("x", width - 50)
                            .attr("y", i * 25 + 8)
                            .attr("height",30)
                            .attr("width",100)
                            .style("fill", "black")
                            .text(college_names[d]);

                        });
      d3.select("#check05").property("checked", true);
      update();
			d3.select("#check05").on("change",update);
      d3.select("#check10").on("change",update);
      d3.select("#check15").on("change",update);
      d3.select("#small").on("change",update);

  // == Your code! :) ==
  function update() {
    var newData = null;
    svg.selectAll("circle").remove();
    if(d3.select("#check05").property("checked")
        && d3.select("#check10").property("checked")
        && d3.select("#check15").property("checked")){
          newData = data;
        }
        else if (d3.select("#check05").property("checked") && d3.select("#check10").property("checked")) {
  newData = data.filter(function(d,i){if (d["Term/Year Code"] == "2005" || d["Term/Year Code"] == "2010") {return d;}});
}
else if (d3.select("#check05").property("checked") && d3.select("#check15").property("checked")) {
newData = data.filter(function(d,i){if (d["Term/Year Code"] == "2005" || d["Term/Year Code"] == "2015") {return d;}});
}
else if (d3.select("#check10").property("checked") && d3.select("#check15").property("checked")) {
newData = data.filter(function(d,i){if (d["Term/Year Code"] == "2010" || d["Term/Year Code"] == "2015") {return d;}});
}
else if (d3.select("#check05").property("checked")) {
newData = data.filter(function(d,i){if (d["Term/Year Code"] == "2005") {return d;}});
}
else if(d3.select("#check10").property("checked")){
  newData = data.filter(function(d,i){if (d["Term/Year Code"] == "2010") {return d;}});
}
else if(d3.select("#check15").property("checked")){
  newData = data.filter(function(d,i){if (d["Term/Year Code"] == "2015") {return d;}});
}
else {
  return;
}


  var circs = svg.selectAll("circles")
  .data(newData)
  .enter()
  .append("circle")
  .attr("r", function (d) {
    if (d3.select("#small").property("checked")) {
      return 5;
    }
    else if (d["Total"] >= 11000) {
      var factor = parseFloat(d["Total"] / 11000);
      return 45 * factor;
    }
    else if (d["Total"] >= 7000) {
      var factor = parseFloat(d["Total"] / 7000);
      return 35 * factor;
    }
    else if (d["Total"] >= 4000) {
      var factor = parseFloat(d["Total"] / 4000);
      return 25 * factor;
    }
    else if (d["Total"] >= 2000) {
      var factor = parseFloat(d["Total"] / 2000);
      return 15 * factor;
    }
    else if (d["Total"] >= 1000) {
      var factor = parseFloat(d["Total"] / 1000);
      return 10 * factor;
    }
    else {
      return 5;
    }
  })
  .attr("cx", function (d) {
    return diversityScale(d["percentCaucasian"]);
  })
  .attr("cy", function (d) {
    return genderScale(parseFloat(d["Men"]/d["Total"] * 100));
  })
  .style("fill", function (d) {
    var tofind = d["College"];
    var str = tofind.toString();
    console.log();
    return college_colors[str];
  })
  .style("opacity", 0.65)
  .attr("stroke-width", 3)
  .attr("stroke", function (d) {
    var color;
    if (d["Term/Year Code"] == "2005") {
      return "black";
    }
    else if (d["Term/Year Code"] == "2010") {
      return "grey";
    }
    else {
      return "blue";
    }
  })
  .on("mouseover", function(d) {
    d3.selectAll("circle").style("opacity", 0.2);
    d3.select(this).style("opacity", 1);
    tip.show(d);
  })
  .on("mouseout", function(d) {
    d3.selectAll("circle").style("opacity", 0.65);
    tip.hide(d);
  })
  .exit;

      }
};

//VISUALIZATION 2
var visualize2 = function(data2) {
  console.log(data2);



  // == BOILERPLATE ==
  var margin = { top: nextht, right: 50, bottom: 50, left: 50 },
     width = 1200 - margin.left - margin.right,
     height = (data2.length * 120);

  var svg = d3.select("#chart")
              .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .style("width", width + margin.left + margin.right)
              .style("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

              // == Your code! :) ==
              svg.append("text")
              .attr("y", margin.top)
              .attr("x", margin.right - 25)
              .style("font-size", "40px")
              .text("Pie Chart All The Things");

              svg.append("text")
              .attr("y", margin.top + 100)
              .attr("x", margin.right - 25)
              .style("font-size", "15px")
              .text("Race demographics\n for all of UIUC, 2015");

  var tip = d3.tip()
          .attr('class', 'd3-tip')
          .html(function(d) {
            return d["data"]["Demographic"];
          });

  svg.call(tip);

  var arc = d3.arc()
    .outerRadius(300)
    .innerRadius(200);

  var pie = d3.pie()
    .value(function(d){
      return d["Population"];
    });

    var g = svg.append("g")
     .attr("transform", "translate(" + (width/2) + "," + (height/2) + ")");

   g.selectAll(".arc")
    .data(pie(data2))
    .enter()
    .append("g")
    .attr("class", "arc")
    .append("path")
    .attr("d", arc)
    .style("stroke", "white")
    .style("fill", function(d) {
       switch (d["data"]["Demographic"]) {
        case " ": return "hsla(82,56%,97%,1)";
        case "Caucasian": return "hsla(261,100%,22%,1)";
        case "Asian American": return "hsla(76,100%,21%,1)";
        case "African American": return "hsla(51, 100%, 50%, 1)";
        case "Hispanic": return "hsla(355,92%,46%,1)";
        case "Native American": return "hsla(173,83%,66%,1)";
        case "Hawaiian/Pacific Islander": return "hsla(328, 100%, 50%, 1)";
        case "Multiracial": return "hsla(157, 100%, 50%, 1)";
        case "International": return "hsla(184,82%,22%,1)";
      }
    })
    .on("mouseover", tip.show)
    .on("mouseout", tip.hide);

    var legend = svg.append("g")
    	  .attr("class", "legend")
        .attr("transform", "translate(" + (width/60) + "," + (margin.top + 290) + ")")
    	  .attr("height", 100)
    	  .attr("width", 100);

    	legend.selectAll('g').data(data2)
          .enter()
          .append('g')
          .each(function(d, i) {
            var g = d3.select(this);

              g.append("rect")
                .attr("x", (width/2) - 65)
                .attr("y", i*25)
                .attr("width", 10)
                .attr("height", 10)
                .style("fill", function(d) {
                   switch (d["Demographic"]) {
                    case " ": return "hsla(82,56%,97%,1)";
                    case "Caucasian": return "hsla(261,100%,22%,1)";
                    case "Asian American": return "hsla(76,100%,21%,1)";
                    case "African American": return "hsla(51, 100%, 50%, 1)";
                    case "Hispanic": return "hsla(355,92%,46%,1)";
                    case "Native American": return "hsla(173,83%,66%,1)";
                    case "Hawaiian/Pacific Islander": return "hsla(328, 100%, 50%, 1)";
                    case "Multiracial": return "hsla(157, 100%, 50%, 1)";
                    case "International": return "hsla(184,82%,22%,1)";
                  }});

                g.append("text")
                  .attr("x", (width/2) - 50)
                  .attr("y", i * 25 + 8)
                  .attr("height",30)
                  .attr("width",100)
                  .style("fill", "black")
                  .text(d["Demographic"]);
                });
};

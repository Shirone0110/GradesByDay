var penguinPromise = d3.json("penguins/classData.json");

var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40];

var Day = 0;

penguinPromise.then(
function(penguins)
{
    console.log(penguins);
    days.forEach(function(d, index)
    {
        d3.select("body")
            .append("button")
            .text("Day: " + d)
            .on("click", function()
            {
                setup(penguins, index);
                Day = index;
                d3.select("p").text("Day " + d);
            })
            .attr("class", (index % 5 == 0) ? "down" : "not");
    })
    d3.select("body")
        .append("button")
        .text("Previous day")
        .on("click", function()
        {
            if (Day == 0) Day = 37;
            else Day--;
            d3.select("p").text("Day " + days[Day]);
            setup(penguins, Day);
        })
    d3.select("body")
        .append("button")
        .text("Next day")
        .on("click", function()
        {
            if (Day == 37) Day = 0;
            else Day++;
            d3.select("p").text("Day " + days[Day]);
            setup(penguins, Day);
        })
    setup(penguins, 0);
},
function(err)
{
    console.log("fail", err);
})

var screen = {height: 400, width: 800};

var drawPoints = function(points, xScale, yScale)
{
    d3.selectAll("svg *").remove();
    
    d3.select("svg")
        .selectAll("circle")
        .data(points)
        .enter()
        .append("circle")
        .attr("cx", function(p){return xScale(p.x)})
        .attr("cy", function(p){return yScale(p.y)})
        .attr("r", 5);
}

var setup = function(penguins, day)
{
    var points = penguins.map(function(d, i)
    {
        return {x: i, y: d.quizes[day].grade};
    })
    
    d3.select("svg")
        .attr("height", screen.height)  
        .attr("width", screen.width);
    
    var xScale = d3.scaleLinear()
    
    xScale.domain([d3.min(points, function(d){return d.x;}), 
                  d3.max(points, function(d){return d.x;})]);
    xScale.range([10, screen.width - 20]);
    
    var yScale = d3.scaleLinear()
    
    yScale.domain([d3.min(points, function(d){return d.y;}), 
                  d3.max(points, function(d){return d.y;})]);
    yScale.range([screen.height - 20, 10]);
    
    drawPoints(points, xScale, yScale);
}


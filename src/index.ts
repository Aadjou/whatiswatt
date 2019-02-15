import * as d3 from "d3"

const categories = [{name: 'h', color: 'Bisque'},
    {name: 'km', color: 'BlanchedAlmond'},
    {name: 'usage', color: 'Cornsilk'}]

let chart = d3.select("#container")
    .append("svg")

const h:number = chart.node().parentElement.clientHeight
const w:number = chart.node().parentElement.clientWidth
const r:number = Math.min(h, w)/3


d3.json("http://localhost:5000/start").then(d => {
    init(d)
})

function init(d) {
    const data = calculatePositions(d)
    draw(data, d)
}

function draw(data:any[], categories:any[]) {


    let circleContainer = chart
        .attr("width", w)
        .attr("height", h)
        .append('g')
        .attr('class', 'circles')

    let lineContainer = chart
        .append('g')
        .attr('g', 'lines')

    let nodeContainer = chart
        .append('g')
        .attr('class', 'nodes')

    let circles = circleContainer
        .selectAll('circle')
        .data(categories)
        .enter()
        .append('circle')

    circles
        .attr('cx', w/2)
        .attr('cy', h/2)
        .attr('r', (d, i) => {
            return getRadius(i, r)
        })
        //.style("fill", (d) => d.color)
        .style('fill', 'transparent')
        .style('stroke', 'darkgrey')
        .style('stroke-width', 3)
        .style('stroke-dasharray', '1, 8')
        .style('stroke-linecap', 'round')

   let nodes = nodeContainer
       .selectAll('circle')
       .data(data)
       .enter()
       .append('circle')
       .attr('cx', (d) => d.x)
       .attr('cy', (d ) => d.y)
       .attr('r', (d) => Math.min(d["wh_per_unit"]* 0.05, 20))
       .attr('fill', d => `hsl(0,0%,${Math.random()*100}%)`)
        .on("mouseover", function() {
            showLegend(d3.select(this).data()[0]["activity"])
        })
        .on('mouseout', function() {
            removeLegend()
        })

    let lines = lineContainer
        .selectAll('line')
        .data(data)
        .enter()
        .append('line')
        .style('stroke', 'black')
        .attr('x1', (d) => w/2)
        .attr('x2', (d) => d.x)
        .attr('y1', (d) => h/2)
        .attr('y2', (d) => d.y)
}


function showLegend(name) {
   d3.select("svg")
    .append("text")
    .attr("class", "legend")
    .attr("x", w/2-100)
    .attr("y", h-100)
    .text(name)
}


function removeLegend() {
   d3.select(".legend") 
    .remove()
}


function getRandomData(): any[] {
    return [
        { name: 'TV', energy: 1.7, type: 'duration'},
        { name: 'Shower', energy: 2.5, type: 'usage'},        { name: 'TV', energy: 1.7, type: 'duration'},
        { name: 'Shower', energy: 2.5, type: 'usage'},        { name: 'TV', energy: 1.7, type: 'duration'},
        { name: 'Shower', energy: 2.5, type: 'usage'},        { name: 'TV', energy: 1.7, type: 'duration'},
        { name: 'Shower', energy: 2.5, type: 'usage'},        { name: 'TV', energy: 1.7, type: 'duration'},
        { name: 'Shower', energy: 2.5, type: 'usage'},        { name: 'TV', energy: 1.7, type: 'duration'},
        { name: 'Shower', energy: 2.5, type: 'usage'},        { name: 'TV', energy: 1.7, type: 'duration'},
        { name: 'Shower', energy: 2.5, type: 'usage'},        { name: 'TV', energy: 1.7, type: 'duration'},
        { name: 'Shower', energy: 2.5, type: 'duration'},        { name: 'TV', energy: 1.7, type: 'duration'},
        { name: 'Shower', energy: 2.5, type: 'duration'},        { name: 'TV', energy: 1.7, type: 'duration'},
        { name: 'Shower', energy: 2.5, type: 'usage'},        { name: 'TV', energy: 1.7, type: 'duration'},
        { name: 'Shower', energy: 12.5, type: 'usage'},        { name: 'TV', energy: 1.7, type: 'duration'},
        { name: 'Shower', energy: 1.5, type: 'distance'},
        { name: 'Shower', energy: 75.5, type: 'distance'},
        { name: 'Shower', energy: 2.5, type: 'distance'},
        { name: 'Shower', energy: 2.5, type: 'distance'},
        { name: 'Shower', energy: 10.5, type: 'distance'},
    ]
}

function getRadius(i:number, r: number) {
    return r/(categories.length) * (categories.length - i)
}

function getRadiusRange(name: string) {

    let idx = -1
    for(let i = 0; i < categories.length; i++) {
        if(categories[i].name === name) {
            idx = i
            break
        }
    }
    return {min: getRadius(idx+1, r), max: getRadius(idx, r)}
}

function calculatePositions(data: any[]) {
    data.forEach((d) => {
        const range = getRadiusRange(d["unit"])
        const randomAngle = Math.random() * Math.PI * 2

        const length = Math.random() * (range.max - range.min) + range.min;
        d.x = length * Math.cos(randomAngle) + w/2;
        d.y = length * Math.sin(randomAngle) + h/2;
    })
    return data
}

// bubble size innerhalb der kategorie

import * as d3 from "d3"

const data = getRandomData()
const categories = [{name: 'usage', color: 'Bisque'},
    {name: 'duration', color: 'BlanchedAlmond'},
    {name: 'distance', color: 'Cornsilk'}]


draw(data, categories)

function draw(data:any[], categories:any[]) {
    let chart = d3.select("#container")
        .append("svg")

    const h:number = chart.node().parentElement.clientHeight
    const w:number = chart.node().parentElement.clientWidth
    const r:number = Math.min(h, w)/2


    let circleContainer = chart
        .attr("width", w)
        .attr("height", h)
        .append('g')
        .attr('class', 'circles')

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
       .attr('cx', 200)
       .attr('cy', 200)
       .attr('r', (d) => d.energy)
       .style('fill', 'red')


}

function getRandomData(): any[] {
    return [
        { name: 'TV', energy: 1.7, type: 'duration'},
        { name: 'Shower', energy: 2.5, type: 'usage'}
    ]
}

function getRadius(i:number, r: number) {
    return r/(categories.length) * (categories.length - i)
}

// function getRadiusRange(name: string, r: number) {
//     const idx = for(var i = 0; i < categories.length; i++) {
//         if(categories[i].name === name) {
//             return i;
//         }
//     }
//     return {min: getRadius(i-1, r), max: getRadius(i, r)}
// }


// bubble size innerhalb der kategorie

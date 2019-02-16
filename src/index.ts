import * as d3 from 'd3'

interface Data {
    title: string
    main: Parameter
    parameters: Parameter[]
}

interface Parameter {
    label: string
    value: any
    unit: string
}

const data:Data[] = [
            {
        title: "Google Suche",
        main: {
            label: "Anzahl",
            value: 433,
            unit: ""
        },
        parameters: []
    },
        {
        title: "Smartphone",
        main: {
            label: "Ladungen",
            value: 14.13,
            unit: ""
        },
        parameters: [
            {
                label: "Modell",
                value: "Fairphone",
                unit: "˅"
            },
        ]
    },
      {
        title: "Toaster",
        main: {
            label: "Dauer",
            value: 6.24,
            unit: "min"
        },
        parameters: [
            {
                label: "Modell",
                value: "KitchenAid",
                unit: "˅"
            },
        ]
    },
          {
        title: "Zugfahrt",
        main: {
            label: "Distanz",
            value: 1.023622047,
            unit: "km"
        },
        parameters: [
            {
                label: "Zugart",
                value: "Interregio",
                unit: "˅"
            },
            {
                label: "Belegung",
                value: 60,
                unit: "%"
            }
        ]
    },
          {
        title: "Bitcoin",
        main: {
            label: "Transaktionen",
            value: 0.0004333333333,
            unit: ""
        },
        parameters: [
                    ]
    },

          {
        title: "Mikrowelle",
        main: {
            label: "Dauer",
            value: 9.75,
            unit: "min"
        },
        parameters: [
            {
                label: "Leistung",
                value: 800,
                unit: "Watt"
            },
            {
                label: "Modell",
                value: "Bosch HMT72",
                unit: "˅"
            },
        ]
    },


]

draw(1)
function draw(factor) {
    console.log(factor)
    d3.selectAll("#container section").remove()
    d3.selectAll("#container .kwh").remove()
    
    d3.select("#container")
        .append("p")
        .attr("class", "kwh")
        .text(`${Number((0.13*factor).toFixed(3))} kWh`)

    const scenarios =
        d3.select("#container")
        .selectAll("section")
        .data(data)
        .enter()
        .append("section")
        .attr("class", "scenario")

    scenarios
        .append("h1")
        .attr("class", "scenario")
        .text(d => d.title)

    scenarios.selectAll(".main").remove()

    const ps = scenarios
        .append("p")
        .attr("class", "main")

    ps.append("span")
        .attr("class", "main-label")
        .text(d => d.main.label)

    ps.append("input")
        .attr("class", "main-value")
        .attr("value", d => {console.log(factor); return Number((d.main.value * factor).toFixed(2)); })
        .on("keydown", function(d) {
            if(d3.event.key === "Enter" || d3.event.key === "Tab") {
                let factor = parseFloat(this.value) / d.main.value
                draw(factor)
            }
        })

    ps.append("span")
        .attr("class", "main-unit")
        .text(d => d.main.unit)


    const minors = scenarios.selectAll(".minor") 
        .data(d => d.parameters)
        .enter()
        .append("p")
        .attr("class", "minor")

    minors
        .append("span")
        .attr("class", "minor-label")
        .text(d => d.label)

    minors
        .append("span")
        .attr("class", "minor-value")
        .text(d => d.value)

    minors
        .append("span")
        .attr("class", "minor-unit")
        .text(d => d.unit)
}

import React, { Component } from 'react';
import _ from 'lodash';
import * as d3 from 'd3';


const drawbar = (props) => {
    d3.select('.vis-barchart > *').remove();
    const data = props.data;
    const margin = {top: 20, right: 20, bottom: 30, left: 40};
    const width = props.width - margin.left - margin.right;
    const height = props.height - margin.top - margin.bottom;
    let svg = d3.select('.vis-barchart').append('svg')
            .attr('width',width + margin.left + margin.right)
            .attr('height',height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    data.forEach(function(d) {
        d.age = +d.age;
    });

    let x = d3.scaleBand()
          .range([0, width])
          .padding(0.1);
    let y = d3.scaleLinear()
          .range([height, 0]);
    x.domain(data.map(function(d) { return d.name; }));
    y.domain([0, d3.max(data, function(d) { return d.age; })]);

    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.name); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.age); })
        .attr("height", function(d) { return height - y(d.age); })
        .attr("stroke", "rgb(255,255,255)");

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .attr("stroke", "rgb(255,255,255)");

    svg.append("g")
        .call(d3.axisLeft(y))
        .attr("stroke", "rgb(255,255,255)");
}


const drawline = (props) => {
    let data = [];
    if (props.data !== null) {
        data = _.cloneDeep(props.data.activities);
    }
    d3.select('.vis-linechart > *').remove();
    let margin = { top: 20, right: 20, bottom: 30, left: 40 }
    const width = props.width - margin.left - margin.right;;
    const height = props.height - margin.top - margin.bottom;
    let svg = d3.select(".vis-linechart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")")
            .attr("stroke", "rgb(255,255,255)");

    data.forEach(function (d) {
        d.date = d3.timeParse("%Y-%m-%d")(d.date);
        d.count = +d.count;
    });
    
    let x = d3.scaleTime()
        .domain(d3.extent(data, function (d) { return d.date; }))
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .attr("stroke", "rgb(255,255,255)");

    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) { return +d.count; })])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y))
        .attr("stroke", "rgb(255,255,255)");

    // Add the line
    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "rgb(230,179,61)")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(function (d) { return x(d.date) })
            .y(function (d) { return y(d.count) })
        )
}

const drawpie = (props) => {
    const data = props.data;
    const gender = ['Male', 'Female', 'Unknown'];
    let count = new Array(3).fill(0);
    data.forEach(d => {
        let genderIndex = gender.indexOf(d.gender);
        if (genderIndex + 1)
            count[genderIndex] += 1;
    });

    const dataset = [
        { label: 'Male', count: count[0] },
        { label: 'Female', count: count[1] },
        { label: 'Unknown', count: count[2] }
    ]

    d3.select('.vis-piechart > *').remove();
    const margin = { top: 10, right: 20, bottom: 30, left: 40 };
    const width = props.width - margin.left - margin.right;
    const height = props.height - margin.top - margin.bottom;

    let svg = d3.select('.vis-piechart')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + (width / 2 + margin.left) + ',' + (height / 2 + margin.top) + ')');

    let radius = Math.min(width, height) / 2;

    let color = d3.scaleOrdinal()
        .range(['steelblue', 'LightBlue', 'LightSteelBlue']);

    let arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    let pie = d3.pie()
        .value(function (d) { return d.count; })
        .sort(null);

    svg.selectAll('path')
        .data(pie(dataset))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', function (d, i) {
            return color(d.data.label);
        });
    let legendG = svg.selectAll(".legend")
        .data(pie(dataset))
        .enter().append("g")
        .attr("transform", function (d, i) {
            return "translate(" + (i * 70 - 100) + "," + 110 + ")"; 
        })
        .attr("class", "legend")
        .attr("stroke", "rgb(255,255,255)");

    legendG.append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", function (d, i) {
            return color(i);
        });

    legendG.append("text") 
        .text(function (d) {
            return d.data.label;
        })
        .style("font-size", 12)
        .attr("y", 10)
        .attr("x", 11);
}

export class BarChart extends Component {

    componentDidMount() {
        drawbar(this.props);
    }

    componentDidUpdate(preProps) {
        drawbar(this.props);
    }

    render() {
        return (
            <div className='vis-barchart'/>
        )
    }
}

export  class LineChart extends Component {

    componentDidMount() {
        drawline(this.props);
    }

    componentDidUpdate(preProps) {
        drawline(this.props);
    }

    render() {
        return (
            <div className='vis-linechart'/>
        )
    }
}

export  class PieChart extends Component {

    componentDidMount() {
        drawpie(this.props);
    }

    componentDidUpdate(preProps) {
        drawpie(this.props);
    }

    render() {
        return (
            <div className='vis-piechart'/>
        )
    }
}

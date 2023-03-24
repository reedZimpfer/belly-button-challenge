// Module 14
// Belly-Button-Challenge

// Function for the new option selected
function optionChanged(selectedID) {
    const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
    //Read the data from url
    d3.json(url).then(function(data) {
    //Extract data for plotting
    let samples = data.samples;
    // Filter the data for the selected ID
    let sampleArray = samples.filter(sampleObject => sampleObject.id == selectedID);
    let sampleResult = sampleArray[0];
    let otu_Ids = sampleResult.otu_ids;
    let otu_Labels = sampleResult.otu_labels;
    let sampleValues = sampleResult.sample_values;
    
//Bar Chart 
    let Trace1 = [{
      x: sampleValues.slice(0, 10).reverse(),
      y: otu_Ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
      text: otu_Labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h"
    }];
    
    //Create layout for the bar chart
    let Layout1 = {
      title: "Top 10 Bacteria Cultures Found",
      margin: { t:100, l: 160 }
    };
    //Plot the bar chart
    Plotly.newPlot("bar", Trace1, Layout1);

//Bubble Chart    
     let Trace2 = [{
        x: otu_Ids,
        y: sampleValues,
        text: otu_Labels,
        mode: "markers",
        marker: {
            size: sampleValues,
            color: otu_Ids,
            colorscale: "Earth"
        }
    }];
    //Create layout for the bubble chart
    let Layout2 = {
        title: "Bacteria Cultures Per Sample",
        hovermode: "closest",
        xaxis: { title: "OTU ID" },
        margin: { t:30}
    };
    //Plot the bubble chart
    Plotly.newPlot("bubble", Trace2, Layout2);

//Gauge Chart
    let metaData = data.metadata;
    //Filter the data for the selected ID
    let metaArray = metaData.filter(sampleObject => sampleObject.id == selectedID);
    let metaResult = metaArray[0];
    let wfreq = metaResult.wfreq;

    //Create trace in a list for the gauge chart
    let Trace3 = [{
        value: wfreq,
        title: { text: "Belly Button Washing Frequency <br> Scrubs per Week" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
            axis: { range: [null, 9] },
            bar: { 
                color: "green",  
                thickness: 0.2
            },
            steps: [
                { range: [0, 1], color: "rgb(248, 243, 236)" },
                { range: [1, 2], color: "rgb(239, 234, 220)" },
                { range: [2, 3], color: "rgb(230, 225, 205)" },
                { range: [3, 4], color: "rgb(218, 217, 190)" },
                { range: [4, 5], color: "rgb(204, 209, 176)" },
                { range: [5, 6], color: "rgb(189, 202, 164)" },
                { range: [6, 7], color: "rgb(172, 195, 153)" },
                { range: [7, 8], color: "rgb(153, 188, 144)" },
                { range: [8, 9], color: "rgb(132, 181, 137)" },
            ]
        }
    }];

    //Create layout for the gauge chart
    let Layout3 = { 
        width: 600, 
        height: 500, 
        margin: { t: 0, b: 0 },
        showlegend: false
    };
    //Plot the gauge chart
    Plotly.newPlot("gauge", Trace3, Layout3);

//Demographic Info
        //Select the panel for the demographic info
        let Panel = d3.select("#sample-metadata");
        //Clear the existing data
        Panel.html("");
        //Add the demographic info
        Object.entries(metaResult).forEach(([key, value]) => {
            Panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
    });
};

//Function for the initial data rendering
function init() {
    //Select the dropdown menu
    let dropdown = d3.select("#selDataset");
    //Read the data from url
    const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
    d3.json(url).then(function(data) {
        //Get the ID data to the dropdown menu
        data.names.forEach(function(id) {
            dropdown.append("option").text(id).property("value");
        });
        //Call the functions to display the data and the plots to the page
        optionChanged(data.names[0]);
    });
};

init();
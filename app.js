//load dorp down and send initial patient details to charts and demographics
function initial_data(){
    var dropdown_ids = d3.select("#selDataset");
    d3.json("Nasdaq-100.json").then((incomingData) => {
        console.log(incomingData)
        var nasdaq_100 = incomingData.Symbol;       
        console.log(nasdaq_100);
        Object.entries(nasdaq_100).forEach(([key,value]) => {
            //console.log(element);
            dropdown_ids.append("option").text(value).property("value",value);

        });
        var initial_stock = nasdaq_100[0];
        console.log(initial_stock);
        console.log(nasdaq_100[0]);
        stockdetails(initial_stock);
        });
    };

function stockdetails(stock){
    //var return_stock=[];
    //var output;
    console.log(stock)

    d3.json("SIRI.json").then((incomingData)=>{
        var closing = incomingData.c;
        var timestamp = incomingData.t;
        var temp =[];
        console.log(closing)
        console.log(timestamp)
        // timestamp.forEach(element => {
        //   temp.append(element);
        // });
        console.log(temp);
        var yticks = closing;
        var xticks = timestamp;
        console.log(timestamp[0]);
        
        var historicalData = [
          {
            y: yticks,
            x: xticks,
            type: "line",
            orientation: "h",
          }
        ];
    
        var historicalLayout = {
          title: "Historical Trend - SIRI",
          margin: { t: 30, l: 150 },
          xaxis: {
            type: "date",
            tickformat: '%b %y' // For more time formatting types, see: https://github.com/d3/d3-time-format/blob/master/README.md
          }
        };
    
        Plotly.newPlot("historical", historicalData, historicalLayout)
    });
};



//making sure the initial function for drop down loads automatically
initial_data();
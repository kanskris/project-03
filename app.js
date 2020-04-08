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
        stockhistoricaltrend(initial_stock);
        stockpredictions(initial_stock);
        });
    };

function stockpredictions(stock){
    //var return_stock=[];
    //var output;
    console.log(stock)

    d3.json("APD(SIRI).json").then((incomingData)=>{
        var closing_act = incomingData.Actual;
        var closing_prd = incomingData.Predictions;
        var timestamp = incomingData.Date;
        var temp =[];
        var yticks=[];
        var y1ticks=[];
        //console.log(closing_prd);
        Object.entries(closing_prd).forEach(([key,[value]]) => {
          //y1ticks.push(parseInt(value.toFixed(2)));
          y1ticks.push(value);
        });        
        //console.log(closing_act);
        Object.entries(closing_act).forEach(([key,value]) => {

          yticks.push(value);
        });
        //console.log(timestamp);
        Object.entries(timestamp).forEach(([key,value]) => {
            //console.log(value);
            var day = moment(value).format("YYYY-MM-DD");
            //day = moment(day, "DD/MM/YYYY")
            //console.log(day);
            temp.push(day);
        });
        //console.log(temp);
        console.log(yticks);
        console.log(y1ticks);
        var xticks = temp;
        //console.log(temp[0]);
        var y_max = Math.max.apply(Math,yticks);
        console.log(y_max);
        var trace1 = {
            x: xticks,
            y: yticks,
            mode: 'lines',
            orientation: "h",
            name : 'actuals'
          };
        var trace2 = {
            x: xticks,
            y: y1ticks,
            mode: 'lines',
            orientation: "h",
            name: 'predicted'
          };
        var trendData = [trace1, trace2];
        
        var trendLayout = {
          margin: { t: 30, l: 150 },
          title: "Actual vs Predicted for " +stock,
          yaxis: {
            range: [0,y_max*1.1],
            autorange: false
          },
          xaxis: {
            type: "date",
            tickformat: '%e %b %Y' // For more time formatting types, see: https://github.com/d3/d3-time-format/blob/master/README.md
          }
        };
        Plotly.newPlot("trend", trendData,trendLayout);
    });
};    



function stockhistoricaltrend(stock){
    //var return_stock=[];
    //var output;
    console.log(stock)

    d3.json("SIRI.json").then((incomingData)=>{
        var closing = incomingData.c;
        var timestamp = incomingData.t;
        var temp =[];
        //console.log(closing)
        //console.log(timestamp)
        timestamp.forEach(element => {
            var day = moment.unix(element).format("YYYY-MM-DD");
            //day = moment(day, "DD/MM/YYYY")
            //console.log(day);
            temp.push(day);
        });
        //console.log(temp);
        var yticks = closing;
        var xticks = temp;
        //console.log(temp[0]);
        var y_max = Math.max.apply(Math,yticks);
        var historicalData = [
          {
            y: yticks,
            x: xticks,
            type: "line",
            orientation: "h",
          }
        ];
    
        var historicalLayout = {
          title: "Historical Trend - " +stock,
          margin: { t: 30, l: 150 },
          yaxis: {
            range: [0,y_max*1.1],
            autorange: false
          },
          xaxis: {
            type: "date",
            tickformat: '%e %b %y' // For more time formatting types, see: https://github.com/d3/d3-time-format/blob/master/README.md
          }
        };
    
        Plotly.newPlot("historical", historicalData, historicalLayout)
    });
};



//making sure the initial function for drop down loads automatically
initial_data();
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
        //stockdetails(initial_stock);
        });
    };

// function stockdetails(stock){
//     var return_patient_metadata=[];
//     //var output;
//     console.log(stock)

//     d3.json("Nasdaq-100.json").then((incomingData)=>{
//         var metadata = incomingData.Name;
//         var output = Object.keys(metadata).map(function(key) {
//           return {type: key, name: metadata[key]};
//        });
//         console.log(output)
//         return_stock = output.filter(sampleObj => sampleObj.Name == stock);
//         //output = return_stock[0];
//         console.log(return_stock);
//         var details = d3.select("#sample-metadata");

//         details.html(" ");

//         for (let [key, value] of (output)) {
//         //    console.log(key, value);
//         details
//             .append("h5")
//             .text(`${key}: ${value}`);
//         };
//     });
// };



//making sure the initial function for drop down loads automatically
initial_data();
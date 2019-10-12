d3.csv("/data/winners_annual.csv")
    .then(function(data) {
        console.log(data);
    })
    .catch(function(error) {
        alert(error);
    })

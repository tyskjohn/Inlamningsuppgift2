$(function() {


    
    var request = new XMLHttpRequest();
    request.onload = function () {
        if(this.readyState == 4 && this.status == 200) {
            var object = JSON.parse(this.response);
            

           
            }       
    };
    request.open("GET", "https://fe18.azurewebsites.net/api/totalsales", true);
    request.send();


    // byter ut texten i html-elementet med id #total-sales-chart till det värdet som hämtas från apit.
            // $("#total-sales-revenue").text(object.revenue);

            // skriver ut värdena från title och time från alla tre arrayer
            // for(var i = 0; i < object.updates.length; i++) {
                // console.log(object.updates[i].title);


                // let title = object.updates[i].title;
                // $("#root").text(`${title}`);

                // skapar virtuella DOMs objekt i form av <p> med värdena från title.
                //$("#root").append(`<p>${title}</p>`)

    // console.log(object.updates[0].time);     Skriver ut värdet i time från array nummer 0.


});
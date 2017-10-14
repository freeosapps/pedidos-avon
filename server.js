
 const https = require('https');
 const fs = require('fs');


var express = require("express");
 var app = express();
 var cloudinary = require('cloudinary');

 cloudinary.config({
   cloud_name: 'brunomrsn',
   api_key: "121598327771789",
   api_secret: "WxtAZWxQYs388xx57XpQF0MSo_g"
 });

 /* serves main page */
 app.get("/:public_id", function(req, res) {

   cloudinary.v2.api.update(req.params.public_id,
     { ocr: "adv_ocr" },
     function(error, result) {
       //console.log(error);
       //console.log(result);

       var annotations = result.info.ocr.adv_ocr.data[0].textAnnotations;

       var productCodes = [];

       for (var i = 0; i < annotations.length; i++) {
         if (annotations[i].description.match(/^\d{5}-\d{1}$/)) {
           productCodes.push({
             description: annotations[i].description,
             boundingPoly: annotations[i].boundingPoly
           });
         }
       }

       res.setHeader("Content-Type", "application/json");
       res.setHeader("Access-Control-Allow-Origin", "*");
       res.send({secure_url: result.secure_url, textAnnotations: productCodes});
     }
   );
 });

 var port = process.env.PORT || 3000;

/*
 app.listen(port, function() {
   console.log("Listening on " + port);
 });
*/

 var privateKey = fs.readFileSync( 'domain-key.txt' );
var certificate = fs.readFileSync( 'domain-crt.txt' );

https.createServer({
    key: privateKey,
    cert: certificate
}, app).listen(port, function() {
  console.log("Listening on " + port);
});

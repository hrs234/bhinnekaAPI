module.exports = (product, name) => {
         
    let sendNotification = function(data) {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
          "Authorization": "Basic NDVkNDhmNWYtODgyNS00NjEwLTgzMDItYzEyY2UzMzMxZjA5"
        };
        
        let options = {
          host: "onesignal.com",
          port: 443,
          path: "/api/v1/notifications",
          method: "POST",
          headers: headers
        };
        
        let https = require('https');
        let req = https.request(options, function(res) {  
          res.on('data', function(data) {
            console.log("Response:");
            console.log(JSON.parse(data));
          });
        });
        
        req.on('error', function(e) {
          console.log("ERROR:");
          console.log(e);
        });
        
        req.write(JSON.stringify(data));
        req.end();
      };
      
      let message = { 
        app_id: "7284a78f-6851-4288-b700-2b27beffa07e",
        contents: {"en": `${product} berhasil dibeli oleh ${name}`},
        included_segments: ["Active Users"]
      };
      
      sendNotification(message);
}
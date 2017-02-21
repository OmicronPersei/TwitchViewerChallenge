/*global $, jQuery, navigator*/
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50, white: true  */

function TwitchUserInfoAPI(userName, mainInfoReadyCallback) {
  "use strict";
  
  var apiURL = "https://wind-bow.gomix.me/twitch-api";
  var getUserInfoStr = "/users/" + userName;
  this.UserInfo = undefined;
  
  $.ajax( {
    dataType: "jsonp",
    url: this.apiURL + this.getUserInfoStr,
    data: null,
    success: function(obj) {
      this.UserInfo = obj;
      
      if (mainInfoReadyCallback !== undefined) {
        mainInfoReadyCallback();
      }
    }
  });
  
  
}

function TwitchUserDisplay(twitchUserInfoAPIObj) {
  "use strict";
  
  
  
}

$(document).ready(function() {
  "use strict";
  
 
  
  
});
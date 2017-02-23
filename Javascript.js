/*global $, jQuery, navigator*/
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50, white: true  */

function TwitchUserInfoAPI(userName) {
  "use strict";
  
  this.UserName = userName;
  
  this.UserInfo = undefined;
  this.ChannelInfo = undefined;
  this.StreamInfo = undefined;
}

TwitchUserInfoAPI.prototype.isAllDataReady = function() {
  "use strict";
  
  return ((this.UserInfo !== undefined)  &&
          (this.ChannelInfo !== undefined) &&
          (this.StreamInfo !== undefined));
};

TwitchUserInfoAPI.prototype.getUserInfo = function(allInfoReadyCallback) {
  "use strict";
  
  var apiURL = "https://wind-bow.gomix.me/twitch-api";
  
  var getUserInfoStr = "/users/" + this.UserName;
  
  var oThis = this;
  
  $.ajax( {
    dataType: "jsonp",
    url: apiURL + getUserInfoStr,
    data: null,
    success: function(obj) {
      oThis.UserInfo = obj;
      
      if (oThis.isAllDataReady()) {
        allInfoReadyCallback();
      }
    }
  });
  
  var getStreamInfoStr = "/streams/" + this.UserName;
  
  $.ajax( {
    dataType: "jsonp",
    url: apiURL + getStreamInfoStr,
    data: null,
    success: function(obj) {
      oThis.StreamInfo = obj;
      
      if (oThis.isAllDataReady()) {
        allInfoReadyCallback();
      }
    }
  });
  
  var getChannelInfoStr = "/channels/" + this.UserName;
  
  $.ajax( {
    dataType: "jsonp",
    url: apiURL + getChannelInfoStr,
    data: null,
    success: function(obj) {
      oThis.ChannelInfo = obj;
      
      if (oThis.isAllDataReady()) {
        allInfoReadyCallback();
      }
    }
  });
  
  
};

function TwitchUserDisplay(twitchUserInfoAPIObj) {
  "use strict";
  
  
  
}

$(document).ready(function() {
  "use strict";
  
 
  
  
});
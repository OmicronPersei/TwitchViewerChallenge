/*global $, jQuery, navigator*/
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50, white: true  */

function TwitchUserInfoAPI(userName) {
  "use strict";
  
  this.UserName = userName;
  
  this.UserInfo = undefined;
  this.ChannelInfo = undefined;
  this.StreamInfo = undefined;
  
  //Parsed info
  this.UserExists = undefined;
  this.UserIsStreaming = undefined;
  this.UserIcon = undefined;
}

TwitchUserInfoAPI.prototype.parseUserInfo = function() {
  "use strict";
  
  if (this.UserInfo.hasOwnProperty("error")) {
    this.UserExists = false;
  } else {
    this.UserExists = true;
  }
  
  if (this.UserInfo.hasOwnProperty("logo")) {
    this.UserIcon = this.UserInfo.logo;
  } else {
    this.UserIcon = null;
  }
};

TwitchUserInfoAPI.prototype.parseStreamInfo = function() {
  "use strict";
  
  if (this.StreamInfo.stream === null) {
    this.UserIsStreaming = false;
  } else {
    this.UserIsStreaming = true;
  }
  
};

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
      oThis.parseUserInfo();
      
      if (oThis.isAllDataReady() && $.isFunction(allInfoReadyCallback)) {
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
      oThis.parseStreamInfo();
      
      if (oThis.isAllDataReady() && $.isFunction(allInfoReadyCallback)) {
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
      
      if (oThis.isAllDataReady() && $.isFunction(allInfoReadyCallback)) {
        allInfoReadyCallback();
      }
      
    }
  });
  
  
};

function TwitchUserDisplay(userName, DOMID) {
  "use strict";
  
  this.DOMID = DOMID;
  this.TwitchUserInfoAPIObj = new TwitchUserInfoAPI(userName);
  
  this.DOMIDinnerDisplay = DOMID + "innerDisplay";
  
  var initialBlankDisplay = 
      "<div class='panel panel-default'>" +
      " <div class='panel-body'>" +
      "   <div id='" + this.DOMIDinnerDisplay +"' />" +
      " </div>" +
      "</div>";
  
  $("#" + this.DOMID).html(initialBlankDisplay);
  
  $("#" + this.DOMIDinnerDisplay).html("Loading " + userName + "...");
}

TwitchUserDisplay.prototype.setDisplay = function(html) {
  "use strict";
  
  $("#" + this.DOMIDinnerDisplay).html(html);
};

TwitchUserDisplay.prototype.displayNonExistantUser = function() {
  "use strict";
  
  var userNoExistDisplay = "(" + this.TwitchUserInfoAPIObj.UserName + " does not exist).";
  
  this.setDisplay(userNoExistDisplay);
  
};

TwitchUserDisplay.prototype.displayExistingUser = function() {
  "use strict";
    
  var mediaBody = "";
  
  var channelURL = this.TwitchUserInfoAPIObj.ChannelInfo.url;
  
  if (this.TwitchUserInfoAPIObj.UserIsStreaming) {
    mediaBody = "<p>" + this.TwitchUserInfoAPIObj.ChannelInfo.status + "</p>";
  }
  
  var mediaContainer = 
      "<a href='" + channelURL + "' target='_blank'>" +
      " <div class='media'>" +
      "   <div class='media-left'><img class='media-object twitchUserIcon' src='" + this.TwitchUserInfoAPIObj.UserIcon + "'></div>" +
      "   <div class='media-body'>" +
      "     <div class='media-heading'><h4>" + this.TwitchUserInfoAPIObj.UserName + "</h4></div>" + 
            mediaBody + 
      "   </div>" +
      " </div>" +
      "</a>";
  
  
  
  this.setDisplay(mediaContainer);
};

TwitchUserDisplay.prototype.displayLoadedUser = function() {
  "use strict";
  
  if (this.TwitchUserInfoAPIObj.UserExists) {
    this.displayExistingUser();
  } else {
    this.displayNonExistantUser();
  }
  
};

TwitchUserDisplay.prototype.loadUserInfo = function() {
  "use strict";
  
  var oThis = this;
    
  //this.displayLoadedUser();
    
  this.TwitchUserInfoAPIObj.getUserInfo(function() {
    oThis.displayLoadedUser();
  });
  
};

var setupTwitchUsers = function(twitchUsernames) {
  "use strict";
  
  //First, add the div elems to represent each individual Twitch 
  //user display
  
  var twitchUserDisplays = "";
  twitchUsernames.forEach(function(username) {
    twitchUserDisplays += "<div id='twitchUser" + username + "' />"; 
  });
  
  //Write to the DOM the twitchUserDisplays
  $("#twitchDisplays").html(twitchUserDisplays);
  
  //Now, create TwitchUserDisplays for each twitch username.
  twitchUsernames.forEach(function(username) {
    var userDisplay = new TwitchUserDisplay(username, "twitchUser" + username);
    userDisplay.loadUserInfo();
  });
  
};

$(document).ready(function() {
  "use strict";
  
  var twitchUsers = [
    "ESL_SC2", 
    "OgamingSC2", 
    "cretetion", 
    "freecodecamp", 
    "storbeck", 
    "habathcx", 
    "RobotCaleb", 
    "noobs2ninjas",
    "comster404",
    "brunofin" ];
  
  setupTwitchUsers(twitchUsers);
  
  
});
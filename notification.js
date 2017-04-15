var redis = require('redis');
var client2 = redis.createClient();

var notification = function(){
	var self = this;
	self.publishNotifcationRedis = function(requestBody){
		client2.publish(requestBody.channel, requestBody.message);
		return {"success": "true"};
	}
}

module.exports = notification
//Requiring dependencies
try{
	var config = require("./config.json");
}catch(e){
	console.log("Can't find config.json.");
	process.exit();
}
try{
	var irc = require("irc");
}catch(e){
	console.log("Can't find the irc module.");
	process.exit();
}
try{
	var twitter = require("twitter");
}catch(e){
	console.log("Can't find twitter module.");
	process.exit()
}
try{
	var twitt = require("twit");
}catch(e){
	console.log("Can't find twit module.");
	process.exit()
}

//Connecting to IRC & Twitter
try{
	var bot = new irc.Client("irc.ppy.sh", config.username,
	{
		username: config.username,
		password: config.password,
	});
}catch(e){
	console.log("Failed to connect.");
	process.exit();
}
var twit = new twitter({
	consumer_key: config.twitterconsumerkey,
	consumer_secret: config.twitterconsumersecret,
	access_token_key: config.twitteraccesstoken,
	access_token_secret: config.twitteraccesstokensecret
});
twit1 = new twitt({
	consumer_key: config.twitterconsumerkey,
	consumer_secret: config.twitterconsumersecret,
	access_token: config.twitteraccesstoken,
	access_token_secret: config.twitteraccesstokensecret
});


//Declaring variables
var lastsender = "none";
var enable = 1;

//Ready message
console.log("Irc connexion successful. User : " + config.username);
console.log("Ready.");

//Irc listener
bot.addListener('pm', function(nick, message){
	console.log('Got private message from %s: %s', nick, message);
	if (enable == 1)
	{
		var msplit = message.split(" ");
		firstchar = message.substring(0,1);
		if (enable == 1 && firstchar != "!"){
			lastsender = nick;
			var text = nick + " : " + message;
			twit.post('direct_messages/new', {user_id: config.twittertargetid, text: text});
		}
	}
});

var stream = twit1.stream('user');
stream.on('direct_message', function (eventMsg) {
		text = eventMsg.direct_message.text;
		textsplit = text.split(" ");
		if (text.substring(0,1) !== "@" && text.substring(0,1) !== "!"){
			if (eventMsg.direct_message.sender.id == config.twittertargetid){
				if (lastsender !== "none"){
		    	bot.say(lastsender, text);
					console.log("Replied to " + lastsender + " on Twitter command.");
				}
				else{
					twit.post('direct_messages/new', {user_id: config.twittertargetid, text: "Previous user unknown."});
				}
			}
			else{
				return;
			}
		}
		else if (text.substring(0,1) == "@"){
			lastsender = textsplit[0].substr(1);
			text = text.substr(text.indexOf(" ") + 1);
			bot.say(lastsender, text);
			console.log("Sent PM to " + lastsender + " on Twitter command.");
		}
		else if (text.substring(0,1) == "!"){
			if (textsplit[0] == "!enable"){
				if (enable == 0){
					enable = 1;
					twit.post('direct_messages/new', {user_id: config.twittertargetid, text: "The bot has been enabled."});
				}
				else{
					twit.post('direct_messages/new', {user_id: config.twittertargetid, text: "The bot is already enabled."});
				}
			}
			else if (textsplit[0] == "!disable"){
				if (enable == 1){
					enable = 0;
					twit.post('direct_messages/new', {user_id: config.twittertargetid, text: "The bot has been disabled."});
				}
				else{
					twit.post('direct_messages/new', {user_id: config.twittertargetid, text: "The bot is already disabled."});
				}
			}
			else if (textsplit[0] == "!status"){
				if (enable == 1){
					twit.post('direct_messages/new', {user_id: config.twittertargetid, text: "The bot is running and enabled."});
				}
				else{
					twit.post('direct_messages/new', {user_id: config.twittertargetid, text: "The bot is running and disabled."});
				}
			}
			else if(textsplit[0] == "!tweet"){
				if (text.indexOf(" ") !== -1){
					text = text.substr(text.indexOf(" ") + 1);
					dm = "Tweet posted : \"" + text + "\".";
					twit.post('statuses/update', {status: text},  function(error, tweet, response) {
  					if(error) throw error;
						console.log("Tweet sent.");
						});
					twit.post('direct_messages/new', {user_id: config.twittertargetid, text: dm });
				}
				else{
					twit.post('direct_messages/new', {user_id: config.twittertargetid, text: "Usage : \"!tweet text\""});
				}
			}
			else{
				twit.post('direct_messages/new', {user_id: config.twittertargetid, text: "Unknown command."});
			}
		}
		else{
			twit.post('direct_messages/new', {user_id: config.twittertargetid, text: "Unknown error."});
		}
});

//Initializing console listener
stdin = process.openStdin();

//Console listener
stdin.addListener("data", function(d) {
    command = d.toString().trim();
    commandsplit = command.split(" ");
    if (command == "stop"){
    	process.exit();
    }
    else if (command == "disable"){
    	if (enable == 1){
    		enable = 0
    		console.log("The bot has been disabled.");
    	}
    	else{
    		console.log("The bot is already disabled.");
    	}
    }
    else if (command == "enable"){
    	if (enable == 0){
    		enable = 1;
    		console.log("The bot has been enabled.");
    	}
    	else{
    		console.log("The bot is already enabled.");
    	}
    }
    else if (commandsplit[0] == "msg"){
    	if (command.indexOf(" ") !== -1 ){
    		to = commandsplit[1];
    		message = command.substr(command.indexOf(" ") + 1);
    		message = message.substr(message.indexOf(" ") + 1);
    		lastsender = to;
    		bot.say(to, message);
    	}
    	else{
    		console.log("Usage : \"msg author text\"");
    	}
    }
    else if (commandsplit[0] == "r"){
    	if (lastsender != "none" && command.indexOf(" ") !== -1){
    			message = command.indexOf(" " + 1);
    			bot.say(lastsender, message);
    	}
    	else if (command.indexOf(" ") == -1){
    			console.log("Usage : \"r text\"");
    	}
    	else if (lastsender == "none"){
    		console.log("Previous user unknown.");
    	}
    	else{
    		console.log("Error.");
    	}
		}
    else{
    	console.log("Unknown command.");
    }
});

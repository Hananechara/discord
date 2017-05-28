const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require('axios');

client.on('ready', () => {
	console.log('I am ready!');
});

client.on('message', message => {
	var res = message.content.split(" "); 	
	if (message.mentions.users.get(client.user.id)) {
		message.reply('Vous me taggez, mais pourquoi???');
	}
	if (message.channel.type =='dm' && !message.author.bot){
		//message.reply('Bienvenue');

	if (message.content == '!blague') {
		axios.get('http://www.chucknorrisfacts.fr/api/get?data=tri:alea;nb:1').then(
			function(resp){
				message.reply(resp.data[0].fact);
		});
	}

	if (res[0]== '!meteo'){
		axios.get('http://api.openweathermap.org/data/2.5/weather?q='+res[1]+'&appid=ee30acaddbdacdc273a1606c7ad920d8&units=metric').then(
			function(resp){
				message.reply(res[1]+" min "+resp.data.main.temp_min+" max "+resp.data.main.temp_max);
		});
	}


	if (res[0]== '!image'){
	
	
		var apiId="018d9b095ca5241"
		
		var options = {
			  "method": "GET",
			  "url":  "https://api.imgur.com/3/gallery/search/q?=cats",
			  "headers": {
				"authorization": "Client-ID 018d9b095ca5241"
			  }
			};
			
	
	   axios(options).then( function(resp){
			  console.log(resp);
			  var chunks = [];
			  resp.on("data", function (chunk) {
				console.log(chunk);
				chunks.push(chunk);
			  });
			  resp.on("end", function () {
				var body = Buffer.concat(chunks);
				console.log(body.toString());
				console.log(body);
			var lienImage= body[0].link;
			
			console.log(lienImage);
			message.reply('',{embed:{url:lienImage,image:{url:lienImage}}});
		});
	}).catch(console.error);
	}	
}
	else{
			if ( !message.author.bot){
				message.reply('Message Incompris');
			}
		}
	
	
  	console.log(message);
});

client.on('presenceUpdate',function(oldMember, newMember) {
	console.log(oldMember.presence, '=>', newMember.presence);
	if  (newMember.user.username == 'bramas' && newMember.presence=='online'){
		newMember.sendMessage('bonjour maitre, je suis le bot de MAMADOU et HANANE, que puis-je faire pour vous aujourd hui..');
	}
	console.log(newMember.user.username);
});
client.login(process.env.DISCORD_TOKEN);
 
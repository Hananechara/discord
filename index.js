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
	
		var apiId="018d9b095ca5241";
		var urlImgur= "https://api.imgur.com/3/gallery/search/?q=cats";
		var options = {
			  "headers": {
				"authorization": "Client-ID 018d9b095ca5241" 
			  }
			};
		axios({
		url: urlImgur,
		method: 'get',
		headers: {"authorization": "Client-ID 018d9b095ca5241" },
		} ).then( function(resp){
			console.log(resp.data[0]);
			var lienImage= resp.data[0].link;
			message.reply('',{embed:{url:lienImage,image:{url:lienImage}}});
		}).catch(console.error);
	}
	
	if (res[0]== '!iss'){
		var lat="";
		var lng="";
		axios.get('https://api.wheretheiss.at/v1/satellites/25544').then( function(resp){
				lat=resp.data.latitude;
				lng=resp.data.longitude;
				console.log(resp);
				var urlImage= "http://staticmap.openstreetmap.de/staticmap.php?center="+lat.toString()+","+lng.toString()+"8&zoom=5&size=400x300&maptype=mapnik&markers="+lat.toString()+","+lng.toString()+",ltblu-pushpin";
				message.reply('',{embed:{url:urlImage,image:{url:urlImage}}});
		});
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
 
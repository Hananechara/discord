const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require('axios');

client.on('ready', () => {
	console.log('I am ready!');
});
client.on('message', message => {
	
	if (message.mentions.users.get(client.user.id)) {
		message.reply('Vous me taggez, mais pourquoi???');
	}
	if (message.channel.type=='dm' && !message.author.bot){
		//message.reply('Bienvenue');
	
		if (message.content[0] == '!'){
			console.log(message.content[1,-1] )
			if (message.content[1,-1] == 'blague') {
				axios.get('http://www.chucknorrisfacts.fr/api/get?data=tri:alea;nb:1').then(
					function(resp){
						message.reply(resp.data[0].fact);
				});
		}
		}
	}
	else{
	if (!message.author.bot){
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
 

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
	console.log('I am ready!');
});
client.on('message', message => {
	
	if (message.mentions.users.get(client.user.id)) {
		message.reply('Vous me taggez, mais pourquoi???');
	}
	if (message.channel.type=='dm' && !message.author.bot){
		message.reply('Bienvenue');
	}
	else{
	if (!message.author.bot){
			message.reply('Message Incompris');
		}
	}
  	console.log(message);
});
client.on('presenceUpdate', function(oldMember, newMember) {
	console.log(oldMember.presence, '=>', newMember.presence);
	console.log(newMember);
});
client.login(process.env.DISCORD_TOKEN);
 

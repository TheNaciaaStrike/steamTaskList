const express = require('express')
const passport = require('passport')
const db = require('./db')
const https = require('https')
const fs = require('fs')
const { Client, MessageEmbed } = require('discord.js');

const client = new Client();


const PORT = process.env.PORT || 3000
const app = express()

require('./config/passport')(passport, db)
require('./config/express')(app, passport, db.pool)
require('./config/routes')(app, passport, db)

 const server = app.listen(PORT, () => {
	console.log('Express app started on port ' + PORT)
})

server.on('close', () => {
	console.log('Closed express server')

	db.pool.end(() => {
		console.log('Shut down connection pool')
	})
})

client.on('ready', () => {
	console.log('I am ready!');
  });
  
  // Create an event listener for messages
  client.on('message', function(message) {
	// If the message is "ping"
	if (message.content === 'ping') {
	  // Send "pong" to the same channel
	  message.channel.send('pong');
	}
	if (message.content === 'tasklist') {
		// We can create embeds using the MessageEmbed constructor
		// Read more about all that you can do with the constructor
		// over at https://discord.js.org/#/docs/main/master/class/MessageEmbed
		db.query('SELECT * FROM taskList WHERE "Completed"= $1 ;', ['false'], (err, rez) =>{
			if(err){
				throw err
			}
			console.log(rez.rows.length)
			var Fieldz = []
			if(rez.rows.length>25){
				for(i=0; i<25; i++){
					var temp = {name:rez.rows[i].RequestedUser,value:rez.rows[i].Task}
					Fieldz.push(temp)
				}
			}
			else{
				for(i=0; i<rez.rows.length; i++){
					var temp = {name:rez.rows[i].RequestedUser,value:rez.rows[i].Task}
					Fieldz.push(temp)
				}
			}
			console.log(Fieldz)
			var embed = new MessageEmbed()
			.setTitle('Task List')
			.setDescription('Tasks that sill need to be done')
			.setColor([125,0,125])
			.addFields(Fieldz)
			.setTimestamp()
			.setFooter('Generated')
		// Send the embed to the same channel as the message
		message.channel.send(embed);
		})
	  }
	  if (message.content ==='test'){
		const exampleEmbed = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Some title')
		.setURL('https://discord.js.org/')
		.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
		.setDescription('Some description here')
		.setThumbnail('https://i.imgur.com/wSTFkRM.png')
		.addFields(
			{ name: 'Regular field title', value: 'Some value here' },
			{ name: '\u200B', value: '\u200B' },
			{ name: 'Inline field title', value: 'Some value here', inline: true },
			{ name: 'Inline field title', value: 'Some value here', inline: true },
		)
		.addField('Inline field title', 'Some value here', true)
		.setImage('https://i.imgur.com/wSTFkRM.png')
		.setTimestamp()
		.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
	
		message.channel.send(exampleEmbed);
	  }
  });
  
  // Log our bot in using the token from https://discordapp.com/developers/applications/me
  client.login(process.env.dcBot);

/*https.createServer({
  //key: fs.readFileSync('server.key'),
  //cert: fs.readFileSync('server.cert')
}, app)
.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}! Go to https://localhost:${PORT}/`)
})*/

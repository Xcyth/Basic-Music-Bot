const { Manager } = require('erela.js');
const filter  = require("erela.js-filters");

const { nodes } = require('../../config.json').music.lavalink;
const QueueSchema = require('./database/schemas/Queue');

let manager;

const init = async (client) => { 
    manager = new Manager({
        // The nodes to connect to, optional if using default lavalink options
        nodes,
        // Method to send voice data to Discord
        send: (id, payload) => {
          const guild = client.guilds.cache.get(id);
          // NOTE: FOR ERIS YOU NEED JSON.stringify() THE PAYLOAD
          if (guild) guild.shard.send(payload);
        },
        
        plugins: [
          new filter()
        ]
    });

    // Emitted whenever a node connects
    manager.on("nodeConnect", node => {
        console.log(`Node "${node.options.identifier}" connected.`)
    })

    // Emitted whenever a node encountered an error
    manager.on("nodeError", (node, error) => {
        console.log(`Node "${node.options.identifier}" encountered an error: ${error.message}.`)
    })

    // Emitted when a track starts
    manager.on("trackStart", (player, track) => {
      const channel = client.channels.cache.get(player.textChannel);
      // Send a message when the track starts playing with the track name and the requester's Discord tag, e.g. username#discriminator
      channel.send(`Now playing: \`${track.title}\`, requested by \`${track.requester.tag}\`.`);
    });

    // Emitted the player queue ends
    manager.on("queueEnd", player => {
      const channel = client.channels.cache.get(player.textChannel);
      channel.send("Queue has ended.");
      player.destroy();
    });

    client.on('raw', d => manager.updateVoiceState(d));

  console.log('Erela.js initialised.');
  

    return manager;
}

const saveQueue = async (manager) => {
  // Save the queue to a database
  manager.players.forEach(player => {
    QueueSchema.findOneAndUpdate({ serverId: player.guild }, { songs: player.queue }, { upsert: true }).exec();
  });
}

module.exports = { init, saveQueue };
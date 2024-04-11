const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays a song')
        .addStringOption(option =>
            option.setName('song')
                .setDescription('The song to play')
                .setRequired(true)),
    
    async execute(interaction) {
        const search = interaction.options.getString('song');
        let res;

        try {
          // Search for tracks using a query or url, using a query searches youtube automatically and the track requester object
          res = await interaction.client.manager.search(search, interaction.user);
          // Check the load type as this command is not that advanced for basics
          if (res.loadType === "LOAD_FAILED") throw res.exception;
          else if (res.loadType === "PLAYLIST_LOADED") throw { message: "Playlists are not supported with this command." };
        } catch (err) {
          return interaction.reply(`there was an error while searching: ${err.message}`);
        }

        if (res.loadType === "NO_MATCHES") return interaction.reply("there was no tracks found with that query.");

        // Create the player 
        const player = interaction.client.manager.create({
          guild: interaction.guild.id,
          voiceChannel: interaction.member.voice.channel.id,
          textChannel: interaction.channel.id,
        });
  
        // Connect to the voice channel and add the track to the queue
        player.connect();
        player.queue.add(res.tracks[0]);
  
        // Checks if the client should play the track if it's the first one added
        if (!player.playing && !player.paused && !player.queue.size) player.play();
      


        return interaction.reply(`Enqueuing ${res.tracks[0].title}.`);
    }
}
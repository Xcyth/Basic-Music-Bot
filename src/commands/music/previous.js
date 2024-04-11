const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('previous')
		.setDescription('Plays the previous song in the queue'),
	async execute(interaction) {
        const player = interaction.client.manager.get(interaction.guild.id);

        if (!player) {
            return interaction.reply("I am not connected to a voice channel.");
        }

        if (!player.queue.previous) {
            return interaction.reply("There is no previous song to play.");
        }

        player.play(player.queue.previous);

        return interaction.reply("Playing the previous song.");
	},
};
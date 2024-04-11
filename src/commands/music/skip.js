const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Skips the currently playing song'),
	async execute(interaction) {
        const player = interaction.client.manager.get(interaction.guild.id);

        if (!player) {
            return interaction.reply("I am not connected to a voice channel.");
        }

        player.stop();

        return interaction.reply("Skipping the currently playing song.");
	},
};
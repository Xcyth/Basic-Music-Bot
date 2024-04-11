const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stops the player and clears the queue'),
	async execute(interaction) {
        const player = interaction.client.manager.get(interaction.guild.id);

        if (!player) {
            return interaction.reply("I am not connected to a voice channel.");
        }

        player.destroy();

        return interaction.reply("Stopped the player and clearing the queue.");
	},
};
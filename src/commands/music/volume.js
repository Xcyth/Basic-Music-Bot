const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('volume')
        .setDescription('Sets the player to a custom volume')
        .addIntegerOption(option =>
            option.setName('volume')
                .setDescription('The volume to set')
                .setRequired(true)),
	async execute(interaction) {
        const player = interaction.client.manager.get(interaction.guild.id);

        if (!player) {
            return interaction.reply("I am not connected to a voice channel.");
        }

        player.setVolume(interaction.options.getInteger('volume'));

        return interaction.reply(`Setting the volume to ${interaction.options.getInteger('volume')}.`);
	},
};
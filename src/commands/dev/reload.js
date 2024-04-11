const { SlashCommandBuilder } = require('discord.js');
const config = require('../../../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('Reloads the commands'),
	async execute(interaction) {
        if (interaction.user.id !== config.bot.ownerId) {
            await interaction.reply('You do not have permission to use this command.');
            return;
        }
        await interaction.reply('Reloading commands...');
        interaction.client.registerCommands();
        await interaction.followUp('Commands reloaded.');
	},
};
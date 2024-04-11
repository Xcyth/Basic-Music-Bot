const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('loop')
        .setDescription('Loops the currently playing song/queue')
        .addStringOption(option =>
            option.setName('mode')
                .setDescription('The loop mode to set')
                .setRequired(true)
                .addChoices(
                    { name: 'Off', value: 'off' },
                    { name: 'Track', value: 'track' },
                    { name: 'Queue', value: 'queue' }
                )
        )
    ,
	async execute(interaction) {
		const player = interaction.client.manager.get(interaction.guild.id);

        if (!player) {
            return interaction.reply("I am not connected to a voice channel.");
        }

        const mode = interaction.options.getString('mode');

        switch (mode) {
            case "off":
                player.setQueueRepeat(false);
                player.setTrackRepeat(false);
                break;

            case "track":
                player.setQueueRepeat(false);
                player.setTrackRepeat(true);
                break;

            case "queue":
                player.setQueueRepeat(true);
                player.setTrackRepeat(false);
                break;
        }

        return interaction.reply(`Loop mode set to ${mode}.`);
	},
};
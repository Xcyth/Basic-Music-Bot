const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('filters')
        .setDescription('Adds a filter to the player')
        .addStringOption(option =>
            option.setName('filter')
                .setDescription('The filter to add')
                .setRequired(true)
                .addChoices(
                    { name: 'Nightcore', value: 'Nightcore' },
                    { name: 'Vaporwave', value: 'Vaporwave' },
                    { name: 'BassBoost', value: 'BassBoost' },
                    { name: 'Pop', value: 'Pop' },
                    { name: 'Soft', value: 'Soft' },
                    { name: 'Treblebass', value: 'Treblebass' },
                    { name: '8D', value: '8D' },
                    { name: 'Karaoke', value: 'Karaoke' },
                    { name: 'Vibrato', value: 'Vibrato' },
                    { name: 'Tremolo', value: 'Tremolo' },
                    { name: 'Reset', value: 'Reset' })
        ),
	async execute(interaction) {
        const player = interaction.client.manager.get(interaction.guild.id);

        if (!player) {
            return interaction.reply("I am not connected to a voice channel.");
        }

        switch (interaction.options.getString('filter')) {
            case "Nightcore":
                player.nightcore = true;
                break;
        
            case "Vaporwave":
                player.vaporwave = true;
                break;
            
            case "BassBoost":
                player.bassboost = true;
                break;
            
            case "Pop":
                player.pop = true;
                break;
            
            case "Soft":
                player.soft = true;
                break;
            
            case "Treblebass":
                player.treblebass = true;
                break;

            case "8D":
                player.eightD = true;
                break;
            
            case "Karaoke":
                player.karaoke = true;
                break;
            
            case "Vibrato":
                player.vibrato = true;
                break;
            
            case "Tremolo":
                player.tremolo = true;
                break;
            
            case "Reset":
                player.reset();
                break;
            
            default:
                break;
        }

        if (interaction.options.getString('filter') === "Reset") return interaction.reply(`Resetting all filters.`);

        return interaction.reply(`Adding the filter ${interaction.options.getString('filter')}.`);
	},
};
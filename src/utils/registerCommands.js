const { REST, Routes } = require('discord.js');
const { id, test_guild_id, token } = require('../../config.json').bot;
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
// Grab all the command folders from the commands directory you created earlier
const foldersPath = path.join(__dirname, '../commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	// Grab all the command files from the commands directory you created earlier
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
const register = async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		/** Uncomment the lines below for development */
        // const data = await rest.put(
        //     Routes.applicationGuildCommands(id, test_guild_id),
        //     { body: commands },
        // );

		/** Comment the lines below for development */
        const data = await rest.put(
            Routes.applicationCommands(id),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
};

module.exports = register;
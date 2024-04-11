const { Manager } = require('erela.js');

const { nodes } = require('../../config.json').music.lavalink;

let manager;

manager = new Manager({
    nodes,
});

manager.init()
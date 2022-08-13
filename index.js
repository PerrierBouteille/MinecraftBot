const mineflayer = require('mineflayer')
const navigatePlugin = require('mineflayer-navigate')(mineflayer);
const pathfinder = require('mineflayer-pathfinder').pathfinder
const armorManager = require("mineflayer-armor-manager");
const autoeat = require("mineflayer-auto-eat");
const Movements = require('mineflayer-pathfinder').Movements
const { GoalNear } = require('mineflayer-pathfinder').goals
const { mineflayer: mineflayerViewer } = require('prismarine-viewer')
const pvp = require('mineflayer-pvp').plugin
const { GoalBlock } = require('mineflayer-pathfinder').goals
const ChatMessage = require('prismarine-chat')('1.8.9')
const scaffoldPlugin = require('mineflayer-scaffold')(mineflayer);
const cp = require('child_process');



////////////////////////
FgBlack = "\x1b[30m"  //
FgRed = "\x1b[31m"    //
FgGreen = "\x1b[32m"  //
FgYellow = "\x1b[33m" //
FgBlue = "\x1b[34m"   //
FgMagenta = "\x1b[35m"//
FgCyan = "\x1b[36m"   //
FgWhite = "\x1b[37m"  //
////////////////////////

const bot = mineflayer.createBot({
    host: '', //IP of server
    username: 'Bot',  // minecraft pseudo
    //password: '12345678' // minecraft password | no pswd = crack
    // port: 25565,                // only set if you need a port
     version: "1.8.9",             // only set if you need a specific version or snapshot
    // auth: 'mojang'              // only set if you need microsoft auth, then set this to 'microsoft'
})

const mcData = require('minecraft-data')(bot.version)
const defaultMove = new Movements(bot, mcData)

navigatePlugin(bot);
bot.loadPlugin(pvp);
bot.loadPlugin(armorManager);
bot.loadPlugin(pathfinder);
bot.loadPlugin(autoeat);
bot.loadPlugin(navigatePlugin);
scaffoldPlugin(bot);


bot.once("spawn", () => {
    mineflayerViewer(bot, {port: 3000, firstPerson: true })
    mineflayerViewer(bot, {port: 3001, viewDistance: 3 })
    bot.on('path_update', (r) => {
        const nodesPerTick = (r.visitedNodes * 50 / r.time).toFixed(2)
        if (r.status == "timeout") {
            console.log(FgMagenta + '[WebLogs] ' + FgWhite + `I can get there in ${r.path.length} moves. Computation took ${r.time.toFixed(2)} ms (${nodesPerTick} nodes/tick).` + FgRed + ` ${r.status}` + FgWhite)
        }
        if (r.status == "parial") {
            console.log(FgMagenta + '[WebLogs] ' + FgWhite +`I can get there in ${r.path.length} moves. Computation took ${r.time.toFixed(2)} ms (${nodesPerTick} nodes/tick).` + FgYellow +` ${r.status}` + FgWhite)
        }
        if (r.status == "success") {
            console.log(FgMagenta + '[WebLogs] ' + FgWhite +`I can get there in ${r.path.length} moves. Computation took ${r.time.toFixed(2)} ms (${nodesPerTick} nodes/tick).` + FgGreen +` ${r.status}` + FgWhite)
        }
        const path = [bot.entity.position.offset(0, 0.5, 0)]
        for (const node of r.path) {
          path.push({ x: node.x, y: node.y + 0.5, z: node.z })
        }
        bot.viewer.drawLine('path', path, 0xff0000)
      })
    
      const mcData = require('minecraft-data')(bot.version)
      const defaultMove = new Movements(bot, mcData)

      defaultMove.canDig = false // Disable breaking of blocks
      defaultMove.scafoldingBlocks.push(mcData.itemsByName['sandstone','wool'].id)
      
    
      bot.viewer.on('blockClicked', (block, face, button) => {
        //console.log(button)
        if (button !== 1) return
    
        const p = block.position.offset(0, 1, 0)

        bot.pathfinder.setMovements(defaultMove)
        bot.pathfinder.setGoal(new GoalBlock(p.x, p.y, p.z))
      })
  });


//▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
//      CHAT LOGS
//▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

bot.on('message', (message) => {
    chat = message.toString()
    console.log(FgCyan + '[Chat]' + FgWhite + " " + chat)
    const chatviewer = new ChatMessage(chat)
})

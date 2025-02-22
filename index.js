const { Client, intents, Collection, GatewayIntentBits, PermissionsBitfield, Partials, ActivityType, EmbedBuilder } = require("discord.js");
const colors = require("colors");
const prefix = '!';
const client = new Client({
    intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildModeration, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.GuildScheduledEvents, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent ],
    partials: [ Partials.Channel, Partials.GuildMember, Partials.GuildScheduledEvent, Partials.Message, Partials.Reaction, Partials.ThreadMember, Partials.User ],
    restTimeOffset: 0,
    failIfNotExists: false,
    presence: {
        activities: [{
            name: `Anetrix Support`,
            type: ActivityType.Streaming,
            url: "https://discord.gg/974cj5Aj56"
        }],
        status: "online"
    },
    allowedMentions: {
        parse: ["roles", "users", "everyone"],
        repliedUser: false
    }
});

const config = require('./settings/config');
client.login(config.token);

module.exports = client;

client.slashCommands = new Collection();

client.on("ready", async () => {

    require('./handler')(client);

    const readyEvent = require('./events/client/ready');
    await readyEvent.execute(client);
});

client.on('guildMemberAdd', async (member) => {
    try {
        const role = member.guild.roles.cache.find(r => r.name === "Member"); 
        if (role) {
            await member.roles.add(role);
            console.log(`Assigned the 'Member' role to ${member.user.tag}`);
        }

        const welcomeChannel = member.guild.channels.cache.get('1341886098120376412'); 
        if (welcomeChannel) {
            const embed = new EmbedBuilder()
                .setColor('#e60000')
                .setTitle('Welcome to Anetrix!')
                .setDescription(`Hello ${member.user.tag}, welcome to the server! We are excited to have you here! 🎉`)
                .setThumbnail(member.user.displayAvatarURL())
                .setFooter({ text: 'Enjoy your stay and explore our designs!' });

            await welcomeChannel.send({ embeds: [embed] });
        }
    } catch (error) {
        console.error(`Error handling new member:`, error);
    }
});

client.on('messageCreate', async message => {
    if (message.author.bot) return; 
 
    const prefixes = ["!", "/"]; 

    for (const prefix of prefixes) {
        if (message.content.startsWith(`${prefix}announcement `)) {
            const announcementText = message.content.slice(`${prefix}announcement `.length).trim();

            if (!announcementText) {
                return message.reply(`Please provide an announcement message after the command (using either '${prefixes.join("' or '")}')`);
            }

            const embed = new EmbedBuilder()
                .setColor('#e60000')
                .setTitle('Announcement')
                .setDescription(`**${announcementText}**`)
                .setTimestamp();

            try {
                await message.channel.send({ embeds: [embed] });
                message.delete();
            } catch (error) {
                console.error("Error sending announcement:", error);
                message.reply("There was an error sending the announcement.");
            }
            return;
        }
    }
});

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    const channelId = '1341855858489032745';
    const channel = client.channels.cache.get(channelId);

    if (!channel) {
        console.error('Channel not found.');
        return;
    }

    const embed = new EmbedBuilder()
        .setColor('#e60000')
        .setTitle('Anetrix Server Rules!')
        .setDescription(`
📜 **Anetrix** - Server Rules

Welcome to **Anetrix**! To keep this server safe and professional, please follow these rules:

1️⃣ **General Rules**

Respect others – No harassment, hate speech, or discrimination.
Keep it professional – No excessive swearing, spamming, or trolling.
English only – Please use English in public channels.

2️⃣ **Buying & Selling**

No chargebacks – All purchases are final unless stated otherwise.
Scamming is strictly prohibited – Any attempt to scam will result in a permanent ban.
Follow instructions – Read pricing and how-to-buy before asking questions.

3️⃣ **Security & Privacy**

No sharing personal information – Keep transactions private.
No advertising – Do not promote other servers or services without permission.
Report issues – If you see rule-breaking, report it to staff. 
        `);

    try {
        await channel.send({ embeds: [embed] });
        console.log('Rules message sent successfully!');
    } catch (error) {
        console.error('Error sending welcome message:', error);
    }
});

client.on('ready', async () => {

    const channelId = '1341855948330897412';
    const channel = client.channels.cache.get(channelId);

    if (!channel) {
        console.error('Channel not found.');
        return;
    }

    const embed = new EmbedBuilder()
        .setColor('#e60000')
        .setTitle('Anetrix Server - How To Buy!')
        .setDescription(`
:pushpin: How to Buy - **Anetrix | How To Buy**

Purchasing from **Anetrix | Network** is simple and secure. Follow these steps:

:one: ***Choose Your Product***

Browse available offers in #🏪・marketplace 
Check prices in #🏷・pricing 
Look out for special deals in #💰・vip-deals  (Only VIP)

:two: ***Place an Order***

Open a ticket in #🆘・support  or DM an authorized seller.
Provide the necessary details for your order.
Wait for confirmation before proceeding with payment.

:three: ***Make a Payment***

Accepted payment methods are listed in #🏦・payment-info 
Send the payment as instructed by staff.
Always request proof of payment confirmation.

:four: ***Receive Your Order***

Delivery time depends on the product/service.
Check #📦・delivery-status  for updates.
Once received, confirm and leave feedback in #⭐・reviews .
:bulb: Need help? Contact our support team anytime! :rocket:
        `);

    try {
        await channel.send({ embeds: [embed] });
        console.log('Payment info message sent successfully!');
    } catch (error) {
        console.error('Error sending welcome message:', error);
    }
});

client.on('ready', async () => {

    const channelId = '1341857044411584532';
    const channel = client.channels.cache.get(channelId);

    if (!channel) {
        console.error('Channel not found.');
        return;
    }

    const embed = new EmbedBuilder()
        .setColor('#e60000')
        .setTitle('Anetrix Server - Payment Info!')
        .setDescription(`
**:bank: Payment Information - Anetrix | Payment Info**

We offer secure and trusted payment methods to ensure a smooth transaction.  

### **Accepted Payment Methods**  

:white_check_mark: **[List your accepted payment options, e.g., PayPal,  Bank Transfer (Visa, MasterCard)]**  
:white_check_mark: **Ensure you send the correct amount to avoid delays**  

### **Important Notes**  

- :credit_card: **Payments must be sent first** before order processing.  
- :envelope_with_arrow: **Always confirm with staff** before making a payment.  
- :octagonal_sign: **No refunds or chargebacks** unless otherwise stated.  

Once payment is confirmed, your order will be processed as soon as possible. If you have any questions, open a ticket in #🆘・support . :rocket:
        `);

    try {
        await channel.send({ embeds: [embed] });
        console.log('Payment info message sent successfully!');
    } catch (error) {
        console.error('Error sending welcome message:', error);
    }
});

client.on('messageCreate', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'clear') {
        if (!message.member.permissions.has('MANAGE_MESSAGES')) {
            return message.reply('You do not have permission to delete messages!');
        }

        const amount = parseInt(args[0]);

        if (isNaN(amount)) {
            return message.reply('Please provide a valid number!');
        } else if (amount < 1 || amount > 100) {
            return message.reply('The number of messages must be between 1 and 100!');
        }

        try {
            await message.channel.bulkDelete(amount + 1);
            message.channel.send(`Successfully deleted ${amount} messages.`).then(msg => {
                setTimeout(() => msg.delete(), 5000);
            });
        } catch (error) {
            console.error(error);
            message.channel.send('An error occurred while deleting messages.');
        }
    }
});

client.on('messageCreate', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'send') {
        const content = args.join(' ');
        const [title, description] = content.split('|').map(part => part.trim());

        if (!title || !description) {
            return message.reply('Use: !send <1> | <2>');
        }

        const embed = new EmbedBuilder()
            .setTitle(title) 
            .setDescription(description) 
            .setColor('#e60000'); 

        try {
            await message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            message.channel.send('An error occurred while sending the embed message.');
        }
    }
});

client.on('messageCreate', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'review') {
        const rating = parseInt(args[0]);
        const review = args.slice(1).join(' ');

        if (isNaN(rating) || !review) {
            return message.reply('Please provide a rating (1-5) and a review.');
        }

        if (rating < 1 || rating > 5) {
            return message.reply('Please provide a rating between 1 and 5.');
        }

        const embed = new EmbedBuilder()
            .setTitle('New Review')
            .setAuthor({ name: message.author.username, iconURL: message.author.avatarURL() })
            .setDescription(review)
            .addFields( 
                { name: 'Rating', value: `${'⭐'.repeat(rating)} ${'☆'.repeat(5 - rating)}` }
            )
            .setColor(0xffd700) 
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    }
});

client.on('messageCreate', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'szivecske') {
        const content = args.join(' ');
        const embed = new EmbedBuilder()
            .setTitle('❤️') 
            .setDescription('❤️') 
            .setColor('#e60000'); 

        try {
            await message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            message.channel.send('An error occurred while sending the embed message.');
        }
    }
});


process.on("unhandledRejection", (error) => {
    if (error.code == 10062) return;

    console.log(`[ERROR] ${error}`.red);
})
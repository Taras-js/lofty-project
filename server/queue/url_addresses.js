const amqplib = require("amqplib");
const {start_puppeteer} = require("../puppeteer/index")

async function url_addresses() {
    const queue = 'url_queue';
    let conn = await amqplib.connect(process.env.URL_RMQ);
    const ch1 = await conn.createChannel();
    await ch1.assertQueue(queue, {durable: false});
    await ch1.consume(queue, (msg) => {
        if (msg !== null) {
            start_puppeteer(msg)
            ch1.ack(msg);
        } else {
            console.log('Consumer cancelled by url');
        }
    });
}

module.exports = {
    url_addresses: url_addresses
}

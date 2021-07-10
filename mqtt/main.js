var mqtt = require('mqtt')
var pool = require('../db')

var options = {
    host: '36b1f500f8044f659671f30a7ee1b89c.s2.eu.hivemq.cloud',
    port: 8883,
    protocol: 'mqtts',
    username: 'user2',
    password: 'JwLD9Cxu8e'
}

//initialize the MQTT client
var client = mqtt.connect(options);

//setup the callbacks
client.on('connect', function () {
    console.log('Connected');
});

client.on('error', function (error) {
    console.log(error);
});

client.on('message', async function (topic, message) {
    //Called each time a message is received

    try {
        console.log('Received message:', topic, message.toString());
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *",
            [message.toString()]
        );
        console.log('Message was saved:', JSON.stringify(newTodo.rows[0]));      
      } catch (error) {
        console.error(error);
        res.send(error);
      }

    
});

// subscribe to topic 'my/test/topic'
client.subscribe('my/test/topic');

// publish message 'Hello' to topic 'my/test/topic'
client.publish('my/test/topic', 'Hello');

module.exports = client;
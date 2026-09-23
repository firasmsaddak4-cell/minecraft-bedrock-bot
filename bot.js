const bedrock = require('bedrock-protocol');

function start() {
  const client = bedrock.createClient({
    host: 'ssafe77.aternos.me',
    port: 54809,
    username: 'safe7bot',
    offline: true,
    skipPing: true,
  });

  client.on('spawn', () => console.log('safe7bot joined'));
  client.on('close', () => {
    console.log('Disconnected, retry in 15s');
    setTimeout(start, 15000);
  });
  client.on('error', (e) => console.log('Error:', e.message));
}

start();

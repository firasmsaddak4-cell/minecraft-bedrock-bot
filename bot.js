const bedrock = require('bedrock-protocol');

function start() {
  const client = bedrock.createClient({
  host: 'ssafe77.aternos.me',
  port: 54809,
  username: 'safe7bot',
  offline: true,
  skipPing: true,
  version: '1.21.130',
});

  client.on('disconnect', (p) => console.log('DISCONNECT:', JSON.stringify(p)));
  client.on('kick', (p) => console.log('KICK:', JSON.stringify(p)));
  client.on('spawn', () => console.log('safe7bot joined'));
  client.on('close', () => {
    console.log('Closed, retry in 15s');
    setTimeout(start, 15000);
  });
  client.on('error', (e) => console.log('Error:', e.message));
}

start();

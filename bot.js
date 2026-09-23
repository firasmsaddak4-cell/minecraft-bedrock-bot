const bedrock = require('bedrock-protocol');

function start() {
  const client = bedrock.createClient({
    host: 'ssafe77.aternos.me',
    port: 54809,
    username: 'safe77bot',
    offline: true,
    skipPing: true,
    version: '1.21.130', // اتركه كما نجح معك
  });

  let pos = { x: 0, y: 0, z: 0 };
  let tick = 0n;
  let timer = null;
  let alive = true;

  const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

  function sendInput(jump) {
    try {
      tick += 1n;
      client.queue('player_auth_input', {
        pitch: 0,
        yaw: 0,
        position: pos,
        move_vector: { x: 0, z: 0 },
        head_yaw: 0,
        input_data: { jump_down: jump, jumping: jump, start_jumping: jump },
        input_mode: 'mouse',
        play_mode: 'screen',
        interaction_model: 'classic',
        interact_rotation: { x: 0, z: 0 },
        tick,
        delta: { x: 0, y: 0, z: 0 },
        analogue_move_vector: { x: 0, z: 0 },
        camera_orientation: { x: 0, y: 0, z: 0 },
        raw_move_vector: { x: 0, z: 0 },
      });
    } catch (e) {
      console.log('Input error:', e.message);
    }
  }

  function scheduleJump() {
    if (!alive) return;
    timer = setTimeout(() => {
      sendInput(true);
      setTimeout(() => sendInput(false), 300);
      console.log('Jump');
      scheduleJump();
    }, rand(20, 90) * 1000);
  }

  client.on('start_game', (p) => { pos = p.player_position; });
  client.on('spawn', () => {
    console.log('safe7bot joined');
    scheduleJump();
  });
  client.on('disconnect', (p) => console.log('DISCONNECT:', JSON.stringify(p)));
  client.on('close', () => {
    alive = false;
    clearTimeout(timer);
    console.log('Closed, retry in 60s');
    setTimeout(start, 60000);
  });
  client.on('error', (e) => console.log('Error:', e.message));
}

start();

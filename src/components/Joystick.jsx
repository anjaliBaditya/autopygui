import React, { useEffect } from 'react';
import { Nipple } from 'react-nipple';
import 'react-nipple/lib/styles.css';

const Joystick = () => {
  useEffect(() => {
    const ws = new WebSocket("/ws");

    const handleMove = (prefix) => (evt, data) => {
      const angle = data.angle?.degree ?? -1; // Use -1 if angle is undefined
      console.log(`${prefix} moved. Angle: ${angle}`);
      ws.send(`${prefix}_${angle}`);
    };

    const handleEnd = (prefix) => () => {
      console.log(`${prefix} released!`);
      ws.send(`${prefix}_-1`);
    };

    return () => {
      ws.close();
    };
  }, []);

  const containerStyle = {
    width: '200px',
    height: '200px',
    backgroundColor: '#732a2a',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '100vh', margin: 0, backgroundColor: 'black' }}>
      <div style={containerStyle}>
        <Nipple
          options={{
            mode: 'static',
            position: { left: '50%', top: '50%' },
            lockY: true,
            color: 'white'
          }}
          onMove={handleMove('speed')}
          onEnd={handleEnd('speed')}
        />
      </div>
      <div style={containerStyle}>
        <Nipple
          options={{
            mode: 'static',
            position: { left: '50%', top: '50%' },
            lockX: true,
            color: 'white'
          }}
          onMove={handleMove('direction')}
          onEnd={handleEnd('direction')}
        />
      </div>
    </div>
  );
};

export default Joystick;
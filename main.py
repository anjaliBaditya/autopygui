from fastapi import FastAPI, WebSocket
from fastapi.staticfiles import StaticFiles

import pyautogui

app = FastAPI()

angles = {
    0: 'right',
    90: 'up',
    180: 'left',
    270: 'down',
    -1: None
}

speed = None
direction = None

def press_speed(angle, amount):
    global speed
    if angle == None or amount <= 20:
        if speed is not None:
            pyautogui.keyUp(speed)
            speed = None
    elif angle != speed and speed is not None:
        pyautogui.keyUp(speed)
        pyautogui.keyDown(angle)
        speed = angle
    elif speed is None:
        pyautogui.keyDown(angle)
        speed = angle

def press_direction(angle, amount):
    global direction
    if angle == None or amount <= 20:
        if direction is not None:
            pyautogui.keyUp(direction)
            direction = None
    elif angle != direction and direction is not None:
        pyautogui.keyUp(direction)
        pyautogui.keyDown(angle)
        direction = angle
    elif direction is None:
        pyautogui.keyDown(angle)
        direction = angle


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        try:
            data = await websocket.receive_text()
            control, angle_str, amount_str = data.split('_')
            
            if angle_str.lower() == 'undefined':
                angle = None
            else:
                angle = angles.get(int(float(angle_str)), None)
            
            amount = 0 if amount_str.lower() == 'undefined' else float(amount_str)
            
            print(control, angle, amount)
            
            if control == 'speed':
                press_speed(angle, amount)
            elif control == 'direction':
                press_direction(angle, amount)
        except ValueError as e:
            print(f"Error processing data: {e}")
        except Exception as e:
            print(f"Unexpected error: {e}")


app.mount("/", StaticFiles(directory="dist",html = True), name="static")

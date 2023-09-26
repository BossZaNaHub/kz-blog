const speed = 6;
const gravity = 9.81;
const scale = 3;
const maxWidth = 5024;
const width = 800;
const height = 600;

const calculateJumpGravity = () => {};

const randomNumberBetween = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

let ControlKey = Phaser.Input.Keyboard.KeyCodes;

export { scale, maxWidth, width, height, speed, gravity, calculateJumpGravity, randomNumberBetween, ControlKey };

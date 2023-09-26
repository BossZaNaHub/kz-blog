const fadeIn = (text: Phaser.GameObjects.Text) => {
  return {
    targets: text,
    alpha: 1,
    durartion: 1000,
    ease: "Linear",
  };
};

const fadeOut = (text: Phaser.GameObjects.Text) => {
  return {
    targets: text,
    alpha: 0,
    durartion: 1000,
    ease: "Linear",
  };
};

export { fadeIn, fadeOut };

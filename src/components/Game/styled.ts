const paddingStyle: Phaser.Types.GameObjects.Text.TextPadding = { top: 10, left: 10, right: 10, bottom: 10 };

const darkTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
  backgroundColor: "#1d293b",
  color: "#ffffff",
  baselineY: 10,
  baselineX: 10,
  padding: paddingStyle,
  align: "center",
};

const lightTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
  backgroundColor: "#ffffff",
  color: "#1d293b",
  baselineY: 10,
  baselineX: 10,
  align: "center",
  padding: paddingStyle,
};

const lightBoardStyle: Phaser.Types.GameObjects.Text.TextStyle = {
  backgroundColor: "#ffffff",
  color: "#1d293b",
  fixedHeight: 100,
  fixedWidth: 350,
  padding: paddingStyle,
};

const darkBoardStyle: Phaser.Types.GameObjects.Text.TextStyle = {
  backgroundColor: "#1d293b",
  color: "#ffffff",
  fixedHeight: 100,
  fixedWidth: 350,
  padding: paddingStyle,
};

const shibaLightBoardStyle: Phaser.Types.GameObjects.Text.TextStyle = {
  backgroundColor: "#ffffff",
  color: "#1d293b",
  fixedHeight: 50,
  fixedWidth: 350,
  padding: paddingStyle,
};

const shibaDarkBoardStyle: Phaser.Types.GameObjects.Text.TextStyle = {
  backgroundColor: "#1d293b",
  color: "#ffffff",
  fixedHeight: 50,
  fixedWidth: 350,
  padding: paddingStyle,
};

export { darkTextStyle, lightTextStyle, lightBoardStyle, darkBoardStyle, shibaLightBoardStyle, shibaDarkBoardStyle };

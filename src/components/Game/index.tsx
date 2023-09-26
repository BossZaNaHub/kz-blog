"use client";
import Phaser from "phaser";
import { FC, useEffect, useState, HTMLAttributes } from "react";
import { ControlKey, gravity, height, maxWidth, randomNumberBetween, scale, speed, width } from "./utils";
import {
  darkBoardStyle,
  darkTextStyle,
  lightBoardStyle,
  lightTextStyle,
  shibaDarkBoardStyle,
  shibaLightBoardStyle,
} from "./styled";
import { fadeIn, fadeOut } from "./animation";
import { useDetectDevice } from "@/hooks/useDetectDevice";

let character: Phaser.Physics.Arcade.Sprite;
let characterDirection: "left" | "right" = "right";
let characterVelocityX = 0;
let characterVelocityY = 0;
let ground: Phaser.Physics.Arcade.StaticGroup;

let joystickBase: Phaser.GameObjects.Graphics;
let joystickHandle: Phaser.GameObjects.Graphics;
let joystickActive: boolean = false;

let background: Phaser.GameObjects.Image;
let nextBackground: Phaser.GameObjects.Image;
let signObj: Phaser.GameObjects.Image;
let uTurnObj: Phaser.GameObjects.Image;
let bushObj: Phaser.GameObjects.Image;
let shibaObj: Phaser.GameObjects.Image;

let titleText: Phaser.GameObjects.Text;
let interactText: Phaser.GameObjects.Text;
let messageText: Phaser.GameObjects.Text;
let uTurnText: Phaser.GameObjects.Text;
let shibaText: Phaser.GameObjects.Text;

let isJump: boolean = false;
let stopAllMovement: boolean = false;

let playerWidth: number = 0;
let playerHeight: number = 0;
let playerDevice: "mobile" | "website" = "mobile";

let _widthTile: number = 128;
let _heightTile: number = 128;
let titleTextTrigger: boolean = false;

type GameProps = HTMLAttributes<HTMLDivElement>;

/* Key Animation */
const keyCharacterAnimRight = "characterAnimationRight";
const keyCharacterAnimLeft = "characterAnimationLeft";

const Game: FC<GameProps> = (props) => {
  const [theme, setTheme] = useState(window.localStorage.getItem("theme"));
  const { isMobile } = useDetectDevice();
  useEffect(() => {
    playerWidth = window.innerWidth;
    playerHeight = window.innerHeight;
    playerDevice = isMobile ? "mobile" : "website";
    console.log(playerDevice);
    const config: Phaser.Types.Core.GameConfig = {
      width: window.innerWidth,
      height: window.innerHeight,
      type: Phaser.AUTO,
      parent: "game-container",
      antialias: true,
      scene: {
        preload,
        create,
        update,
      },
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 600 }, // Set the gravity in the y-direction (adjust as needed)
          debug: true, // Set to true to see physics debug information
        },
      },
    };

    const game = new Phaser.Game(config);

    function preload(this: Phaser.Scene) {
      this.load.image("cf1", "game/characters/frame1.png");
      this.load.image("cf2", "game/characters/frame2.png");
      this.load.image("cf3", "game/characters/frame3.png");
      this.load.image("cf4", "game/characters/frame4.png");
      this.load.image("sb1", "game/characters/shiba.png");

      this.load.image("daylight-background", "game/background/daylight-background.png");
      this.load.image("midnight-background", "game/background/midnight-background.png");

      this.load.image("tile_2", "game/tiles/2.png");
      this.load.image("tile_dirt", "game/tiles/9.png");
      this.load.image("tile_water", "game/tiles/17.png");
      this.load.image("tile_deep_water", "game/tiles/18.png");

      this.load.image("sign", "game/objects/Sign_1.png");
      this.load.image("sign_2", "game/objects/Sign_2.png");
      this.load.image("tile_bush", "game/objects/Bush_4.png");
    }

    function create(this: Phaser.Scene) {
      /* Background Setting */
      if (theme === "light") {
        background = this.add.image(0, 0, "daylight-background").setOrigin(0.1, 0.1);
        // nextBackground = this.add.image(background.width, 0, "daylight-background").setOrigin(0.1, 0.1);
      } else {
        background = this.add.image(0, 0, "midnight-background").setOrigin(0.1, 0.1);
        // nextBackground = this.add.image(background.width, 0, "midnight-background").setOrigin(0.1, 0.1);
      }

      /* Character */
      const characterPos = { x: 32, y: height - _heightTile };
      character = this.physics.add.sprite(0, 0, "cf1");
      character.setScale(4, 4);
      character.setOrigin(0.5, 0.5);
      character.setPosition(characterPos.x, characterPos.y);
      character.setDepth(10);

      /* Create block */
      const maxScene = Math.round(maxWidth / background.width);
      for (let i = 1; i <= maxScene; i++) {
        this.add
          .image(i * background.width, 0, theme === "light" ? "daylight-background" : "midnight-background")
          .setOrigin(0.1, 0.1);
      }

      /* Create joystick for Mobile/Tablet device */
      if (playerDevice === "mobile") {
      } else {
        joystickBase = this.add.graphics();
        joystickBase.fillStyle(0x666666, 0.5);
        joystickBase.fillCircle(100, 450, 60);

        joystickHandle = this.add.graphics();
        joystickHandle.fillStyle(0x666666, 1);
        joystickHandle.fillCircle(100, 450, 40);
        // joystickHandle.setInteractive(new Phaser.Geom.Circle());
        joystickHandle.setInteractive(new Phaser.Geom.Circle(100, 450, 40), Phaser.Geom.Circle.Contains);

        this.input.on("pointerdown", handleJoystickStart, this);
        this.input.on("pointermove", handleJoystickControl, this);
        this.input.on("pointerup", handleJoystickEnd, this);
      }

      const blocks = Math.ceil(maxWidth / _widthTile);
      ground = this.physics.add.staticGroup();
      for (let i = 0; i <= blocks + 1; i++) {
        ground
          .create(i * _widthTile, height, "tile_2")
          .setScale(1, 1)
          .refreshBody();
      }

      /* Start step to 2nd floor block */
      ground
        .create(2048, height / 2 + _heightTile + 16, "tile_2")
        .setScale(1, 1)
        .refreshBody();
      for (let i = 1; i <= blocks / 2; i++) {
        if (i <= 5) {
          ground.create(i * _widthTile + 2048, height / 2 + _heightTile / 2, "tile_2");
        } else if (i == 5 || i == blocks / 2) {
          // ground.create(i * _widthTile + 2048, height / 2 + _heightTile / 1.95, "tile_deep_water");
          // ground.create(i * _widthTile + 2048, height / 2 + _heightTile, "tile_dirt");
        } else if (i > 4 || i < 10) {
          ground.create(i * _widthTile + 2048, height / 2 + _heightTile / 1.5, "tile_deep_water");
          ground.create(i * _widthTile + 2048, height / 2 + _heightTile, "tile_dirt");
          ground
            .create(i * (_widthTile / 2) + 2048, height / 3.7, "tile_2")
            .setScale(0.5, 0.5)
            .refreshBody();
        }
      }

      /* Setting Villege */

      /* Camera setting */
      this.cameras.main.setBounds(0, 0, maxWidth, height);
      this.physics.world.setBounds(0, 0, maxWidth, height);
      this.cameras.main.startFollow(character, true, 0.1, 0.1);

      /* Character Phycis */
      this.physics.world.enable(character);
      character.setBounce(0.1);
      character.setCollideWorldBounds(true);

      /* Character Anim */
      this.anims.create({
        key: keyCharacterAnimRight,
        frames: [{ key: "cf1" }, { key: "cf2" }],
        frameRate: 6, // Frames per second
        repeat: -1, // -1 = loop indefinitely
      });
      this.anims.create({
        key: keyCharacterAnimLeft,
        frames: [{ key: "cf3" }, { key: "cf4" }],
        frameRate: 6, // Frames per second
        repeat: -1, // -1 = loop indefinitely
      });
      /* Character Anim */
      character.anims.play(keyCharacterAnimRight, true);
      this.physics.add.collider(character, ground);

      /* Add Object Game */
      const _groundHeight = height - _heightTile + 32;
      const _groundBushHeight = height - _heightTile + 48;

      titleText = this.add.text(
        width - background.width / 2,
        height / 4,
        "PROLOGUE \n" + "KuroshibaZ World's",
        theme === "light" ? lightTextStyle : darkTextStyle
      );
      titleText.setAlpha(0);

      signObj = this.add.image(1024, _groundHeight, "sign").setOrigin(0.5, 0.5);
      uTurnObj = this.add
        .image(maxWidth - 100, _groundHeight, "sign_2")
        .setFlipX(true)
        .setOrigin(0.5, 0.5);
      //2048 - 2819 spawn bush

      const _ranBush = randomNumberBetween(2048, 2819);
      bushObj = this.add.image(_ranBush, _groundBushHeight, "tile_bush").setScale(1, 1);

      const _ranShiba = randomNumberBetween(2400, 2819);
      shibaObj = this.add.image(_ranShiba, height, "sb1").setScale(0.15, 0.15).setFlipX(true);
      shibaObj.setPosition(_ranShiba, height / 5.5);

      interactText = this.add.text(
        signObj.x - 25,
        character.y - 25,
        "READ...? <E>",
        theme === "light" ? lightTextStyle : darkTextStyle
      );

      uTurnText = this.add.text(
        uTurnObj.x - 250,
        character.y - 25,
        "Turn back nothing special",
        theme === "light" ? lightTextStyle : darkTextStyle
      );

      messageText = this.add.text(
        signObj.x - 50,
        height / 2,
        "Welcome to kuroshiba Farm, \n" +
          "I try to writing my blog website... \n" +
          "if you like it. Notihng to say just \n" +
          "`Thank you` Enjoy. <Enter, ESC>",
        theme === "light" ? lightBoardStyle : darkBoardStyle
      );

      shibaText = this.add.text(
        shibaObj.x + 35,
        height / 4.35 - 70,
        "Hello. Let's inspect bush below. \n" + "Might something inside.",
        theme === "light" ? shibaLightBoardStyle : shibaDarkBoardStyle
      );
    }

    function update(this: Phaser.Scene) {
      /* Control Character */
      const cursors = this.input.keyboard?.createCursorKeys();
      const eKey = this.input.keyboard?.addKey(ControlKey.E);
      const escKey = this.input.keyboard?.addKey(ControlKey.ESC);
      const enterKey = this.input.keyboard?.addKey(ControlKey.ENTER);

      const leftKey = this.input.keyboard?.addKey(ControlKey.A);
      const rightKey = this.input.keyboard?.addKey(ControlKey.D);
      const forwardKey = this.input.keyboard?.addKey(ControlKey.W);

      if (stopAllMovement) {
      } else {
        //Direction
        if (characterDirection == "left") {
          character.anims.play(keyCharacterAnimLeft, true);
          // character.anims.play(keyCharacterAnimRight, false);
        } else {
          character.anims.play(keyCharacterAnimRight, true);
          // character.anims.play(keyCharacterAnimLeft, false);
        }

        if (cursors?.left.isDown || leftKey?.isDown) {
          characterDirection = "left";
          character.setVelocityX(-speed * 65); // Move left
        } else if (cursors?.right.isDown || rightKey?.isDown) {
          characterDirection = "right";
          character.setVelocityX(speed * 65); // Move right
        } else {
          character.setVelocityX(0); // Stop movement if no input
        }

        //Running
        if (cursors?.shift.isDown && (leftKey?.isDown || cursors?.left.isDown)) {
          characterDirection = "left";
          character.setVelocityX(-speed * 65 * 2); // Move left
        } else if (cursors?.shift.isDown && (rightKey?.isDown || cursors?.right.isDown)) {
          characterDirection = "right";
          character.setVelocityX(speed * 65 * 2); // Move right
        }

        // Jumping
        if ((cursors?.space.isDown || forwardKey?.isDown) && !isJump) {
          isJump = true;
          character.setVelocityY(-45 * gravity); // Apply vertical velocity for the jump
        }
        // Detect touch a ground
        if (character.body?.touching.down) {
          isJump = false;
        }

        if (playerDevice === "mobile") {
          character.x += characterVelocityX;
          character.y += characterVelocityY;
        }
      }

      /* Interact Message */
      if (Phaser.Math.Distance.Between(character.x, character.y, signObj.x, signObj.y) <= 60) {
        interactText.setVisible(true);
        if (eKey?.isDown) {
          stopAllMovement = true;
          messageText.setVisible(true);
        }

        if (escKey?.isDown || enterKey?.isDown) {
          stopAllMovement = false;
          messageText.setVisible(false);
        }
      } else {
        interactText.setVisible(false);
        messageText.setVisible(false);
      }
      /* Interact Message */

      /* Interact Item Object  */
      if (Phaser.Math.Distance.Between(character.x, character.y, shibaObj.x, shibaObj.y) <= 60) {
        shibaText.setVisible(true);
      } else {
        shibaText.setVisible(false);
      }
      /* Interact Item Object  */

      if (Phaser.Math.Distance.Between(character.x, character.y, uTurnObj.x, uTurnObj.y) <= 60) {
        uTurnText.setVisible(true);
      } else {
        uTurnText.setVisible(false);
      }

      this.cameras.main.centerOn(character.x, character.y);
      /* Control Character */

      /* Control Scene */

      // Control Prologue
      if (character.x >= background.width / 2 && !titleTextTrigger) {
        this.tweens.add(fadeIn(titleText));
        titleTextTrigger = true;
        setTimeout(() => {
          this.tweens.add(fadeOut(titleText));
        }, 4000);
      }
      titleText.setPosition(character.x, height / 4);
      /* Control Scene */
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        character.x -= speed;
      } else if (event.key === "ArrowRight") {
        character.x += speed;
      }

      if (event.key === "Space") {
        character.y;
      }
      // if (event.key === "ArrowUp") {
      //   character.y -= speed;
      // } else if (event.key === "ArrowDown") {
      //   character.y += speed;
      // }
    };

    const handleJoystickStart = (pointer: Phaser.Input.Pointer) => {
      console.log("handleJoystickStart: ", pointer.x, pointer.y, joystickBase.x, joystickBase.y, joystickActive);
      if (Phaser.Math.Distance.Between(pointer.x, pointer.y, joystickBase.x, joystickBase.y) <= 60) {
        joystickActive = true;
      }
    };

    const handleJoystickControl = (pointer: Phaser.Input.Pointer) => {
      console.log("handleJoystickControl: ", pointer.x, pointer.y, joystickActive);
      if (joystickActive) {
        const angle = Phaser.Math.Angle.Between(joystickBase.x, joystickBase.y, pointer.x, pointer.y);
        const distance = Phaser.Math.Distance.Between(joystickBase.x, joystickBase.y, pointer.x, pointer.y);
        const maxDistance = 60;

        if (distance > maxDistance) {
          joystickHandle.x = joystickBase.x + maxDistance * Math.cos(angle);
          joystickHandle.y = joystickBase.y + maxDistance * Math.sin(angle);
        } else {
          joystickHandle.x = pointer.x;
          joystickHandle.y = pointer.y;
        }

        updateCharacterMovement(angle, distance / maxDistance);
      }
    };

    const handleJoystickEnd = () => {
      if (joystickActive) {
        joystickHandle.x = joystickBase.x;
        joystickHandle.y = joystickBase.y;
        joystickActive = false;

        updateCharacterMovement(0, 0);
      }
    };

    const updateCharacterMovement = (angle: number, speed: number) => {
      characterVelocityX = Math.cos(angle) * speed;
      characterVelocityY = Math.sin(angle) * speed;
    };

    const onWorldBounds = (body: Phaser.Physics.Arcade.Body) => {
      // Check if the character is on the ground (bottom of the screen)
      if (body.blocked.down) {
        // The character is on the ground
        console.log("Character is on the ground.");
      }
    };

    const handleWindowResize = () => {
      playerWidth = window.innerWidth;
      playerHeight = window.innerHeight;
      game.scale.resize(playerWidth, playerHeight);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
      // game.destroy();
    };
  }, []);

  return (
    <div {...props}>
      <div id="game-container"></div>
    </div>
  );
};

export default Game;

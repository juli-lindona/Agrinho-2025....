function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
let player;

let items = [];

let score = 0;

let level = 1;

let nextLevelScore = 10;

let itemSpeed = 3;

let itemCount = 5;

let gameFont;

let gameStarted = false;

function preload() {

  gameFont = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Bold.otf');

}

function setup() {

  createCanvas(800, 600);

  player = new Player();

  initItems(itemCount);

  textFont(gameFont);

}

function draw() {

  if (!gameStarted) {

    drawStartScreen();

    return;

  }

  setBackgroundByLevel(level);

  drawFestivalDecor();

  

  player.move();

  player.display();

  for (let item of items) {

    item.fall();

    item.display();

    if (player.collect(item)) {

      item.reset();

      score++;

      checkLevelUp();

    }

  }

  // Placar

  fill(0);

  textSize(24);

  text("Conexões feitas: " + score, 10, 30);

  text("Fase: " + level, 10, 60);

}

function keyPressed() {

  if (!gameStarted) {

    gameStarted = true;

  }

}

function drawStartScreen() {

  background(255, 230, 200);

  fill(0);

  textAlign(CENTER, CENTER);

  textSize(36);

  text("celebrando as conexões!!", width / 2, 100);

  

  textSize(20);

  text("Como Jogar:", width / 2, 180);

  textSize(16);

  text("← →  Mova o personagem com as setas", width / 2, 220);

  text(" Pegue os itens que caem: milho, livros, queijo, celular...", width / 2, 250);

  text("Faça conexões entre o campo e a cidade", width / 2, 280);

  text(" A cada 10 itens, você sobe de fase e tudo fica mais rápido", width / 2, 310);

  textSize(20);

  text ( "Pressione qualquer tecla para começar" , largura  /  2 , 400 );

}

function checkLevelUp() {

  if (score >= nextLevelScore) {

    level++;

    nextLevelScore += 10;

    itemSpeed += 0.5;

    itemCount++;

    initItems(itemCount);

  }

}

function initItems(n) {

  items = [];

  for (let i = 0; i < n; i++) {

    items.push(new Item());

  }

}

function setBackgroundByLevel(lv) {

  let colors = [

    color(200, 240, 200),

    color(220, 220, 255),

    color(255, 230, 200),

    color(240, 200, 240),

    color(220, 255, 200)

  ];

  background(colors[(lv - 1) % colors.length]);

}

function drawFestivalDecor() {

  for (let i = 0; i < width; i += 40) {

    let colorFlag = color(random(255), random(255), random(255));

    fill(colorFlag);

    triangle(i, 0, i + 20, 30, i + 40, 0);

  }

  fill(255, 200, 200);

  rect(100, height - 100, 150, 100);

  rect(width - 250, height - 100, 150, 100);

  fill(0);

  textSize(16);

  text("Barraca do Campo", 110, height - 110);

  text("Barraca da Cidade", width - 240, height - 110);

}

class Player {

  constructor() {

    this.x = width / 2;

    this.y = height - 60;

    this.size = 40;

  }

  move() {

    if (keyIsDown(LEFT_ARROW)) this.x -= 5;

    if (keyIsDown(RIGHT_ARROW)) this.x += 5;

    this.x = constrain(this.x, 0, width - this.size);

  }

  display() {

    fill(0, 100, 200);

    rect(this.x, this.y, this.size, this.size);

    fill(255, 255, 0);

    textSize(12);

    text("Você", this.x + 5, this.y - 5);

  }

  collect(item) {

    return collideRectRect(this.x, this.y, this.size, this.size,

                           item.x, item.y, item.size, item.size);

  }

}

class Item {

  constructor() {

    this.reset();

  }

  reset() {

    this.x = random(width);

    this.y = random(-100, -40);

    this.size = 30;

    this.type = random(["milho", "livro", "queijo", "celular"]);

  }

  fall() {

    this.y += itemSpeed;

    if (this.y > height) this.reset();

  }

  display() {

    fill(255);

    rect(this.x, this.y, this.size, this.size);

    fill(0);

    textSize(10);

    text(this.type, this.x + 2, this.y + 18);

  }

}
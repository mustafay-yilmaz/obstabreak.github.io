const c = document.getElementById("canvas");
const ctx = c.getContext("2d");

c.width = 800;
c.height = 500;

let gameFrame = 0;
let gameSpeed = 5;
let score = 0;
let lastTime = 0;
let bulletFinishTime = -1;

var savedMusicLevel = getCookie("musicLevel");
var savedLanguage = getCookie("language");
var language = "English";
var text1 = "TIME : ";
var text2 = "RELOADING..";
// Sayfa yüklendiğinde çalışacak olan kod
window.onload = function() {
  // Eğer musicLevel null değilse
  if (savedMusicLevel != null) {
    // volumeSlider'ın value değerini musicLevel olarak ayarla
    document.getElementById('volumeSlider').value = savedMusicLevel;
    if(savedMusicLevel==0){
    pauseMusic();
    musicOnIcon.style.display = "inline-block";
    musicOffIcon.style.display = "none";
    musicStatusSelect.value="off";
    }
    else {
    startMusic();
    musicOnIcon.style.display = "none";
      musicOffIcon.style.display = "inline-block";
      musicStatusSelect.value="on";
    }
  }

  if(savedLanguage !=null){
    translateTexts(savedLanguage);
    language=savedLanguage;
  }else{
    setCookie("language", language, 365);
    translateTexts("English");
  }

  if(language=="Türkçe")
  toggleLanguage("English");
  else{
    toggleLanguage("Türkçe");
  }


};

function toggleLanguage(language) {
  if (language === 'English') {
    translateTexts("Türkçe");
    document.getElementById('english-flag').style.display = 'none';
    document.getElementById('turkish-flag').style.display = 'block';
  } else if (language === 'Türkçe') {
    translateTexts("English");
    document.getElementById('english-flag').style.display = 'block';
    document.getElementById('turkish-flag').style.display = 'none';
    
  }
  editText();
}


function editText(){
  document.getElementById("start").textContent=start;
  document.getElementById("htp").textContent=htp;
  document.getElementById("htp*").textContent=htp;
  document.getElementById("msettings").textContent=msettings;
  document.getElementById("msettings*").textContent=msettings;
  document.getElementById("htp1").textContent=htp1;
  document.getElementById("htp2").textContent=htp2;
  document.getElementById("htp3").textContent=htp3;
  document.getElementById("htp4").textContent=htp4;
  document.getElementById("mn").textContent=mn;
  document.getElementById("mn*").textContent=mn;
  document.getElementById("mn**").textContent=mn;
  document.getElementById("music").textContent=music;
  document.getElementById("op1").textContent=op1;
  document.getElementById("op2").textContent=op2;
  document.getElementById("vol").textContent=vol;
}

function translateTexts(currentLanguage) {
  if (currentLanguage === "English") {
    start = "Start Game";
    htp = "How To Play";
    msettings = "Music Settings";
    htp1 = "Greetings to our fearless hero embarking on an adventure alone. Our hero tries to overcome the obstacles by utilizing their agility or by smashing through them with his powerful weapon. Thanks to his special suit, he can reverse gravity" 
    +"and navigate the cave's ceiling as if walking on a flat path. Assist our hero in overcoming the obstacles and collecting the diamonds.";
    htp2 = "You don't need to press any key to control our fearless hero. When gravity is greater than zero, you can use the up arrow key or the spacebar to jump over obstacles, collect diamonds, and, if you're lucky, gather health pickups to restore your health. When you press the up arrow key twice, the special power of the suit will activate, and gravity will go below zero. While our hero is on the ceiling of the cave," 
    +"you can use the down arrow key and the spacebar to jump over obstacles. To descend again, simply press the down arrow key twice.";
    htp3= "Thanks to the magnificent weapon in their hand, our hero can collect diamonds by smashing the blue-colored obstacles, but be careful not to attempt breaking the black-colored obstacles! Additionally, using their weapon, our hero can shoot and collect randomly appearing diamonds or health pickups. However, remember that you can only load 20 bullets into the weapon. Once the bullets are depleted," 
    +"there is a reloading time for our hero's weapon. During the game, you can see the necessary information on the top right corner.";
    htp4= "Come on, what are you waiting for? Our hero needs you!";
    mn="Main Menu";
    music="Music:";
    op1="Off";
    op2="On";
    vol = "Volume";
    d1="Game Over!";
    d2="Elapsed Time:";
    d3="Collected Diamonds:";
    d4="Your Best Score:";
    text1 = "TIME : ";
    text2 = "RELOADING..";
  } else if (currentLanguage === "Türkçe") {
    start = "Oyunu Başlat";
    htp = "Nasıl Oynanır?";
    msettings = "Müzik Ayarları";
    htp1 = "Tek başına maceraya atılan korkusuz kahramanımıza bir selam verin. Kahramanımız önüne çıkan engelleri çevikliği sayesinde"+ 
    "veya elindeki güçlü silahıyla engelleri yıkarak atlatmaya çalışıyor. Kahramanımızın sahip olduğu özel elbise sayesinde yerçekimini tersine çevirerek" 
    +"mağaranın tavanını düz bir yol yürürmüşçesine kullanabiliyor."+ "Kahramanımıza engelleri aşmasında ve elmasları toplamasında yardımcı ol.";
    htp2 = "Korkusuz kahramanımızı yürütmek için herhangi bir tuşa basmanıza gerek yok. Yer çekimi sıfırdan büyükken, yukarı yön tuşu veya boşluk tuşu sayesinde engellerden atlayabilir, elmasları ve şanslıysan sağlığını doldurmak için can toplayabilirsin. İki kere yukarı yön tuşuna bastığınızda ise elbisenin özel gücü aktifleşecek ve yer çekimi sıfırın altına inecektir. Kahramanımız mağaranın tavanındayken, engellerden atlamak" 
    +"için aşağı yön tuşu ve boşluk tuşu kullanabilirsin. Tekrar aşağıya inmek için ise aşağı yön tuşuna iki kere basman yeterli.";
    htp3= "Elindeki muhteşem silahı sayesinde kahramanımız, mavi renkte olan engelleri kırarak elmas toplayabilir ancak siyah renkteki engeller kırılmazdır. Sakın onları kırmayı deneme! Ayrıca kahramanımızın silahı sayesinde rastgele çıkan elmasları veya canları vurarak onları toplayabilirsin. Ancak sakın unutma silahına sadece 20 mermi doldurabiliyorsun. Mermin bittiğinde ise" 
    +"kahramanımızın silahı doldurma süresi var. Oyun sırasında sana gerekli olan bilgileri sağ yukardan görebilirsin.";
    htp4= "Hadi ne duruyorsun, kahramanımızın sana ihtiyacı var!";
    mn="Ana Menü";
    music="Müzik:";
    op1="Kapalı";
    op2="Açık";
    vol = "Ses Seviyesi";
    d1="Oyun Bitti!";
    d2="Geçen Süre:";
    d3="Toplanılan Elmas:";
    d4="En İyi Skorun:";
    text1 = "SÜRE : ";
    text2 = "YÜKLENİYOR..";
  }
}
function updateScore() {
  // Skorun güncellendiği fonksiyon
  img = new Image();
  img.src = "assets/sprite/bar/diamond/score.png";
  ctx.drawImage(img, c.width - 106, 80, 30, 30);
  ctx.font = "16px Arial";
  ctx.fillStyle = "#EFB91B";
  ctx.fillText(score, c.width - 61, 100);
}

function updateMagazine(player) {
  // Şarjörün güncellendiği fonksiyon
  img = new Image();
  img.src = "assets/sprite/bar/magazine/player-shootbar.png";

  if (player.bullets == 0) {
    // Eğer şarjör boşsa, yeniden yükleme süreci gösterilir
    ctx.drawImage(img, c.width - 106, 120, 30, 30);
    ctx.font = "16px Arial";
    ctx.fillStyle = "#EFB91B";
    ctx.fillText(text2, c.width - 65, 140, 52, 52);
    if (lastTime - bulletFinishTime > 2000) player.bullets = 20; // Yeniden yükleme tamamlandığında şarjör doldurulur
  } else {
    // Şarjör doluysa, kalan mermi sayısı gösterilir
    ctx.drawImage(img, c.width - 106, 120, 30, 30);
    ctx.font = "16px Arial";
    ctx.fillStyle = "#EFB91B";
    ctx.fillText(player.bullets, c.width - 61, 140, 30, 30);
  }
}

function convertToMinute(lastTime) {
  // Zamanı dakika:sn formatına çeviren fonksiyon
  // lastTime saniye cinsinden olduğu varsayılarak hesaplama yapılıyor
  // zaman damgası cinsinden ise bu değer saniye cinsine çevrilmeli
  var saniye = Math.floor(lastTime / 1000);
  var dakika = Math.floor(saniye / 60);
  var saniyeKalan = saniye % 60;
  var dakikaMetni = dakika < 10 ? "0" + dakika : dakika.toString();
  var saniyeMetni =
    saniyeKalan < 10 ? "0" + saniyeKalan : saniyeKalan.toString();

  return dakikaMetni + ":" + saniyeMetni;
}

function updateTimer(lastTime) {
  // Zamanlayıcının güncellendiği fonksiyon
  time = convertToMinute(lastTime);
  ctx.font = "16px Arial";
  ctx.fillStyle = "#FA760D";
  ctx.fillText(text1 + time, c.width - 106, 24);
}

const backgroundLayer0 = new Image();
backgroundLayer0.src = "assets/layers/0.png";
const backgroundLayer1 = new Image();
backgroundLayer1.src = "assets/layers/1.png";
const backgroundLayer2 = new Image();
backgroundLayer2.src = "assets/layers/2.png";
const backgroundLayer3 = new Image();
backgroundLayer3.src = "assets/layers/3.png";
const backgroundLayer4 = new Image();
backgroundLayer4.src = "assets/layers/4.png";
const backgroundLayer5 = new Image();
backgroundLayer5.src = "assets/layers/5.png";
const backgroundLayer6 = new Image();
backgroundLayer6.src = "assets/layers/6.png";
const backgroundLayer7 = new Image();
backgroundLayer7.src = "assets/layers/7.png";

const mouse = {
  x: c.width / 2,
  y: c.height / 2,
  click: false,
};

const keys = {};

c.addEventListener("mousedown", function (e) {
  let dx = mouse.x - player.x - player.width;
  let dy = mouse.y - player.y - player.height / 2;
  let angle = Math.atan2(dy, dx);

  let bulletSpeed = 5;
  let bullet;

  if (player.bullets == 0) return;

  if (player.gravity > 0) {
    angle = Math.max(-Math.PI / 4, Math.min(angle, Math.PI / 4));
    bullet = new Bullet(
      player.weapon.x + player.weapon.width,
      player.weapon.y + player.weapon.height / 2,
      bulletSpeed * Math.cos(angle),
      bulletSpeed * Math.sin(angle)
    );
    player.bullets--;
  } else {
    dy = mouse.y - player.y + player.height / 2 + 20;
    angle = Math.atan2(dy, dx);
    angle = Math.max(-Math.PI / 4, Math.min(angle, Math.PI / 4));
    bullet = new Bullet(
      player.weapon.x + player.weapon.width,
      player.weapon.y + player.weapon.height / 2,
      bulletSpeed * Math.cos(angle),
      bulletSpeed * Math.sin(angle)
    );
    player.bullets--;
  }
  bullets.push(bullet);

  if (player.bullets == 0) bulletFinishTime = lastTime;
});

c.addEventListener("mousemove", function (e) {
  let canvasPosition = c.getBoundingClientRect();
  mouse.x = e.clientX - canvasPosition.left;
  mouse.y = e.clientY - canvasPosition.top;
  player.weapon.update(mouse.x, mouse.y);
});

window.addEventListener("keydown", function (e) {
  if (!keys[e.keyCode]) {
  keys[e.keyCode] = true;
  if ((e.keyCode === 38 || e.keyCode === 32) && player.gravity > 0) {
    player.jump();
  } else if ((e.keyCode === 40 || e.keyCode === 32) && player.gravity < 0) {
    player.jump();
  }
}
});
window.addEventListener("keyup", function (e) {
  keys[e.keyCode] = false;
});

function crash(rect1, rect2) {
  // Get the sides of the first rectangle
  var left1 = rect1.x;
  var right1 = rect1.x + rect1.width;
  if (rect1.gravity > 0 || rect2.y == 100) var top1 = rect1.y;
  else var top1 = rect1.y - 76;
  var bottom1 = top1 + rect1.height;

  // Get the sides of the second rectangle
  var left2 = rect2.x;
  var right2 = rect2.x + rect2.width;
  var top2 = rect2.y;
  var bottom2 = rect2.y + rect2.height;

  // Check for collision
  if (left1 < right2 && right1 > left2 && top1 < bottom2 && bottom1 > top2) {
    return true;
  } else {
    return false;
  }
}

class Player {
  constructor() {
    this.width = 64;
    this.height = 76;
    this.frameX = new Image();
    this.frameX.src = "assets/sprite/player/run/player-run1.png";
    this.hp = 1;
    this.i = 1;
    this.x = 50;
    this.y = 499 - this.height;
    this.speedX = 0;
    this.speedY = 0;
    this.bullets = 20;
    this.gravity = 0.3;
    this.gravitySpeed = 0;
    this.jumpSpeed = -10; // player zıplarken hızı
    this.jumping = false;
    this.hp = 1;
    this.weapon = new Weapon(
      this.x + this.width / 2 + 10,
      this.y + this.height / 2 + 10,
      37,
      11
    );
  }

  draw() {
    if (this.gravity < 0) {
      ctx.save(); // Kanvasın mevcut durumunu kaydetmek için save() yöntemini kullanın
      ctx.scale(1, -1); // Y çizgisini tersine çevirmek için scale() yöntemini kullanın
      ctx.drawImage(this.frameX, this.x, -this.y, this.width, this.height); // Y koordinatını ters çevirin
      ctx.restore(); // Kanvasın önceki durumunu geri yüklemek için restore() yöntemini kullanın
    } else {
      ctx.drawImage(this.frameX, this.x, this.y, this.width, this.height);
    }
    this.weapon.draw();
  }

  newPos(gameFrame) {
    this.gravitySpeed += this.gravity;
    this.x += this.speedX;
    if (this.i == 7) this.i = 1;

    if (gameFrame % 10 == 0)
      this.frameX.src =
        "assets/sprite/player/run/player-run" + this.i++ + ".png";

    this.y += this.speedY + this.gravitySpeed;
    this.weapon.x += this.speedX;
    this.weapon.y += this.speedY + this.gravitySpeed;

    if (this.gravity > 0) this.hitBottom();
    else this.hitTop();
  }

  hitBottom() {
    var rockbottom = c.height - this.height;
    if (this.y > rockbottom - 1) {
      this.y = rockbottom - 1;
      this.weapon.y = this.y + this.height / 2;
      this.gravitySpeed = 0;
      this.jumping = false;
    }
  }

  hitTop() {
    var top = this.height;
    if (this.y < top) {
      this.y = top;
      this.weapon.y = this.y - this.height / 2 - 20;
      this.gravitySpeed = 0;
      this.jumping = false;
    }
  }

  jump() {
    if (this.gravity > 0) this.gravitySpeed = this.jumpSpeed;
    else this.gravitySpeed = -this.jumpSpeed;

    if (!this.jumping) {
      // player zıplama durumunda değilse zıplayabilir
      this.jumping = true;
    } else {
      this.gravity = -this.gravity;

    }
  }
}

class Obstacles {
  constructor(width, height, x, y, color) {
    this.speedX = 0;
    this.speedY = 0;
    this.frameX = new Image();
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.hp = 2;
    this.color = color;
    if (color == "black") this.hp = 1000;
  }

  newPos() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  draw() {
    ctx.drawImage(this.frameX, this.x, this.y, this.width, this.height);
  }
}

class Bullet {
  constructor(x, y, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.radius = 18;
    this.frameX = new Image();
    this.frameX.src = "assets/sprite/player/shoot/player-shoot1.png";
    this.i = 1;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  draw(gameFrame) {
    if (this.i == 4) this.i = 1;

    if (gameFrame % 20 == 0)
      this.frameX.src =
        "assets/sprite/player/shoot/player-shoot" + this.i++ + ".png";

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.drawImage(
      this.frameX,
      this.x - this.radius,
      this.y - this.radius,
      this.radius * 2,
      this.radius * 2
    );
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
}

class Weapon {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = "assets/sprite/weapon/weapon.png";
    this.angle = 0;
  }

  update(mouseX, mouseY) {
    let dx = mouseX - this.x - this.width / 2; // subtract half the width of the weapon
    let dy = mouseY - this.y - this.height / 2;
    this.angle = Math.atan2(dy, dx);
    this.angle = Math.max(-Math.PI / 4, Math.min(this.angle, Math.PI / 4));
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    // Ters çevirme işlemi
    if (this.gravity < 0) {
      ctx.scale(1, -1); // Y ekseninde ters çevir
    }

    ctx.drawImage(this.image, 0, 0, this.width, this.height);
    ctx.restore();
  }
}

class Diamond {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 30;
    this.img = new Image();
    this.img.src = "assets/sprite/bar/diamond/score.png";
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}

const player = new Player();
const diamondsTop = [];
const diamondsBottom = [];
heart = [];
const obstaclesBottom = [];
const obstaclesTop = [];
let bullets = [];

let obstacleInterval = 100;

var engelOlasiligi = 0.5;
var yikilmazlik = [0.6, 0.6];

function detectCollision(circle, rect) {
  // Dikdörtgenin kenarlarının koordinatlarını bul
  var rectLeft = rect.x;
  var rectRight = rect.x + rect.width;
  var rectTop = rect.y;
  var rectBottom = rect.y + rect.height;

  // Dairenin merkezinin koordinatlarını bul
  var circleX = circle.x;
  var circleY = circle.y;

  // Dikdörtgenin solundan veya sağından geçti mi kontrol et
  if (circleX < rectLeft || circleX > rectRight) {
    return false;
  }

  // Dikdörtgenin üstünden veya altından geçti mi kontrol et
  if (circleY < rectTop || circleY > rectBottom) {
    return false;
  }

  // Dikdörtgenin kenarlarına olan mesafeleri hesapla
  var distX = Math.abs(circleX - rectLeft - rect.width / 2);
  var distY = Math.abs(circleY - rectTop - rect.height / 2);

  // Eğer herhangi bir kenarın yüzeyi ile mesafe dairesinin yarıçapından küçükse, çarpışma var demektir
  if (distX > rect.width / 2 + circle.radius) {
    return false;
  }
  if (distY > rect.height / 2 + circle.radius) {
    return false;
  }

  if (distX <= rect.width / 2) {
    return true;
  }
  if (distY <= rect.height / 2) {
    return true;
  }

  // Köşelerin içinde mi kontrol et
  var dx = distX - rect.width / 2;
  var dy = distY - rect.height / 2;
  return dx * dx + dy * dy <= circle.radius * circle.radius;
}

function createObstacles(obstacles, type) {
  if (obstacles.length > 4) return;

  if (type == "bottom") {
    var obstacleY = 399;
    var dy = 101;
    var firstx = 0;
  } else {
    var obstacleY = 0;
    var dy = -101;
    var firstx = 200;
  }

  if (obstacles.length == 0) {
    var obstacleX = c.width + firstx;
  } else {
    var obstacleX = obstacles[obstacles.length - 1].x + 400;
  }

  var rastgeleSayi = Math.random();
  if (rastgeleSayi > yikilmazlik[1]) {
    obstacles.push(new Obstacles(50, 100, obstacleX, obstacleY, "green"));
    obstacles[obstacles.length - 1].frameX.src =
      "assets/sprite/obstacles/obstacles3.png";
  } else {
    obstacles.push(new Obstacles(50, 100, obstacleX, obstacleY, "black"));
    obstacles[obstacles.length - 1].frameX.src =
      "assets/sprite/obstacles/obstacles1.png";
  }
  rastgeleSayi = Math.random();
  if (rastgeleSayi > engelOlasiligi) {
    if (rastgeleSayi > yikilmazlik[0]) {
      obstacles.push(
        new Obstacles(
          50,
          100,
          obstacleX,
          obstacles[obstacles.length - 1].y - dy,
          "green"
        )
      );
      obstacles[obstacles.length - 1].frameX.src =
        "assets/sprite/obstacles/obstacles4.png";
    } else {
      obstacles.push(
        new Obstacles(
          50,
          100,
          obstacleX,
          obstacles[obstacles.length - 1].y - dy,
          "black"
        )
      );
      obstacles[obstacles.length - 1].frameX.src =
        "assets/sprite/obstacles/obstacles2.png";
    }
  }
}

function createDiamond() {
  var diamondY = 340;

  if (gameFrame % 300 == 0) {
    var diamondX = obstaclesTop[obstaclesTop.length - 1].x;

    diamondsBottom.push(new Diamond(diamondX, diamondY));
  } else if (gameFrame % 150 == 0) {
    diamondY = c.height - 380;

    var diamondX = obstaclesBottom[obstaclesBottom.length - 1].x;

    diamondsTop.push(new Diamond(diamondX, diamondY));
  }
}

class Heart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 40;
    this.img = new Image();
    this.img.src = "assets/sprite/bar/hp/heart1.png";
  }

  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}

function updateHp() {
  img1 = new Image();
  img2 = new Image();
  img1.src = "assets/sprite/bar/hp/heart1.png";
  img2.src = "assets/sprite/bar/hp/heart2.png";

  if (gameFrame % 2000 == 0 && player.hp == 1) {
    if (heart.lenght == 0) heart[0] = new Heart(c.width, c.height - 255);
    else heart[heart.length++] = new Heart(c.width, c.height - 255);
  }

  if (player.hp == 1) {
    ctx.drawImage(img1, c.width - 106, 42, 30, 30);
    ctx.drawImage(img2, c.width - 66, 42, 30, 30);
  } else if (player.hp == 2) {
    ctx.drawImage(img1, c.width - 106, 42, 30, 30);
    ctx.drawImage(img1, c.width - 66, 42, 30, 30);
  } else {
    ctx.drawImage(img2, c.width - 106, 42, 30, 30);
    ctx.drawImage(img2, c.width - 66, 42, 30, 30);
  }
}

function updateComponents(components) {
  for (i = 0; i < components.length; i += 1) {
    components[i].x -= gameSpeed;
    components[i].draw();

    if (components[i].x < -components[i].width) {
      components.splice(i, 1);
      i--;
    }
  }
}

function createBullets(gameFrame) {
  for (i = 0; i < bullets.length; i += 1) {
    bullets[i].move();
    bullets[i].draw(gameFrame);

    if (bullets[i].x > c.width) {
      bullets.splice(i, 1);
      i--;
    }
  }
}
function updateObstacles(obstacles) {
  for (i = 0; i < obstacles.length; i += 1) {
    obstacles[i].x -= gameSpeed;
    obstacles[i].draw();

    if (obstacles[i].x < -50) {
      obstacles.splice(i, 1);
      i--;
    }
  }
}

function updateDetectCollision(bullets, obstacles) {
  for (i = 0; i < bullets.length; i += 1) {
    for (j = 0; j < obstacles.length; j += 1) {
      if (bullets[i] != null && detectCollision(bullets[i], obstacles[j])) {
        // Çarpışma meydana geldiğinde yapılması gereken aksiyonlar burada yapılabilir
        bullets.splice(i, 1);
        obstacles[j].hp--;
        if (obstacles[j].hp == 0) {
          obstacles.splice(j, 1);
          score += 1;
        }
      }
    }
  }
}

function updateDetectCollision2(bullets, components) {
  for (i = 0; i < bullets.length; i += 1) {
    for (j = 0; j < components.length; j += 1) {
      if (bullets[i] != null && detectCollision(bullets[i], components[j])) {
        // Çarpışma meydana geldiğinde yapılması gereken aksiyonlar burada yapılabilir
        bullets.splice(i, 1);
        components.splice(j, 1);
        if (components == diamondsTop || components == diamondsBottom)
          score += 2;
        else if (components == heart) player.hp = 2;
      }
    }
  }
}

var temp;
var number = 0;

function checkCrash(obstacles, player) {
  for (i = 0; i < obstacles.length; i++) {
    if (crash(player, obstacles[i])) {
      if (player.hp == 2) {
        player.hp--;

        for (j = 0; j < obstacles.length; i++) {
          obstaclesBottom.splice(j, 1);
          obstaclesTop.splice(j, 1);
        }
        gameSpeed = 0;
        ctx.clearRect(0, 0, c.width, c.height);

        player.x = 50;
        player.weapon.x = player.x + player.width / 2 + 10;
        if (player.gravity > 0) {
          player.y = c.height;
          player.weapon.y = player.y + player.height / 2 + 10;
          updateHp();
        } else {
          player.y = 0;
          player.weapon.y = player.y - player.height / 2 + 10;
          updateHp();
        }
        gameSpeed = 5;
        return;
      } else if (player.hp == 1) {
        player.hp = 0;
        updateHp();
        return;
      }

      if (player.hp == 0) {
        gameSpeed = 0;
        return true;
      }
    }
  }
}

function checkCrash2(components) {
  for (i = 0; i < components.length; i++) {
    if (crash(player, components[i])) {
      components.splice(i, 1);
      if (components == diamondsTop || components == diamondsBottom) score += 2;
      else if (components == heart) {
        player.hp = 2;
      }
    }
  }
}

class Layer {
  constructor(image, speedModifier) {
    this.x = 0;
    this.y = 0;
    this.width = 800;
    this.height = 500;
    this.x2 = this.width;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = gameSpeed * this.speedModifier;
  }
  update() {
    this.speed = gameSpeed * this.speedModifier;

    if (this.x <= -this.width) {
      this.x = this.width + this.x2 - this.speed;
    }
    if (this.x2 <= -this.width) {
      this.x2 = this.width + this.x - this.speed;
    }
    this.x = Math.floor(this.x - this.speed);
    this.x2 = Math.floor(this.x2 - this.speed);
  }
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
  }
}

const layer0 = new Layer(backgroundLayer0, 0.5);
const layer1 = new Layer(backgroundLayer1, 1);
const layer2 = new Layer(backgroundLayer2, 1, 5);
const layer3 = new Layer(backgroundLayer2, 2);
const layer4 = new Layer(backgroundLayer4, 2, 5);
const layer5 = new Layer(backgroundLayer5, 3);
const layer6 = new Layer(backgroundLayer6, 3, 5);
const layer7 = new Layer(backgroundLayer7, 4);

const gameLayers = [
  layer7,
  layer6,
  layer5,
  layer4,
  layer3,
  layer2,
  layer1,
  layer0,
];



function showHowToPlay() {
  var overlay = document.getElementById("howToPlayOverlay");
  if (overlay.style.display != "inline-block")
    overlay.style.display = "inline-block";
  else overlay.style.display = "none";
}

function showMusicSettings() {
  var music = document.getElementById("musicSettings");
  if (music.style.display != "inline-block")
    music.style.display = "inline-block";
  else music.style.display = "none";
}

function setCookie(name, value, expirationDays) {
  var date = new Date();
  date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + "; " + expires;
}

function getCookie(name) {
  var cookieArr = document.cookie.split("; ");
  for (var i = 0; i < cookieArr.length; i++) {
    var cookiePair = cookieArr[i].split("=");
    if (name === cookiePair[0]) {
      return cookiePair[1];
    }
  }
  return null;
}



let volume = document.getElementById("volumeSlider");
let audio = document.getElementById("backgroundMusic");
var musicStatusSelect = document.getElementById("musicStatusSelect");
audio.volume=0;

volume.addEventListener("change", function(e) {
    let oldvolume=audio.volume;
    audio.volume = e.currentTarget.value;
    if(audio.volume==0){
    pauseMusic();
    musicOnIcon.style.display = "inline-block";
    musicOffIcon.style.display = "none";
    musicStatusSelect.value="off";
    }
    else if(oldvolume==0 && audio.volume!=0){
      startMusic();
      musicOnIcon.style.display = "none";
      musicOffIcon.style.display = "inline-block";
      musicStatusSelect.value="on";
    }
    setCookie("musicLevel", audio.volume, 365);
    
})

var musicOnIcon = document.getElementById("musicOnIcon");
var musicOffIcon = document.getElementById("musicOffIcon");

musicOnIcon.addEventListener("click", function() {
  musicOn();
  
});

musicOffIcon.addEventListener("click", function() {
  musicOff();
});

function musicOn() {
  startMusic();
  musicOnIcon.style.display = "none";
  musicOffIcon.style.display = "inline-block";
  musicStatusSelect.value="on";
  if(audio.volume==0 && volumeSlider.value==0) {
  audio.volume=0.1;
  volumeSlider.value = 0.1;
  setCookie("musicLevel", audio.volume, 365);
}
}


function musicOff(){
  pauseMusic();
  musicOnIcon.style.display = "inline-block";
  musicOffIcon.style.display = "none";
  musicStatusSelect.value="off";
  volumeSlider.value = 0;
  audio.volume=0;
  setCookie("musicLevel", audio.volume, 365);
}

function handleMusicStatusChange() {
  var musicStatusSelect = document.getElementById("musicStatusSelect");
  var selectedOption = musicStatusSelect.value;

  if (selectedOption === "off") {
    musicOff(); // Müziği kapatma işlemleri burada gerçekleştirilebilir
  } else if (selectedOption === "on") {
    musicOn(); // Müziği açma işlemleri burada gerçekleştirilebilir
  }
}

function startMusic() {
  var backgroundMusic = document.getElementById("backgroundMusic");
  backgroundMusic.play();
  backgroundMusic.volume=volumeSlider.value;
}

function pauseMusic() {
  var backgroundMusic = document.getElementById("backgroundMusic");
  backgroundMusic.pause();
}

function showDeathScreen() {
  var death = document.getElementById("death");
  if (death.style.display != "inline-block")
    death.style.display = "inline-block";
  else death.style.display = "none";
}

let startTime, now;
let desiredFPS = 60; // Hedef FPS değeri
let desiredInterval = 1000 / desiredFPS; // Hedef süre aralığı (milisaniye cinsinden)

function startGame(number) {
  var menu = document.getElementById("menu");
  if (number == 0) {
    location.reload();
  } else {
    menu.style.display = "none";
    canvas.style.display = "inline-block";
    startTime = Date.now();
    setTimeout(() => {
      animate(0);
    }, desiredInterval);

  }
}

function animate(timestamp) {
  ctx.clearRect(0, 0, c.width, c.height);
  now = Date.now();

  gameLayers.forEach((layer) => {
    layer.update();
    layer.draw();
  });

  updateHp();
  updateMagazine(player);

  createObstacles(obstaclesBottom, "bottom");
  createObstacles(obstaclesTop, "top");
  createDiamond();
  createBullets(gameFrame);

  updateObstacles(obstaclesBottom);
  updateObstacles(obstaclesTop);
  updateComponents(diamondsTop);
  updateComponents(diamondsBottom);
  updateComponents(heart);

  checkCrash2(diamondsTop);
  checkCrash2(diamondsBottom);
  checkCrash2(heart);

  let deltatime = timestamp - lastTime;
  lastTime = timestamp;
  gameFrame++;
  
  updateTimer(now-startTime);

  updateDetectCollision(bullets, obstaclesBottom);
  updateDetectCollision(bullets, obstaclesTop);
  updateDetectCollision2(bullets, diamondsTop);
  updateDetectCollision2(bullets, diamondsBottom);
  updateDetectCollision2(bullets, heart);

  player.draw();
  player.newPos(gameFrame);

  updateScore();

  updateHp();
  checkCrash(obstaclesBottom, player);
  checkCrash(obstaclesTop, player);

  if (player.hp == 0) {
    cancelAnimationFrame(animate);
    document.getElementById("d1").textContent=d1;
    document.getElementById("d2").textContent=d2+"  "+time;
    document.getElementById("d3").textContent=d3+"  "+score;
    if(getCookie("bestScore")!=null){
      if(score>getCookie("bestScore")){
        setCookie("bestScore", score, 365);
        bestScore.textContent = score;
        document.getElementById("d4").textContent=d4+"  "+score;
      }else {
        document.getElementById("d4").textContent=d4+"  "+getCookie("bestScore");
      }
    }else {
      document.getElementById("d4").textContent=d4+"  "+score;
      setCookie("bestScore", score, 365);
    }
    
    showDeathScreen();
    return;
  }

    // Geçen süreye göre bir sonraki çağırmanın zamanını ayarlayın
    let nextDelay = Math.max(0, desiredInterval - deltatime);
    setTimeout(() => {
      requestAnimationFrame(animate);
    }, nextDelay);

}


//canvas setup

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
var enemymove
var pop_up = true

enemymove = true

canvas.width = innerWidth
canvas.height = innerHeight

// Player

class Player {
	constructor(x, y, radius, color,) {
		this.x = x
		this.y = y
		this.radius = radius
		this.color = color
	}
	draw() {
		c.beginPath()
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		c.fillStyle = this.color
		c.fill()
	}
	update() {
		this.draw()
		this.x = this.x
		this.y = this.y
		this.velocity = this.velocity
	}
}

let x = canvas.width / 6
let y = canvas.height / 6

const player = new Player(x, y, 15, 'white')

setInterval(() =>{
	if (player.y < 1 + 15) {
		player.y = canvas.height
	}
	if (player.y > canvas.height) {
		player.y = 25
	}
}, 10)

// Projectile

class Projectile {
	constructor(x, y, radius, color, velocity) {
		this.x = x
		this.y = y
		this.radius = radius
		this.color = color
		this.velocity = velocity
	}
	draw() {
		c.beginPath()
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		c.fillStyle = this.color
		c.fill()
	}

	update() {
		this.draw()
		this.x = this.x + this.velocity.x
		this.y = this.y + this.velocity.y
	}
}

const projectile = new Projectile(player.x, player.y, 5, 'red', {
		x: 1,
		y: 1
	})
projectile.update()

const projectiles = []

// Enemy

class Enemy {
	constructor(x, y, radius, color, velocity) {
		this.x = x
		this.y = y
		this.radius = radius
		this.color = color
		this.velocity = velocity
	}
	draw() {
		c.beginPath()
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		c.fillStyle = this.color
		c.fill()
	}
	update() {
		this.draw()
		this.x = this.x
		this.y = this.y
		this.velocity = this.velocity
	}
}

const ex = canvas.width / 6 + canvas.width / 1.5
const ey = canvas.height / 6

const velocity = {
	x: 0,
	y: 5
}

const enemy = new Enemy(ex, ey, 15, 'green', velocity)


// function Enemy_movement() {
// 	const interval_1 = setInterval(() => {
// 		const interval_2 = setInterval(() => {
// 		const movement = Math.floor(Math.random() * (9 - 2))
// 			if (movement > 4.8 && enemymove == true) {
// 				enemy.y = enemy.y + 8
// 			} else {
// 				enemy.y = enemy.y - 8
// 			}
// 		}, 150)
// 	}, 1050)
// }

var int1 = setInterval(() => {
	var int2 = setTimeout(() => {
		const movement = Math.floor(Math.random() * (9 - 2))
			if (movement > 4.8 && enemymove == true) {
				enemy.y = enemy.y + 8
			} else {
				enemy.y = enemy.y - 8
			}
		}, 150)
}, 100)


setInterval(() =>{
	if (enemy.y < 1 + 15) {
		enemy.y = canvas.height
	}
	if (enemy.y > canvas.height) {
		enemy.y = 1 - 20
	}
}, 10)

class EnemyProjectile {
	constructor(x, y, radius, color, velocity) {
		this.x = x
		this.y = y
		this.radius = radius
		this.color = color
		this.velocity = velocity
	}
	draw() {
		c.beginPath()
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		c.fillStyle = this.color
		c.fill()
	}

	update() {
		this.draw()
		this.x = this.x + this.velocity.x
		this.y = this.y + this.velocity.y
	}
}

// Enemy shoot


const enemyprojectile = new EnemyProjectile(enemy.x, enemy.y, 7, 'green', {
		x: -6,
		y: 0
	})
enemyprojectile.update()

const enemyprojectiles = []

var shootint = setInterval(() => {
	const velocity = {
		x: -6,
		y: 0
	}
	enemyprojectiles.push(new EnemyProjectile(enemy.x, enemy.y, 7, 'green', velocity))
	enemyprojectile.update()
}, 850)

// function animate

function animate() {
	animationId = requestAnimationFrame(animate)
	c.fillStyle = 'rgba(0, 0, 0, 0.1'
	c.fillRect(0, 0, canvas.width, canvas.height)
	player.draw()
	enemy.draw()
	enemyprojectile.update()
	projectiles.forEach((projectile, index) => {
		projectile.update()
		//remove from edges of screen
		if (projectile.x + projectile.radius < 0 || projectile.x - projectile.radius > canvas.width || projectile.y + projectile.radius < 0 || projectile.y - projectile.radius > canvas.height) {
			setTimeout (() => {
				projectiles.splice(index, 1)
			}, 0)
		}
	})
	enemyprojectiles.forEach((enemyprojectile, index) => {
		enemyprojectile.update()
		//remove from edges of screen
		if (enemyprojectile.x + enemyprojectile.radius < 0 || enemyprojectile.x - enemyprojectile.radius > canvas.width || enemyprojectile.y + enemyprojectile.radius < 0 || enemyprojectile.y - enemyprojectile.radius > canvas.height) {
			setTimeout (() => {
				enemyprojectiles.splice(index, 1)
				enemyprojectile.update()
			}, 0)
		}
		enemyprojectile.update()
	})
	enemyprojectiles.forEach((enemyprojectile, index) => {
		enemy.update()

		// Game over

		const dist2 = Math.hypot(enemyprojectile.x - player.x, enemyprojectile.y - player.y)

		if (dist2 - player.radius - enemyprojectile.radius <= 1) {
			cancelAnimationFrame(animationId)
		}
	})

	// Enemy Defeted

	projectiles.forEach((projectile, projectileIndex) => {
		const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)

		if (dist - enemy.radius - projectile.radius < 1) {
			enemy.x = canvas.width - 20
			enemy.y = 25
			// clearInterval(int1)
			// clearInterval(shootint)
			if (pop_up == true) {
				window.confirm("Restart or Quit")
				
				if (confirm("Restart or Quit")) {
					player.x = x
					player.y = y
					enemy.x = ex 
					enemy.y = ey 
				} else {
					window.close()
				}
			}
		}
	})
}


// Projectiles 'click'

function shoot() {
	addEventListener('click', (click)=> {
		const angle = Math.atan2(event.clientY - player.y, event.clientX - player.x)
		const velocity = {
			x: Math.cos(angle) * 5,
			y: Math.sin(angle) * 5
		}
		projectiles.push(new Projectile(player.x, player.y, 5, 'white', velocity))
	})
}

// function click() { 
// 	addEventListener('click', (click)=> {
// 		const angle = Math.atan2(event.clientY - player.y, event.clientX - player.x)
// 		const velocity = {
// 			x: Math.cos(angle) * 5,
// 			y: Math.sin(angle) * 5
// 		}
// 		projectiles.push(new Projectile(player.x, player.y, 5, 'white', velocity))
// 	})
// }

addEventListener('click', (click) => {
	shoot()
})

addEventListener('keydown', (event) => {
	switch (event.key) {
    case 'ArrowUp' || 'W':
      player.y = player.y - 10
      // enemy.y = Math.random() * (canvas.height - 15)
      break
    case 'ArrowDown':
      player.y = player.y + 10
      // enemy.y = Math.random() * (canvas.height - 15)
      break
  }
})

// if (enemymove == true) {
// 	Enemy_movement()
// 	enemy.update()
// }

player.update()
enemy.update()
animate()


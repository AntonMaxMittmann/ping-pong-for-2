radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 10) {
        basic.clearScreen()
        basic.showLeds(`
            . . . # #
            . # . . #
            # # # . #
            . # . . #
            . . . . #
            `)
        counter += 1
        schlaeger.delete()
        if (counter == 3) {
            radio.sendNumber(100)
            basic.showIcon(IconNames.Happy, 1000)
            ball.delete()
            schlaeger.delete()
        } else {
            schlaeger = game.createSprite(2, 4)
        }
    } else if (receivedNumber == 100) {
        basic.showIcon(IconNames.Sad, 1000)
        ball.delete()
        schlaeger.delete()
    } else {
        ball = game.createSprite(receivedNumber, 0)
        basic.pause(speed)
        for (let index = 0; index < 4; index++) {
            ball.change(LedSpriteProperty.Y, 1)
            basic.pause(speed)
        }
        if (schlaeger.get(LedSpriteProperty.X) == ball.get(LedSpriteProperty.X)) {
            posTest()
        } else {
            radio.sendNumber(10)
            ball.delete()
            schlaeger.delete()
            schlaeger = game.createSprite(2, 4)
        }
    }
})
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    schlaeger.change(LedSpriteProperty.X, -1)
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    schlaeger.change(LedSpriteProperty.X, 1)
})
function posTest () {
    ball.delete()
    ball = game.createSprite(randint(0, 4), 3)
    for (let index = 0; index < 4; index++) {
        ball.change(LedSpriteProperty.Y, -1)
        basic.pause(speed)
    }
    radio.sendNumber(ball.get(LedSpriteProperty.X))
    ball.delete()
}
let ball: game.LedSprite = null
let schlaeger: game.LedSprite = null
let counter = 0
let speed = 0
speed = 200
counter = 0
schlaeger = game.createSprite(2, 4)
radio.setGroup(1)

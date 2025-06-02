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
        schlaeger = game.createSprite(2, 4)
    } else {
        ball = game.createSprite(receivedNumber, 0)
        basic.pause(500)
        for (let index = 0; index < 4; index++) {
            ball.change(LedSpriteProperty.Y, 1)
            basic.pause(500)
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
    ball = game.createSprite(randint(0, 4), 4)
    for (let index = 0; index < 4; index++) {
        ball.change(LedSpriteProperty.Y, -1)
        basic.pause(500)
    }
    radio.sendNumber(ball.get(LedSpriteProperty.X))
    ball.delete()
}
let ball: game.LedSprite = null
let schlaeger: game.LedSprite = null
let counter = 0
schlaeger = game.createSprite(2, 4)
radio.setGroup(1)

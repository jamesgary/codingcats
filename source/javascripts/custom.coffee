---
---

subtitles = [
  "Because herding cats ~~ was too easy"
  "Ceci n'est pas ~~ une tagline"
  "Made with ~~ 100% Internet"
  "Disappointing ~~ since 1986"
  "I like what you like"
  "It sounded good ~~ on paper"
  "Ha! Ha! ~~ Internet!"
  "For shizzles ~~ and giggles"
  "I'm probably ~~ wrong but..."
  "&gt; 9000"
  "Test Blog, ~~ Please ignore"
]
adjectives = [
  "crushing"
  "overwhelming"
  "harrowing"
  "only the finest"
  "clinical"
  "crippling"
  "horrible"
  "tasteful"
  "the"
  "friggin'"
]
nouns = [
  "depression"
  "shame"
  "guilt"
  "manic depression"
  "anxiety"
  "nervous ticks"
  "distrust of others"
  "alcoholism"
]
custom =
  displayRandomTagline: ->
    subtitle = @randomElement(subtitles).replace(" ~~ ", "<span class='breakline'></span>")
    $("header hgroup h2").html(subtitle)
  displayRandomPower: ->
    power = ['and', @randomElement(adjectives), @randomElement(nouns)].join(' ')
    $("footer .credit .random-power").html(power)
  randomElement: (array) ->
    random_index = Math.floor(Math.random() * array.length)
    array[random_index]

$.domReady ->
  custom.displayRandomTagline()
  custom.displayRandomPower()

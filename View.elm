module View exposing (decodeModel, viewAll, viewBody)

import Html exposing (..)
import Html.Attributes exposing (..)
import Json.Decode
import Json.Encode
import Markdown


type alias Model =
    { itMattersNot : String
    }


decodeModel : Json.Decode.Decoder Model
decodeModel =
    Json.Decode.map Model
        (Json.Decode.field "name" Json.Decode.string)



-- For index.ts to compile with empty Model


viewAll : Model -> Html msg
viewAll model =
    fullHtml



-- For Main.elm to run w/ elm-live


viewBody : Html msg
viewBody =
    div [] bodyParts


fullHtml =
    html []
        [ head [ title "codingcats.com" ]
            [ node "meta" [ charset "utf-8" ] []
            , node "title" [] [ text "Coding Cats" ]
            , node "meta" [ content "James Gary", name "author" ] []
            , node "meta" [ content "Various game projects of varied quality.", name "description" ] []
            , node "meta" [ content "width=device-width, initial-scale=1", name "viewport" ] []
            , node "link" [ href "http://codingcats.com/", rel "canonical" ] []
            , node "link" [ href "/favicon.png", rel "icon" ] []
            , node "link" [ href "/styles.css", rel "stylesheet", type_ "text/css" ] []
            , node "link" [ href "https://fonts.googleapis.com/css?family=Open+Sans|Press+Start+2P", rel "stylesheet" ] []
            ]
        , body [] bodyParts
        ]


bodyParts =
    [ headerStuff
    , mainStuff
    , footerStuff
    ]


headerStuff =
    header [ class "header" ]
        [ h1 []
            [ a [ class "blog-title", href "/" ]
                [ text "codingcats.com" ]
            ]
        , div [ id "ears" ]
            [ div [ class "ear-container left" ]
                [ div [ class "ear outline" ] []
                , div [ class "ear-top" ] []
                , div [ class "ear" ] []
                , div [ class "ear-inner" ] []
                ]
            , div [ class "ear-container right" ]
                [ div [ class "ear outline" ] []
                , div [ class "ear-top" ] []
                , div [ class "ear" ] []
                , div [ class "ear-inner" ] []
                ]
            ]
        ]


mainStuff =
    main_ [ class "main" ]
        [ div [ class "main-inner" ]
            [ Markdown.toHtml [ class "project" ]
                """
# My name is James Gary.

[Github](https://github.com/jamesgary) | [Twitter](https://twitter.com/james_gary)

Sometimes I do things.

---

# Constellations (Jan 2018)

[![Screenshot of Constellations](/images/constellations.png)](http://constellationsgame.com)

[Demo](http://constellationsgame.com) | [Github repo](https://github.com/jamesgary/constellations)

A game about untangling the stars. Joyfully built with Elm. Still a work in progress!

---

# lifeGL (Jan 2013)

[![Screenshot of lifeGL](http://codingcats.com/images/lifegl.png)](http://codingcats.com/projects/lifegl/index.html)

[Demo](http://codingcats.com/projects/lifegl/index.html) | [Github repo](https://github.com/jamesgary/lifeGL)

Super smooth Game of Life demo powered by WebGL.

### My goals

- Simulate Conway's Game of Life in high detail
    - 1 pixel per cell
    - 60 FPS at full screen
- Get my hands dirty with WebGL
- Adjust GoL rules in real time
- Keep codebase simple and maintainable
    - Use Guard, Coffeescript, Sass, and Haml

### Lessons learned

- WebGL is complicated. Definitely use a library next time.
- WebGL still is not ready for primetime.
  - Not everyone has a MacBook Pro or a $300+ video card.
  - Mobile is still far from supporting WebGL.
  - My Ubuntu machine does not play well with Radeons :(

---

# The Lone Clone (Dec 2012)

[![Screenshot of The Lone Clone](http://codingcats.com/images/the_lone_clone.png)](http://codingcats.com/projects/the_lone_clone/index.html)

[Demo](http://codingcats.com/projects/the_lone_clone/index.html) | [Github repo](https://github.com/jamesgary/The-Lone-Clone)

Make your way through 20 puzzlicious levels using only your power of cloning.

### My goals

- Make a 'decent' game (i.e. one with music, beginning/middle/end, smooth gameplay)
- Participate in the Github Game Off
- Leverage a physics engine box2dweb
- Present simple rules with elaborate possibilities
- Keep codebase simple and maintainable
  - Use Guard, Coffeescript, Sass, and Haml

### Lessons learned

- RequireJS is awesome and can do just about anything you want.
  - Configuration can be frustrating, but payoff is worth it.
- Learn quickly the limitations of vendored libraries.
  - box2dweb freezes the browser when objects exceed their space.
  - Should have researched & stress-tested more libraries
- Deadlines are very good motivators.

---

# NutBuggered (Feb 2012)

[![Screenshot of NutBuggered](http://codingcats.com/images/nutbuggered.png)](http://codingcats.com/projects/nutbuggered/index.html)

[Demo](http://codingcats.com/projects/nutbuggered/index.html) | [Github repo](https://github.com/jamesgary/nutbuggered)

Tower defense game featuring squirrels defending their homeland against swarms of bugs. No music, minimal graphics, but hey, it was my first game.

### My goals

- Make my first fully HTML5 game
- Participate in the Pokki Challenge
- Keep codebase simple and maintainable
- Use Guard, Coffeescript, Sass, and Haml
- TDD with Jasmine

### Lessons learned

- Don't leave difficulty configuration to the last minute.
- I'm both a better and worse artist than I thought.
- RequireJS can unintentionally serve as a decent namespace pattern
- Accept the fact that "sucking is the first step to being sorta good at something" - Jake the Dog, Adventure Time
"""
            ]
        ]


footerStuff =
    footer []
        [ p [ class "footer" ]
            [ span [ property "innerHTML" (Json.Encode.string "&copy;") ] []
            , text " 2018 - James Gary. Powered by "
            , a [ href "https://github.com/jamesgary/codingcats", target "_blank" ] [ text "Elm" ]
            ]
        ]


html =
    node "html"


head =
    node "head"


hgroup =
    node "hgroup"

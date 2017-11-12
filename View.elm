module View exposing (decodeModel, viewAll, viewBody)

import Html exposing (..)
import Html.Attributes exposing (..)
import Json.Decode


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
            [ p []
                [ text "My name is "
                , a [ href "https://twitter.com/james_gary", target "_blank" ] [ text "James Gary" ]
                , text " and sometimes I do things."
                ]

            -- Constellations
            , div [ class "project" ]
                [ h1 [] [ text "Constellations" ]
                , img [ src "http://fillmurray.com/605/400" ] []
                , p [] [ text "A puzzle game written in Elm." ]
                , p [] [ text "Status: In development. Last updated (2017)" ]
                , p []
                    [ a [ href "https://constellationsgame.com" ] [ text "Demo" ]
                    , text " | "
                    , a [ href "https://github.com/jamesgary/constellations" ] [ text "Github" ]
                    ]
                ]

            -- Nutbuggered
            , div [ class "project" ]
                [ h1 [] [ text "NutBuggered" ]
                , img [ src "http://codingcats.com/images/nutbuggered.png" ] []
                , p [] [ text "NutBuggered is a tower defense game." ]
                , p [] [ text "Status: In development. Last updated 2017" ]
                , p []
                    [ a [ href "https://constellationsgame.com" ] [ text "Demo" ]
                    , text " | "
                    , a [ href "https://github.com/jamesgary/constellations" ] [ text "Github" ]
                    ]
                ]

            --li [] [text "My goals:"]
            --"Make my first fully HTML5 game"
            --"Participate in the Pokki Challenge"
            --"Keep codebase simple and maintainable"
            --"Use Guard, Coffeescript, Sass, and Haml"
            --"TDD with Jasmine"
            --"Lessons learned:"
            --"Don’t leave difficulty configuration to the last minute."
            --"I’m both a better and worse artist than I thought."
            --"RequireJS can unintentionally serve as a decent namespace pattern"
            --"Accept the fact that “sucking is the first step to being sorta good at something” - Jake the Dog, Adventure Time"
            ]
        ]


footerStuff =
    footer []
        [ p [ class "footer" ]
            [ text "Copyright © 2017 - James Gary. Powered by "
            , a [ href "https://github.com/jamesgary/codingcats", target "_blank" ] [ text "Elm" ]
            ]
        ]


html =
    node "html"


head =
    node "head"


hgroup =
    node "hgroup"

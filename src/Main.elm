module Main exposing (main, view)

import Html exposing (..)
import Html.Attributes exposing (..)


main =
    view


view =
    div []
        ([ node "link" [ href "public/styles.css", rel "stylesheet", type_ "text/css" ] []
         , node "link" [ href "https://fonts.googleapis.com/css?family=Open+Sans|Press+Start+2P", rel "stylesheet" ] []
         ]
            ++ bodyParts
        )


fullHtml =
    html []
        [ head [ title "codingcats.com" ]
            [ node "meta" [ charset "utf-8" ] []
            , node "title" [] [ text "Coding Cats" ]
            , node "meta" [ content "James Gary", name "author" ] []
            , node "meta" [ content "Various web game projects of varied quality.", name "description" ] []
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

    --, navStuff
    , mainStuff
    , footerStuff
    ]


headerStuff =
    header [ class "header" ]
        [ div [ class "foo" ]
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
        ]


navStuff =
    nav [ attribute "role" "navigation" ]
        [ ul [ class "main-navigation" ]
            [ li []
                [ a [ href "/" ]
                    [ text "Home" ]
                ]
            , li []
                [ a [ href "/projects" ]
                    [ text "Projects" ]
                ]
            , li []
                [ a [ href "/about" ]
                    [ text "About" ]
                ]
            , li []
                [ a [ href "/blog/archives" ]
                    [ text "Archives" ]
                ]
            ]
        ]


mainStuff =
    main_ [ class "main" ]
        [ p []
            [ text "My name is "
            , a [ href "https://twitter.com/james_gary", target "_blank" ] [ text "James Gary" ]
            , text " and sometimes I do things."
            ]
        ]


footerStuff =
    footer []
        [ p [ class "footer" ]
            [ text "Copyright © 2017 - James Gary. Powdered by "
            , a [ href "https://github.com/jamesgary/codingcats", target "_blank" ] [ text "Elm" ]
            ]
        ]


html =
    node "html"


head =
    node "head"


hgroup =
    node "hgroup"

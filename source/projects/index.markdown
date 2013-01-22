---
layout: page
title: "Projects"
comments: false
footer: true
---

## lifeGL

[![screenshot of lifeGL](/images/lifegl.png)](/projects/lifegl/index.html)

[source](http://github.com/jamesgary/lifeGL) | [demo](/projects/lifegl/index.html)

__My goals:__

- Simulate Conway's Game of Life in high detail
  - 1 pixel per cell
  - 60 FPS at full screen
- Get my hands dirty with WebGL
- Adjust GoL rules in real time
- Keep codebase simple and maintainable
  - Use Guard, Coffeescript, Sass, and Haml

__Lessons learned:__

- WebGL is complicated. Definitely use a library next time.
- WebGL *still* is not ready for primetime.
  - Not everyone has a MacBook Pro or a $300+ video card.
  - Mobile is still far from supporting WebGL.
  - My Ubuntu machine does not play well with Radeons :(

## The Lone Clone

[![screenshot of The Lone Clone](/images/the_lone_clone.png)](/projects/the_lone_clone/index.html)

[source](http://github.com/jamesgary/The-Lone-Clone) | [demo](/projects/the_lone_clone/index.html)

__My goals:__

- Make a 'decent' game (i.e. one with music, beginning/middle/end, smooth gameplay)
- Participate in the [Github Game Off](http://github.com/blog/1303-github-game-off)
- Leverage a physics engine [box2dweb](http://code.google.com/p/box2dweb/)
- Present simple rules with elaborate possibilities
- Keep codebase simple and maintainable
  - Use Guard, Coffeescript, Sass, and Haml

__Lessons learned:__

- RequireJS is awesome and can do just about anything you want.
  - Configuration can be frustrating, but payoff is worth it.
- Learn quickly the limitations of vendored libraries.
  - box2dweb freezes the browser when objects exceed their space.
  - Should have researched & stress-tested more libraries
- Deadlines are very good motivators.

## NutBuggered

[![screenshot of NutBuggered](/images/nutbuggered.png)](/projects/nutbuggered/index.html)

[source](http://github.com/jamesgary/nutbuggered) | [demo](/projects/nutbuggered/index.html)

__My goals:__

- Make my first fully HTML5 game
- Participate in the [Pokki Challenge](http://www.pokki.com/contest/)
- Keep codebase simple and maintainable
  - Use Guard, Coffeescript, Sass, and Haml
- TDD with Jasmine

__Lessons learned:__

- Don't leave difficulty configuration to the last minute.
- I'm both a better and worse artist than I thought.
- RequireJS can unintentionally serve as a decent namespace pattern
- Accept the fact that "sucking is the first step to being sorta good at something" - [Jake the Dog, Adventure Time](http://pseudomantic.wordpress.com/2012/06/10/sucking-at-something-is-the-first-step/)

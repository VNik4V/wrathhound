# Wrath Hound
## A projektről

A Wrath Hound egy 2D indie fejlesztésű kalandjáték, amely a régi klasszikusok hangulatát ötvözi egy friss és izgalmas élménnyel. A játékosokat egy sötét fantasy világba vezeti, ahol démonokkal és rejtett titkokkal teli helyszínek várják őket. A dinamikus harcrendszer és a lenyűgöző pixel art grafika egy felejthetetlen kalandot kínál. Fedezd fel a világot, harcolj szörnyekkel és gyűjts erősebb fegyvereket, miközben a kaland izgalmas kihívásokat tartogat.

---
## Adatbázis
- users
    - uid
	- username
	- email
	- psw
	- role
- got_achievements
	- uid
	- aid
	- time
- achievements
	- aid
	- achievement
	- description

- forum
	- post_id
	- title
	- uid
	- post
	- time

- forum_comments
	- comment_id
	- post_id
	- uid
	- post
	- time

- friends
	- uid_1
	- uid_2

- game
	- gid
	- downloadable
	- version

![kép az adatbáziskapcsolatokról](https://i.snipboard.io/apmj3q.jpg)

[adatbázis](https://drawsql.app/teams/dszc-baross-2/diagrams/wrathhound)

---
## Backend

A backend feladata kommunikációs hidat létesíteni a frontend (játék és weboldal) és az adatbázis között.

1. Rendezet mappa struktúra
    - Backend/
        - config/
            - db.js -> (Adatbázis kapcsolat)
            - config.js -> (Dotenv beállítások)
        - modules/
            - auth/
                - auth.model.js -> (SQL lekérdezések)
                - auth.controller.js -> (Vezérlők)
                - auth.routes.js -> (Útvonalak (regisztráció, bejelentkezés, kijelentkezés))
            - user/
                - user.model.js
                - user.controller.js
                - user.routes.js
            - achievements/
                - achievements.model.js
                - achievements.controller.js
                - achievements.routes.js
            - forum/
                - forum.model.js
                - forum.controller.js
                - forum.routes.js
            - friends/
                - friend.model.js
                - friend.controller.js
                - friend.routes.js
            - game/
                - game.model.js
                - game.controller.js
                - game.routes.js
        - middleware/
            - multer.middleware.js
            - auth.middleware.js
        - utils/
            - helpers.js
            - validators.js
        - app.js
        - server.js
        - .env
        - package.json
        - package-lock.json
        - .gitignore
        - ReadMe.md

2. Használt package-ek
    - [bcryptjs](https://www.npmjs.com/package/bcryptjs)
    - [cookie-parser](https://www.npmjs.com/package/cookie-parser)
    - [cors](https://www.npmjs.com/package/cors)

````javascript
"dependencies": {
    "bcrypt": "^5.1.1",
    "bcryptjs": "^2.4.3",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.21.1",
    "express-session": "^1.18.1",
    "jsonwebtoken": "^9.0.2",
    "multer": "^1.4.5-lts.1",
    "mysql2": "^3.11.4",
    "validator": "^13.12.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.7"
  }
````
---



---    

````javascript
app.use('/game', express.static(path.join(__dirname, 'thegame')));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/friends', friendsRoutes);
app.use('/api/game', gameRoutes);
````


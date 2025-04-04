# Wrath Hound
## A projektről

A Wrath Hound egy 2D indie fejlesztésű kalandjáték, amely a régi klasszikusok hangulatát ötvözi egy friss és izgalmas élménnyel. A játékosokat egy sötét fantasy világba vezeti, ahol démonokkal és rejtett titkokkal teli helyszínek várják őket. A dinamikus harcrendszer és a lenyűgöző pixel art grafika egy felejthetetlen kalandot kínál. Fedezd fel a világot, harcolj szörnyekkel és gyűjts erősebb fegyvereket, miközben a kaland izgalmas kihívásokat tartogat.

---

## Készítette
- Vörösmarti Mónika
- GitHub: https://github.com/VNik4V/wrathhound

## Telepítés és futtatás
```bash
git clone https://github.com/VNik4V/wrathhound.git
cd wrathhound
npm install
npm run dev
```
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

![kép az adatbáziskapcsolatokról](https://i.snipboard.io/hSX4QR.jpg)
>[adatbázis diagram](https://drawsql.app/teams/dszc-baross-2/diagrams/wrathhound)

---
## Backend

A backend Node.js alapú, Express keretrendszerrel, és MySQL adatbázissal működik. Feladata kommunikációs hidat létesíteni a frontend (játék + weboldal) és az adatbázis között.

### Mappa struktúra
- Backend/
    - node_modules/ 
        - ... -> *Használt csomagok fájljai*
    - thegame/ 
        - WrathHound.exe -> *Játék .exe fájla*
    - config/
        - db.js -> *Adatbázis kapcsolat*
         - config.js -> *Dotenv beállítások*
    - modules/
        - auth/
            - auth.model.js -> *SQL lekérdezések*
            - auth.controller.js -> *Vezérlők*
            - auth.routes.js -> *Útvonalak (regisztráció, bejelentkezés, kijelentkezés)*
        - user/
            - user.model.js -> *Felhasználói adatmodell (MySQL lekérdezések)*
            - user.controller.js -> *Felhasználókkal kapcsolatos vezérlő*
            - user.routes.js -> *Felhasználói útvonalak*
        - achievements/
            - achievements.model.js -> *Eredmények adatmodell*
            - achievements.controller.js -> *Eredmények vezérlője*
            - achievements.routes.js -> *Eredmények útvonalai (pl. új eredmény, eredmények lekérdezése)*
        - forum/
            - forum.model.js -> *Fórum bejegyzések adatmodell*
            - forum.controller.js -> *Fórum vezérlője (hozzáadás, listázás, törlés)*
            - forum.routes.js -> *Fórum útvonalai (pl. bejegyzések, kommentek)*
        - friends/
            - friend.model.js -> *Barátlista adatmodell*
            - friend.controller.js -> *Barátokkal kapcsolatos vezérlő*
            - friend.routes.js -> *Barátlista útvonalak (pl. barát hozzáadása, barátlista lekérdezése)*
        - game/
            - game.model.js -> *Játék adatmodell*
            - game.controller.js -> *Játékkal kapcsolatos vezérlő (pl. frissítések ellenőrzése)*
            - game.routes.js -> *Játék modul útvonalai*
    - middleware/
        - multer.middleware.js -> *Fájl feltöltés*
        - auth.middleware.js -> *Token autentikáció*
    - utils/
        - helpers.js -> *Általános segédfüggvények, globális változók*
        - validators.js -> *Validációs függvények (pl. adatbemenet ellenőrzés)*
    - app.js -> *Az alkalmazás belépési pontja (Express konfigurálás, middleware-ek betöltése)*
    - server.js -> *Szerver indítási fájl (pl. app.js meghívása és futtatása adott porton)*
    - .env -> *Környezeti változók (pl. adatbázis URL, API kulcsok)*
    - package.json -> *Használt csomagok és függőségek*
    - package-lock.json -> *Függőségek*
    - .gitignore -> *Nem nyomonkövetett fájlok vagy mappák*
    - ReadMe.md -> *Dokumentáció*
    - wrathhound.sql -> *Adatbázis*

---

### Használt package-ek
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser)
- [cors](https://www.npmjs.com/package/cors)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express](https://www.npmjs.com/package/express)
- [express-session](https://www.npmjs.com/package/express-session)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [multer](https://www.npmjs.com/package/multer)
- [mysql2](https://www.npmjs.com/package/mysql2)
- [validator](https://www.npmjs.com/package/validator)
- [nodemon](https://www.npmjs.com/package/nodemon)

````javascript
"dependencies": {
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
>package.json
---  

### Biztonság
- **JWT** token alapú hitelesítés
- Jelszavak **bcryptjs** segítségével vannak hashelve
- Middleware szinten történik az authentikáció (**auth.middleware.js**)
- A **.env** fájl tartalmaz minden érzékeny adatot – ne oszd meg publikusan!
---

### Végpontok
Az app.js -be meghívtuk az összes routes fájlt és mint egy közlekedési csomópont igazgatja a végpontokat.
````javascript
app.use('/game', express.static(path.join(__dirname, 'thegame')));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/friends', friendsRoutes);
app.use('/api/game', gameRoutes);
````
>app.js
---
1. Auth végpontok
    - /registration  
        >*regisztráció*

    - /login
        >*bejelentkezés*

    - /logout
        >*kijelentkezés*

    - /validate
        >*bejelentkezés ellenőrzés, ha be van jelentkezve akkor igaz értéket add ha nincs akkor hamisat*

    ```javascript
    router.post('/registration', registration);
    router.post('/login', login);
    router.post('/logout', authenticateToken, logout);
    router.get('/validate', validate);
    ```
    >auth.routes.js
2. User végpontok
    - /userprofile
        >*felhasználó saját adatai*

    - /userprofile/:uid
        >*más felhasználó adatai* 

    - /editprofile
        >*felhasználó adatainak szerkesztése (username, psw)*

    ```javascript
    router.get('/userprofile', authenticateToken, userprofile);
    router.get('/userprofile/:uid', anyuserprofile);
    router.put('/editprofile', authenticateToken, editprofile);
    ```
    >user.routes.js
3. Achievements végpontok
    - /userachievements
        >*saját achievementek*

    - /userachievements/:uid
        >*más felhasználó achievementjei*

    - /all
        >*minden achievement*

    - /achievement/:aid
        >*egy achievement*

    - /addachievement
        >*achievement megszerzése*

    ```javascript
    router.get('/userachievements', authenticateToken, loggedinuserachievements);
    router.get('/userachievements/:uid', authenticateToken, userachievements);
    router.get('/all', allachievements);
    router.get('/achievement/:aid', oneachievement);
    router.post('/addachievement', authenticateToken, addachievement);
    ```
    >achievement.routes.js
4. Forum végpontok
    - /newpost
        >*új fórumposzt írása*

    - /allposts
        >*minden fórumposzt*

    - /post/:id
        >*egy fórumposzt*

    - /newcomment/:post_id
        >*új komment írása*

    - /deletepost/:post_id
        >*fórumposzt törlése*

    - /deletecomment/:comment_id
        >*komment törlése*

    - /editpost/:post_id
        >*fórumposzt szerkesztése*

    - /editcomment/:coment_id
        >*komment szerkesztése*

    - /search/:search
        >*keresés*

    ```javascript
    router.post('/newpost', authenticateToken, createPost);
    router.get('/allposts', allPost);
    router.get('/post/:id', singlePost);
    router.post('/newcomment/:post_id', authenticateToken, newComment);
    router.delete('/deletepost/:post_id', authenticateToken, deletePost);
    router.delete('/deletecomment/:comment_id', authenticateToken, deleteComment);
    router.put('/editpost/:post_id', authenticateToken, editPost);
    router.put('/editcomment/:comment_id', authenticateToken, editComment);
    router.get('/search/:search', searchPost);
    ```
    >forum.routes.js
5. Friends végpontok
    - /addfriend/:uid
        >*barátkérelem küldése és elfogadása*

    - /pending
        >*beérkező barátkérelmek listája*

    - /all
        >*saját barátok listája*

    - /all/:uid
        >*más barátainak listája*

    - /removefriend/:uid
        >*barát törlése*

    ```javascript
    router.post('/addfriend/:uid', authenticateToken, addFriend);
    router.get('/pending', authenticateToken, pending);
    router.get('/all', authenticateToken, allFriends);
    router.get('/all/:uid', someoneFriends);
    router.delete('/removefriend/:uid', authenticateToken, removeFriend);
    ```
    >friends.routes.js
6. Game végpontok
    - /upload

        >*játék feltöltése*

    ```javascript
    router.put('/upload', authenticateToken, verifyAdmin, upload.single('game'), uploadGame);
    ```
    >game.routes.js
7. Fájl letöltéshez kapcsolódó végpont
    - /game/WrathHound.exe

        >*játék letöltése*

    ```javascript
    app.use('/game', express.static(path.join(__dirname, 'thegame')));
    ```
    >app.js
---
### Tesztelés
![postman teszt](https://i.snipboard.io/qY6Vg0.jpg)
A projekt jelenleg manuálisan tesztelt és tesztelhető a **Postman** segítségével.

---

### Továbbfejlesztési lehetőség
![eredeti terv](https://i.snipboard.io/UXaO2p.jpg)
Az eredeti tervben emberek közti direkt üzenetek és admin által feltöltött hírek a játék fejlesztésével kapcsolatban is be volt tervezve.
- SQL kiegészítése plusz táblákkal
- Plusz végpontok írása (***/news*** + ***/messages***) 

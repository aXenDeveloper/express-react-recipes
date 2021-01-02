# (Express React) Recipes

Include pages:

-   Home,
-   Login,
-   Register,
-   Error 401 (No permission in protected page),
-   Error 404

## 📖 Table of contents

-   [🏷️ Requirements](#user-content-️-requirements)
-   [🧰 Install](#user-content--install)
-   [🛠️ Update](#user-content-️-update)
-   [📂 Package](#user-content--package)
-   [👨‍👧‍👦 Groups ID](#user-content--groups-id)

## 🏷️ Requirements

-   Node.js
-   Mongoose

## 🧰 Install

### Backend

1. Install backend with **NPM** or **Yarn**:  
   `npm install` or `yarn install`
2. Go to **backend** -> .env_template and rename the file to **.env**
3. Paste the url link that connects to the database **MongoDB**  
   `DB_CONNECT = XXX`
4. Paste uniqe CSRF Token  
   `CSRF_TOKEN = XXX`.
5. _(Optional)_ Go to **backend** -> server.js
6. _(Optional)_ Change the **PORT** on which the server is running  
   `const PORT = 8000;` _(Default: 8000)_
7. Run server:  
   `npm start` or `yarn run`

### Frontend

1. Install frontend with **NPM** or **Yarn**:  
   `npm install` or `yarn install`

## 🛠️ Update

-   test

## 📂 Package

### Front-end

-   React
-   js-cookie
-   SCSS
-   Swiper

### Back-end

-   Express.js
-   bcrypt
-   dotenv
-   jsonwebtoken
-   mongoose

## 👨‍👧‍👦 Groups ID

-   3 - **Member**,
-   4 - **Root**

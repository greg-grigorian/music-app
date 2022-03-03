# Getting Started with Create React App


git init
git remote add origin https://github.com/amidthestars/cs35Lproject.git
git pull
git checkout home-page
cd .\music-app\
npm i
npm start


Install mongodb:

https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/

Mongodb (MAC):
    1. Open terminal and install brew if you do not currently have it. https://brew.sh/#install
    2. Then, in terminal run: "brew tap mongodb/brew"
    3. Then run: "brew install mongodb-community@5.0"
    4. To start mongodb server run: "brew services start mongodb-community@5.0"
    5. To run the music app run: "npm i", then "npm start" while mongodb server is running.
    6. To terminate mongodb server run: "brew services stop mongodb-community@5.0"

Mongodb (Windows):
    1. Install Mongodb using link provided above.
    2. In the windows search box, type in 'env' and select "Edit the system enviornment variables"
    3. In the newly opened window, select 'environment variables', click PATH, click edit, and then click new.
    4. Paste the location of the bin file that was included with the Mongodb download.
    5. Open a new terminal and run the command 'mongodb'
    6. In another terminal, 'npm i' and 'npm start' to run the app.
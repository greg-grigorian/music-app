# Getting Started with our Music App

In a new folder, run the following commands:  
```
git init  
git remote add origin https://github.com/amidthestars/cs35Lproject.git  
git pull  
git checkout home-page  
cd .\music-app\  
npm i  
npm start  
```

Install mongodb:

https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/  
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/  

Mongodb (MAC):  
1. Open terminal and install brew if you do not currently have it.   https://brew.sh/#install
2. Then, in terminal run: "brew tap mongodb/brew"  
3. Then run: "brew install mongodb-community@5.0"  
4. To start mongodb server run: "brew services start mongodb-community@5.0"  
5. To run the music app run: "npm i", then "npm start" in the music-app folder while mongodb server is running.  
6. To terminate mongodb server run: "brew services stop mongodb-community@5.0"  
Note: You may have to use the sudo command in front of step 4.  

Mongodb (Windows):  
1.  Install Mongodb using link provided above.  
2. In the windows search box, type in 'env' and select "Edit the system enviornment variables"  
3. In the newly opened window, select 'environment variables', click PATH, click edit, and then click new.  
4. Paste the location of the bin file that was included with the Mongodb download.  
5. Open a new terminal and run the command 'mongodb'  
6. In another terminal, run 'npm i' and 'npm start' within the music-app folder to run the app.  
It may ask you to create the folder `C:\data\db`. Create that folder if this happens.
You can verify that the database has been correctly set up by running "npm run dev" in the music-app folder. It should say:
```
Listening on port 8000  
Database connected : 127.0.0.1  
```

If you are having trouble connecting to the database, try uninstalling and reinstalling.  
Getting Spotify keys:  
1. Visit https://developer.spotify.com/dashboard/login and create an account.  
2. Click "Create an app."  
3. Give it whatever name and description you wish, then click "Create."  
4. Click on the "Edit Settings" button. Under "Redirect URIS", add the following links:  
```
http://localhost:3000/  
http://localhost:3000/*  
```
5. We will use the client ID and client secret, which can be found under the name you chose for your app, in the next step.    

Creating the .env file:  
1. Make a copy of the .env.example file and call it .env.  
2. Add your client ID from your Spotify app in the REACT_APP_CLIENT_ID, no quotes needed.  
3. Add your client secret ID from your Spotify app in the REACT_APP_CLIENT_SECRET, no quotes needed.  
4. For the REACT_APP_CLIENT_PORT and REACT_APP_SERVER_PORT, you can use any port you want. As an example, we used the ports 3000 and 8000 respectively.
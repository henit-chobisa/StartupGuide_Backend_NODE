from flask import Flask, render_template, request, redirect
import requests
from types import SimpleNamespace, resolve_bases
import random

app = Flask(__name__)

hostURL = "http://127.0.0.1:5500"
loggedInUsers = {}

accessToken = ""
refreshToken = ""

class user():
    def __init__(self,username, email, accessToken, refreshToken) -> None:
        self.username = username
        self.email = email
        self.accessToken = accessToken
        self.refreshToken = refreshToken

class item (object):
    def __init__(self, _id,name,category, description, link, thumbnail ) -> None:
        self.name = name
        self._id = _id
        self.category = category
        self.description = description
        self.link = link
        self.thumbnail = thumbnail

# def decodeObject(obj):
#     if '__type__' in obj and obj['__type__'] == 'item':
#         return item(obj['name'], obj['_id'], obj['category'], obj['description'], obj['link'], obj['thumbnail'])
#     return obj

@app.route('/', methods = ['GET', 'POST'])
def connection():
    return render_template('base.html')

@app.route('/authentication', methods = ['GET', 'POST'])
def authentication():
    return render_template('login.html')

@app.route('/login', methods = ['GET', 'POST'])
def login():
    if request.method == "POST":
        data = {"email" : request.form['email'], "name" : request.form['Username'], "password" : request.form['password']}
        headers = {"content-type" : "application/json"}
        r = requests.post(f"{hostURL}/api/auth/login", json=data, headers = headers)
        data = r.json()
        if r.status_code == 200:
            newUser = user(username=request.form['Username'], email=request.form['email'], accessToken= data['accessToken'], refreshToken=data['refreshToken'])
            newUserID = random.randint(1000000, 9999999)
            loggedInUsers[newUserID] = newUser
            return redirect(f'/homepage/{data["accessToken"]}/{newUserID}')
        else :
            return redirect('/authentication')
    else :
        return "Sorry this route is not accessable"

@app.route('/homepage/<accessToken>/<userID>', methods = ['GET', 'POST'])
def home(accessToken, userID):
    if (loggedInUsers[int(userID)].accessToken == accessToken):
        user = loggedInUsers[int(userID)]
        r = requests.get(f"{hostURL}/api/getBooks")
        books = []
        for element in r.json():
            newItem = item(element['_id'],element['name'],element['category'], element['description'], element['link'], element['thumbnail'])
            books.append(newItem)

        r = requests.get(f"{hostURL}/api/getBlogs")
        blogs = []
        for element in r.json():
            newItem = item(element['_id'],element['name'],element['category'], element['description'], element['link'], element['thumbnail'])
            blogs.append(newItem)

        r = requests.get(f"{hostURL}/api/getNewsletters")
        newsletters = []
        for element in r.json():
            newItem = item(element['_id'],element['name'],element['category'], element['description'], element['link'], element['thumbnail'])
            newsletters.append(newItem)

        r = requests.get(f"{hostURL}/api/getStartupStories")
        startupStories = []
        for element in r.json():
            newItem = item(element['_id'],element['name'],element['category'], element['description'], element['link'], element['thumbnail'])
            startupStories.append(newItem)

        r = requests.get(f"{hostURL}/api/getYoutubeChannels")
        youtubeChannels = []
        for element in r.json():
            newItem = item(element['_id'],element['name'],element['category'], element['description'], element['link'], element['thumbnail'])
            youtubeChannels.append(newItem)

        r = requests.get(f"{hostURL}/api/getPodcasts")
        podcasts = []
        for element in r.json():
            newItem = item(element['_id'],element['name'],element['category'], element['description'], element['link'], element['thumbnail'])
            podcasts.append(newItem)

        r = requests.get(f"{hostURL}/api/getTweets")
        tweets = []
        for element in r.json():
            newItem = item(element['_id'],element['name'],element['category'], element['description'], element['link'], element['thumbnail'])
            tweets.append(newItem)
            
        return render_template('Homepage.html',userID = userID ,user = user, books = books, blogs = blogs, newsletters = newsletters, startupStories = startupStories, youtubeChannels = youtubeChannels, podcasts = podcasts, tweets = tweets)
    else :
        return "Sorry, detected token from malicious route"

@app.route('/addItem/<token>/<userID>' ,methods = ['POST', 'GET'])
def addItem(token, userID):
    if request.method == 'POST':
        print(request.form['name'])
        body = {
            "name" : request.form['name'],
            "category" : request.form['category'],
            "thumbnail" : request.form['thumbnail'],
            "link" : request.form['link'],
            "description" : request.form['description']
        }
        headers = {
            "content-type" : "application/json",
            "authorization" : f"Bearer {token}"
        }
        response = requests.post(f"{hostURL}/api/add{request.form['category']}", json = body, headers=headers)
        data = response.json()
        print(data)

    return render_template('addItemPage.html', token = token, userID = userID)

if __name__ == "__main__" :
    app.run( debug = True )

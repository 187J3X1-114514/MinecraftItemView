from flask import Flask, request
import requests

app = Flask(__name__)

@app.route('/api/modid', methods=['POST'])
def hello():
    data = request.get_json()
    rname = data.get('rname')
    response_data = requests.get('https://api.mcmod.cn/getItem/?regname='+rname).text
    print('api',f'https://www.mcmod.cn/item/{response_data}.html',rname)
    return f'https://www.mcmod.cn/item/{response_data}.html'

@app.route('/', methods=['GET'])
def index():
    with open('index.html','r',encoding='utf8') as f:
        return  f.read()

@app.route('/<json>.json', methods=['GET'])
def itemindex(json):
    with open(json+'.json','r',encoding='utf8') as f:
        return  f.read()
    
@app.route('/fonts/roboto/<file>', methods=['GET'])
def mduifont(file):
    with open('font/'+file,'rb') as f:
        return  f.read()

@app.route('/icons/material-icons/<file>', methods=['GET'])
def mduiicon(file):
    with open('font/'+file,'rb') as f:
        return  f.read()

@app.route('/js/<file>', methods=['GET'])
def mduijs(file):
    with open('js/'+file,'r',encoding='utf8') as f:
        return  f.read()


if __name__ == '__main__':
    app.run(port=5212,debug=True)
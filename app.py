import requests
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/getcoins', methods=['GET'])
@cross_origin()
def getCoins():
    numberofCoins = request.args.get('coins')
    x = requests.get("https://api.coinranking.com/v2/coins?limit="+numberofCoins, headers={'x-access-token': 'coinranking4d2fccb613bc29a0de92e345072da7eb00988a31c685b590'}).json()
    coins = x['data']['coins']
    return jsonify(coins)


@app.route('/getcoindetail', methods=['GET'])
@cross_origin()
def getCoin():
    uuid = request.args.get('uuid')
    x = requests.get("https://api.coinranking.com/v2/coin/"+uuid, headers={'x-access-token': 'coinranking4d2fccb613bc29a0de92e345072da7eb00988a31c685b590'}).json()
    coin = x['data']['coin']
    return coin

@app.route('/searchCoin', methods=['GET'])
@cross_origin()
def searchCoin():
    search = request.args.get('search')
    x = requests.get("https://api.coinranking.com/v2/search-suggestions?query="+search, headers={'x-access-token': 'coinranking4d2fccb613bc29a0de92e345072da7eb00988a31c685b590'}).json()
    coins = x['data']['coins']
    return jsonify(coins)

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True)
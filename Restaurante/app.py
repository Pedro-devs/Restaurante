from flask import Flask, request, jsonify #usando o flask para fazer a api
from flask_mysqldb import MySQL #usando ferramenta para conectar com o mysql
from flask_cors import CORS #usamos isso pro live server funcionar porque são domínios diferentes

app = Flask(__name__)#Iniciar servidor 
CORS(app)

# Configurações de conexão com o banco de dados MySQL
app.config['MYSQL_HOST'] = 'localhost' #tipo de conexão = localhost só roda na nossa máquina
app.config['MYSQL_USER'] = 'root' #nome do usuário
app.config['MYSQL_PASSWORD'] = 'root'#senha do usuário
app.config['MYSQL_DB'] = 'qdelicia' #nome do banco de dados que criamos no mysql

mysql = MySQL(app)#Inicializar conexão com banco de dados usando flask

@app.route('/fazer_pedido', methods=['POST'])#rota que recebe os dados do html
def fazer_pedido():
    #data = recebe os dados em formato JSON recebidos pelo front-end para o back-end
    data = request.get_json()
    prato = data.get('prato')
    preco = data.get('preco')
    email = data.get('email')
    endereco = data.get('endereco')

    #Verificar se os inputs foram preenchidos no html
    if not all([prato, preco, email, endereco]):
        return jsonify({'error': 'Campos obrigatórios não preenchidos'}), 400

    try:
        cur = mysql.connection.cursor()#ferramento para usar o CRUD do MYSQL
        cur.execute("INSERT INTO pedidos (prato, preco, email, endereco) VALUES (%s, %s, %s, %s)",
                    (prato, preco, email, endereco))#Enviar os dados no mysql
        mysql.connection.commit() #salva as alterações no banco de dados
        cur.close()#aqui paramos de usar a ferramenta do crud do mysql

        #se tudo dar certo ele mostra menssagem
        return jsonify({'message': 'Pedido salvo com sucesso!'}), 201
        # se dar errado ele mostra essa menssagem de baixo
    except Exception as e:
        return jsonify({'error': str(e)}), 500

#roda a servidor flask pra magia acontecer
if __name__ == '__main__': 
    app.run(debug=True)

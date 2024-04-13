from flask import Flask, render_template, request, jsonify
from peewee import Model, MySQLDatabase, CharField, IntegerField, SqliteDatabase, DateTimeField
from flask_cors import CORS
from datetime import datetime


app = Flask(__name__)

# Aplicando CORS à aplicação Flask
CORS(app)

# Configurações do banco de dados MySQL 
# db = MySQLDatabase('storage', user='root', password='', host='localhost', port=3306)

# Configurações do banco de dados SQLite
db = SqliteDatabase('storage.sqlite')

# Definindo um modelo Peewee para a tabela
class Pessoa(Model):
    nome = CharField()
    idade = IntegerField()
    email = CharField()
    created_at = DateTimeField(default=datetime.now)  

    class Meta:
        database = db

# Criar a tabela no banco de dados
db.connect()
db.create_tables([Pessoa], safe=True)

# Rota principal que renderiza a página inicial com o formulário React
@app.route('/')
def index():
    return render_template('base.html')

# Rota para processar os dados do formulário enviado pelo React(API)
@app.route('/adicionar_pessoa', methods=['POST'])
def adicionar_pessoa():
    try:
        data = request.get_json()

        nome = data.get('nome')
        idade = data.get('idade')
        email = data.get('email')

        with db.atomic():
            pessoa = Pessoa.create(
                nome=nome,
                idade=idade,
                email=email
            )
        db.commit()  # Certifique-se de que a transação seja commitada
        print(f"Pessoa {pessoa.id} adicionada com sucesso")
        return jsonify({'mensagem': 'Pessoa adicionada com sucesso!'})
    except Exception as e:
        print(f"Erro ao adicionar pessoa: {str(e)}")
        return jsonify({'erro': str(e)})
    

# Rota para obter os dados das pessoas em formato JSON
@app.route('/pessoas')
def obter_pessoas():
    pessoas = Pessoa.select().order_by(Pessoa.created_at.desc())
    pessoas_json = [{'id': pessoa.id, 'nome': pessoa.nome, 'idade': pessoa.idade, 'email': pessoa.email, 'created_at': pessoa.created_at.strftime('%Y-%m-%d %H:%M:%S')} for pessoa in pessoas]
    return jsonify(pessoas_json)


if __name__ == '__main__':
    app.run(debug=True, port=8000)
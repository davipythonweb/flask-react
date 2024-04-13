import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  // O estado inicial (formData) é definido para armazenar os dados do formulário.
  const initialState = {
    nome: '',
    idade: '',
    email: ''
  };

  const [formData, setFormData] = useState(initialState);
  const [pessoas, setPessoas] = useState([]);

  // A função handleChange atualiza o estado conforme os campos do formulário são preenchidos.
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  // A função handleSubmit envia os dados do formulário para a rota /adicionar_pessoa usando axios.post. e limpar os campos
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/adicionar_pessoa', formData);
      console.log(response.data);

      // Atualizar a lista de pessoas após a adição
      fetchPessoas();

      // Limpar os campos do formulário
      setFormData(initialState);
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
    }
  };

  const fetchPessoas = async () => {
    try {
      const response = await axios.get('http://localhost:8000/pessoas');
      setPessoas(response.data);
    } catch (error) {
      console.error('Erro ao obter dados das pessoas:', error);
    }
  };

  useEffect(() => {
    // Carregar dados das pessoas ao montar o componente
    fetchPessoas();
  }, []);

  return (
    <div className="App">
      <h1>Formulário React</h1>
      {/* O formulário renderiza campos de entrada para nome, idade e e-mail, e chama a função handleSubmit quando é submetido. */}
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" name="nome" value={formData.nome} onChange={handleChange}  required/>
        </label>
        <br />
        <label>
          Idade:
          <input type="number" name="idade" value={formData.idade} onChange={handleChange} required/>
        </label>
        <br />
        <label>
          Email:
          <input type="text" name="email" value={formData.email} onChange={handleChange} required/>
        </label>
        <br />
        <button type="submit">Enviar</button>
      </form>
      {/* Tabela para exibir dados das pessoas */}
      <h2>Dados Salvos do Formulario</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Idade</th>
            <th>Email</th>
            <th>Data de Criação</th>
          </tr>
        </thead>
        <tbody>
          {pessoas.map((pessoa) => (
            <tr key={pessoa.id}>
              <td>{pessoa.nome}</td>
              <td>{pessoa.idade}</td>
              <td>{pessoa.email}</td>
              <td>{pessoa.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

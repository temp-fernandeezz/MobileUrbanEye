import axios from 'axios';

export const buscarEnderecoPorCep = async (cep) => {
  try {

    const cepFormatado = cep.replace(/\D/g, '');
    if (cepFormatado.length !== 8) {
      throw new Error('CEP deve ter 8 dígitos');
    }

    const resposta = await axios.get(`https://viacep.com.br/ws/${cepFormatado}/json/`);
    if (resposta.data.erro) {
      throw new Error('CEP não encontrado');
    }

    return resposta.data;
  } catch (error) {
    console.error('Erro ao buscar o endereço:', error.message);
    return null;
  }
};
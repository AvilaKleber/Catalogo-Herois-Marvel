import axios from 'axios';
import md5 from 'md5';

const publicKey = 'SUA_CHAVE_PUBLICA_AQUI'; 
const privateKey = 'SUA_CHAVE_PRIVADA_AQUI';
const ts = new Date().getTime();
const hash = md5(ts + privateKey + publicKey);

const api = axios.create({
  baseURL: 'https://gateway.marvel.com/v1/public',
  params: {
    ts,
    apikey: publicKey,
    hash,
  },
});

export default api;
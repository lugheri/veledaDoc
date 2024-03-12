import dotenv from 'dotenv';
dotenv.config();

import Redis from 'ioredis'

const client = new Redis({
  port: Number(process.env.REDIS_PORT), // Redis port
  host: process.env.REDIS_HOST, // Redis host
  password: process.env.REDIS_PASS
});

//Strings
/**
 * Obtém um valor do Redis com base na conta e coleção especificadas.
 * @param account_name Nome da conta associada ao valor.
 * @param collection Nome da coleção associada ao valor.
 * @returns O valor armazenado no Redis, ou null se não encontrado.
 */
export const redisGetter = async (account_name:string,collection:string) => {
  if (typeof account_name !== 'string' || typeof collection !== 'string') {
    throw new Error('Parâmetros inválidos para redisGetter.');
  }
  const key = `${account_name}:${collection}`
  try{
    const data = await client.get(key);
    if(data){
      return JSON.parse(data)
    }
    return null
  }catch(e){
    console.error('Redis Get Error',e)
    return null
  }
}

/**
 * Define um valor no Redis com uma chave específica e opcionalmente define um tempo de expiração.
 * @param account_name Nome da conta associada ao valor.
 * @param collection Nome da coleção associada ao valor.
 * @param value Valor a ser armazenado no Redis.
 * @param expires Tempo de expiração em segundos (opcional, padrão é 7200 segundos).
 * @returns True se a operação foi bem-sucedida, caso contrário, False.
 */
export const redisSetter = async (account_name:string,collection:string,value:any,expires=0) => {
  if (typeof account_name !== 'string' || typeof collection !== 'string' || value === null || value === undefined) {
    throw new Error('Parâmetros inválidos para redisSetter.');
  }

  const key = `${account_name}:${collection}`
  const expire_time =  expires > 0 ? expires : 7200;
  const data = JSON.stringify(value)
  
  try{
    await client.set(key,data);
    await client.expire(key,expire_time)

    return true
  }catch(e){
    console.error('Redis Set Error',e)
    return false
  }
}

/**
 * Define um valor no Redis com uma chave específica e opcionalmente define um tempo de expiração.
 * @param account_name Nome da conta associada ao valor.
 * @param collection Nome da coleção associada ao valor.
 * @returns True se a operação foi bem-sucedida, caso contrário, False.
 */
export const redisDelete = async (account_name:string,collection:string) => {
  if (typeof account_name !== 'string' || typeof collection !== 'string') {
    throw new Error('Parâmetros inválidos para redisDelete.');
  }
  const key = `${account_name}:${collection}`
  try{
    await client.del(key);
    return true
  }catch(e){
    console.error('Redis Set Error',e)
    return null
  }
}

/**
 * Remove todas as chaves do cache de todas as contas.
 * @returns True se a operação foi bem-sucedida, caso contrário, False.
 */
export const redisDeleteAll = async () => {
  try{
    await client.flushdb()
    return true
  }catch(e){
    console.error('Redis Set Error',e)
    return false
  }
}

/**
 * Escaneia as chaves do Redis correspondentes a um padrão.
 * @param cursor Cursor inicial para a operação de escaneamento.
 * @param pattern Padrão a ser usado para corresponder às chaves.
 * @param account_name Nome da conta associada ao valor.
 * @param keys Array acumulador para armazenar as chaves correspondentes.
 * @returns Uma Promise que resolve em um array de chaves correspondentes ao padrão.
 */
export const scanKeys = async (cursor: number | string, pattern: string, keys: string[] = []): Promise<string[]> => {
  // Validação de entrada
  if (typeof cursor !== 'number' && typeof cursor !== 'string') {
    throw new Error('O cursor deve ser um número ou uma string.');
  }
  if (typeof pattern !== 'string' || pattern.length === 0) {
    throw new Error('O padrão deve ser uma string não vazia.');
  }

  try {
    const [newCursor, result] = await client.scan(cursor, 'MATCH', pattern);
    keys.push(...result);

    // Se o novo cursor for '0', isso significa que a busca foi concluída
    if (newCursor === '0') {
      return keys;
    }

    // Caso contrário, continue a busca com o novo cursor
    return scanKeys(newCursor, pattern, keys);
  } catch (error) {
    console.error('Erro durante o escaneamento de chaves do Redis:', error);
    throw error; // Rejete o erro para que ele seja tratado por quem chamou a função
  }
};


//SETS
/**
 * Adiciona um membro a uma coleção no Redis.
 * @param account_name Nome da conta associada à coleção.
 * @param collection Nome da coleção à qual o membro será adicionado.
 * @param member Membro a ser adicionado à coleção.
 * @param expires Tempo de expiração do conjunto em segundos (padrão: 30 segundos).
 * @returns Uma Promise que resolve em true se a adição for bem-sucedida, ou false caso contrário.
 */
export const addCollection  = async (account_name:string,collection:string,member:string,expires:number) => {
  if (typeof account_name !== 'string' || typeof collection !== 'string' || typeof member !== 'string') {
    throw new Error('Parâmetros inválidos para removeCollection.');
  }
  const key = `${account_name}:${collection}`
  const expire_time =  expires ?? 30;
  try{
    //console.log("EXPIRE TIME >>",keyReg,expire_time)

    const value = JSON.stringify(member)
    await client.sadd(key,value)
    await client.expire(key,expire_time)
    return true
  }catch(error){
    console.error(`Erro ao adicionar membro "${member}" à coleção "${collection}" do Redis:`, error);    
    return false
  }
}

/**
 * Remove um membro de uma coleção no Redis.
 * @param account_name Nome da conta associada à coleção.
 * @param collection Nome da coleção da qual o membro será removido.
 * @param member Membro a ser removido da coleção.
 * @returns Uma Promise que resolve em true se a remoção for bem-sucedida, ou false caso contrário.
 */
export const removeCollection = async (account_name:string,collection:string,member:string) => {
  if (typeof account_name !== 'string' || typeof collection !== 'string' || typeof member !== 'string') {
    throw new Error('Parâmetros inválidos para removeCollection.');
  }
  const key = `${account_name}:${collection}`
  try{
    await client.srem(key,member)
    return true
  }catch(error){
    console.error(`Erro ao remover membro "${member}" da coleção "${collection}" do Redis:`, error);    
    return false
  }
}

/**
 * Verifica se um membro existe em uma coleção do Redis.
 * @param account_name Nome da conta associada à coleção.
 * @param collection Nome da coleção a ser verificada.
 * @param member Membro a ser verificado na coleção.
 * @returns Uma Promise que resolve em true se o membro existir na coleção, ou false caso contrário.
 */
export const checkCollection  = async (account_name:string,collection:string,member:string) => {
  if (typeof account_name !== 'string' || typeof collection !== 'string' || typeof member !== 'string') {
    throw new Error('Parâmetros inválidos para checkCollection.');
  }
  const key = `${account_name}:${collection}`
  try{
    const check = await client.sismember(key,member)
    return check
  }catch(e){
    console.error('Redis checkCollection Error',e)
    return false
  }
}

/**
 * Conta os itens de uma coleção.
 * @param account_name Nome da conta associada ao valor.
 * @param collection Nome da coleção associada ao valor.
 * @returns Retorna os itens de uma coleção.
 */
export const getCollection = async (account_name:string,collection:string) => {
  if (typeof account_name !== 'string' || typeof collection !== 'string') {
    throw new Error('Parâmetros inválidos para getCollection.');
  }
  const key = `${account_name}:${collection}`
  try{
    const result = await client.smembers(key);
    if(result === null){ return null}
    return result
  }catch(e){
    console.error('Redis Get Sets',e)
    return false
  }
}

/**
 * Conta os itens de uma coleção.
 * @param account_name Nome da conta associada ao valor.
 * @param collection Nome da coleção associada ao valor.
 * @returns Retorna o número total de itens.
 */
export const countCollection = async (account_name:string,collection:string) => {
  if (typeof account_name !== 'string' || typeof collection !== 'string') {
    throw new Error('Parâmetros inválidos para getCollection.');
  }
  const key = `${account_name}:${collection}`
  try {
    const total = await client.scard(key)
    return total
  }catch(e){
    console.error('Redis sCard Error',e)
    return false
  }
}
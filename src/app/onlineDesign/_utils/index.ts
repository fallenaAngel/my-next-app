/*
* Created by 李丁丁 at 2024/6/26
* */
export function generateRandomString(length = 5, prefix = '') {
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return prefix ? (prefix + '_' + result) : result;
}

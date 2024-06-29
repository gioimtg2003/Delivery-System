export const formatPhoneNumber = (text: string) => {
  let cleaned = ('' + text).replace(/\D/g, '');
  let formatted = cleaned.match(/.{1,3}/g)?.join(' ') || '';
  return formatted;
};

export const queryStringToObject = (queryString: string) => {
  const pairs = queryString.substring(1).split("&");
  const array = pairs.map((el) => {
    const parts = el.split("=");
    return parts;
  });
  return Object.fromEntries(array);
};

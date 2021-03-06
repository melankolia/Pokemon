const Converter = {
  parsingImage(id) {
    if (id) return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    return null
  },
  parsingId(arg) {
    const id = arg.url.split("/")[arg.url.split("/").length -2];
    if (id) return id;
    return null;
  },
  embedImage(arg) {
    const id = arg.url.split("/")[arg.url.split("/").length -2];
    if (id) return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    return null
  },
  arrToObj(callback, data) {
    let obj = {};
    data.forEach(e => callback(e, obj))
    return obj;
  },
  parsingParams(arg) {
    const params = arg?.split("?")[1];
    if (params) {
    const urlParams = new URLSearchParams(params);
    const limit = urlParams.get('limit');
    const offset = urlParams.get('offset');
    return {limit, offset};
    }
    return null
},
};

export default Converter;
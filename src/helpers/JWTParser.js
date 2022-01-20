const parseJwt = (token) => {
  try {  
      console.log(JSON.parse(atob(token.split('.')[0])),
      JSON.parse(atob(token.split('.')[1])));
    return [
        JSON.parse(atob(token.split('.')[0])),
        JSON.parse(atob(token.split('.')[1]))
    ];
  } catch (e) {
    console.log(e);
    return null;
  }
};

export default parseJwt;
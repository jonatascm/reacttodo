export const isAuthenticated = async () => {
  const storeString = await localStorage.getItem('@ReactTodoApi');

  if(storeString){
    const store = await JSON.parse(storeString);

    if(store.token){
      return true;
    }else{
      return false;
    }
      
  }else{
    return false;
  }
};


export default isAuthenticated;
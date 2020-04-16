import { create } from 'apisauce';

const api = create({
  baseURL: 'http://localhost:1337',
});

api.addAsyncRequestTransform(request => async () => {
  const storeString  = await localStorage.getItem('@ReactTodoApi');  

  if(storeString){
    const store = await JSON.parse(storeString);

    if(store.token)
      request.headers['Authorization'] = `Bearer ${store.token}`;
  }
});

api.addResponseTransform(response => {
  if(!response.ok) throw response;
});


export default api;
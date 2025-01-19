import { httpClient } from "../config/Axioshelper"

 export const createroomapi = async (roomdetial)=>{
     const response = await httpClient.post('/rooms',roomdetial,{
        headers:{
       "Content-Type":"text/plain"
        },
     })
     return response.data
 }
 export const joinroomapi =  (roomName) => {
    try {
      const response = httpClient.get(`/rooms/${roomName}`);
      return response// Return the room ID if the request is successful
    } catch (error) {
      throw new Error(`Failed to join the room: ${error.message}`);
    }
  };
import {useDispatch} from 'react-redux'
import { login,register,getMe} from "../service/auth.api";
import { setError,setUser,setLoading } from "../auth.slice";

export  function useAuth(){
    const dispatch = useDispatch();

    
    async function handleRegister({username,email,password}){
        try{
            dispatch(setLoading(true));
            

            const data = await register({username,email,password});
            // dispatch(setUser(user))

            console.log(data);

            // return data

        }catch(error){
            dispatch(setError(error.response.data.message|| "registration failed"));
        }finally{
            dispatch(setLoading(false))
        }
    }


    async function handleLogin({email,password}){
        try{
            dispatch(setLoading(true))
            
            const data = await login({email,password});
            dispatch(setUser(data.user))
            console.log(data.user);

            // return data
        }catch (error) {
         dispatch(setError(error.message));
         throw error;

        }finally{
        dispatch(setLoading(false))
      }
        


    }

    async function handleGetMe(){
        try{
            dispatch(setLoading(true));
            const data = await getMe();

            dispatch(setUser(data.user));
        }catch(err){
            dispatch(setError(err.response?.data?.message || "failed to fetched user"))
        }finally{
            dispatch(setLoading(false));
        }
    }
    return{handleLogin,handleRegister, handleGetMe}

}
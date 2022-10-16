import { useState, useEffect } from "react";
import axios from "axios";

const getToken = () => {
    const [value, setValue] = useState('')
  
    useEffect(() => {
      setValue(localStorage.getItem('token'))
    }, [])
  
    return value
}

const getUser = () => {
    const [value, setValue] = useState('')
  
    useEffect(() => {
        const user = localStorage.getItem('user');
        if(user !== 'undefined' || user){
            setValue(JSON.parse(user))
        }
    }, [])
  
    return value
}

const resetUserSession = () => {
    useEffect(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }, [])
}

const verifyToken = () => {
    const [value, setValue] = useState('')
    const verifyUrl = `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/verify`;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token === 'undefined' || token === undefined || token === null || !token){
            setValue(false)
        }else{
            const requestConfg = {
                headers: {
                    'x-api-key': process.env.NEXT_PUBLIC_API_KEY
                }
            }
            const requestBody = {
                user: JSON.parse(localStorage.getItem('user')),
                token: token
            }
    
            axios.post(verifyUrl, requestBody, requestConfg).then(response => {
                setValue(true)
            }).catch(error => {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                setValue(false)
            })
        }
    }, [])
  
    return value
}
  
module.exports.getToken = getToken;
module.exports.getUser = getUser;
module.exports.resetUserSession = resetUserSession;
module.exports.verifyToken = verifyToken;
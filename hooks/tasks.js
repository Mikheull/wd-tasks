import { useState, useEffect } from "react";
import axios from "axios";

const getTasks = () => {
  const token = localStorage.getItem('token');
  const getTasksUrl = `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/tasks`;
  
  
  if(token){
      const requestConfg = {
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY
        }
      }
      const requestBody = {
        token: token
      }

      axios.post(getTasksUrl, requestBody, requestConfg).then(response => {
        return response.data.tasks
      }).catch(error => {
        return 'error API'
      })
  }else{
    return 'error Token'
  }
}

  
module.exports.getTasks = getTasks;
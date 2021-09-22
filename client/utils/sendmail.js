import axios from 'axios';

export const sendEmail = async (recipientEmail, subject, msgData) => {
    try{
      const resp = await axios.post('/api/tripattendees/send/', { recipientEmail, subject, msgData });
    }
    catch(ex){
      console.log('ERROR updating user response', ex);
    }
  }
  
import axios from 'axios';
import { logger } from '../../config/logger';
import ITwilioService from '../contracts/ITwilioService';

export default class TwilioService implements ITwilioService {
    private auth: { twilioSid: string; twilioAuth: string };

    constructor(twilioSid, twilioAuth) {
        const auth = {
            twilioSid,
            twilioAuth,
        };
        this.auth = auth;
    }

    /*
     * Add Date: 05th July, 2023
     * Change By: Mohiuddin
     * Title: Send SMS through by TWILIO sms gateway provider
     * Return: string message
     */
    sendMessage = async (body: string, from: string, to: string) => {
        try {
            // return 'true';
            const url = `https://api.twilio.com/2010-04-01/Accounts/${this.auth.twilioSid}/Messages.json`;

            const requestBody = new URLSearchParams();
            requestBody.append('Body', body);
            requestBody.append('From', `+${from}`);
            requestBody.append('To', `+${to}`);

            try {
                const response = await axios.post(url, requestBody.toString(), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    auth: {
                        username: this.auth.twilioSid,
                        password: this.auth.twilioAuth,
                    },
                });

                console.log('sendMessage in TwilioService', response.status);

                return `Message sent successfully:${response.data}`;
            } catch (error) {
                logger.error(error);
                console.log(error);
                return false;
            }
        } catch (error) {
            logger.error(error);
            console.log(error);
            return false;
        }
    };
}

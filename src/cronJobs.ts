import * as cron from 'node-cron';

// schedule tasks to be run on the server
export const scheduleCronJobs = () => {
    cron.schedule('* * * * *', async () => {
        try {
            console.log('Cron job running every minute for generate pdf files');
        } catch (error) {
            console.error('Error in cron job:', error);
        }
    });
};


const cron = require('node-cron');
const fetch = require('node-fetch');

const resetVoterStatus = async () => {
  try {
    const response = await fetch('/api/resetvoters', {
      method: 'POST',
    });
    const data = await response.json();
    console.log(data.message);
  } catch (error) {
    console.error('Error:', error);
  }
};

// Run the function every day at 1:00 AM
cron.schedule('0 1 * * *', () => {
  resetVoterStatus();
});

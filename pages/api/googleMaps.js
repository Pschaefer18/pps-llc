import axios from 'axios';

export default async function handler(req, res) {
  const { destination } = req.query;
  const apiKey = 'AIzaSyDOKyq9wR9xhbYmgv9b1IFLrEDFQxYrHSk';
  const origin = '4375 Eastgate Dr, Ann Arbor, MI';
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}
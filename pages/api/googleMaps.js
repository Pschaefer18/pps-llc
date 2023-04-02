import axios from "axios";

const calculateDistance = async (destination) => {
    const apiKey = "AIzaSyDOKyq9wR9xhbYmgv9b1IFLrEDFQxYrHSk"
    const origin = '4375 Eastgate Dr, Ann Arbor, MI'
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`

    axios.get(url,)
    .then(response => {
        console.log(response.data)
    })
}

export default calculateDistance
const Treasure = require('../models/Treasure');
const MoneyValue = require('../models/MoneyValue');


exports.getNearbyTreasures = async (req, res) => {
  try {
    const {lon, lat, dist} = req.body;
    const priceValue = req.query.price_value;
    
    if (dist == '' || lon == '' || lat == ''){
        return res.status(400).json({ error: 'All fields are required.' });
    }
    if (dist != '1' && dist != '10') {
        return res.status(400).json({ error: 'Invalid distance. Dist must be either 1 or 10.' });
    }

    if (priceValue != '' && (priceValue < 10 || priceValue > 30)){
        return res.status(400).json({ error: 'Price value could not go less than 10 or greater than 30. Price value is optional.' });
    }
    
    if(typeof priceValue != "undefined" && priceValue != '' && !Number.isInteger(Number(priceValue))){
        return res.status(400).json({ error: 'Price value only accepts integers.' });
    }

    const treasures = await Treasure.findAll({
        include: [
          {
            model: MoneyValue,
            attributes: ['amt'],
            as: 'moneyValue', 
          },
        ],
      });

    const nearbyTreasures = [];
    for(let treasure of treasures){
        const distance = calculateDistance(lat, lon, treasure.latitude, treasure.longitude);
        if(distance<=dist){
            if(priceValue!='' && typeof priceValue != "undefined"){
              for(let amount of treasure.moneyValue){
                if(amount.amt >= priceValue){
                  nearbyTreasures.push(treasure);
                  break;
                }
              }
            }else{
              nearbyTreasures.push(treasure);
            }
        }
    }
    res.json({treasures: nearbyTreasures});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const calculateDistance = (lat1, lon1, lat2, lon2)=>{
    const earthRadius = 6371; 
  
    const degToRad = (degrees) => {
      return degrees * (Math.PI / 180);
    };
  
    const dLat = degToRad(lat2 - lat1);
    const dLon = degToRad(lon2 - lon1);
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degToRad(lat1)) *
        Math.cos(degToRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
  
    return distance;
}
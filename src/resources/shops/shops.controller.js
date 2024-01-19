const shopModel = require('./shops.model');
const userModel = require('../users/users.model');
const {ApiKeyManager} = require('@esri/arcgis-rest-request');
const {geocode} = require('@esri/arcgis-rest-geocoding');

const authentication = ApiKeyManager.fromKey(process.env.ARCGIS_API_KEY);

module.exports = {

    async getShop (req, res) {
        const {id} = req.params;
        try {
            const shop = await shopModel.findById(id);
            return res.status(200).json({ok: true, data: shop});
        } catch (err) {
            return res.status(500).json({ok: false, data: err})
        }
    },

    async getShops(req, res) {
        try {
            const shops = await shopModel.find();
            return res.status(200).json({ok: true, data: shops});
        } catch (err) {
            return res.status(500).json({ok: false, data: err})
        }
    },

    async createShop(req, res) {
        const user = await userModel.findById(req.user.id);
        if (user.role !== 'merchant') {
            return res.status(403).json({ok: false, data: 'You are not allowed to create a shop'})
        }
        if (req.body.coordinates) {
            try {
                const shop = await shopModel.create({...req.body, owner: req.user.id});
                await userModel.findByIdAndUpdate(req.user.id, {$push: {shops: shop._id}});
                return res.status(201).json({ok: true, data: shop});
            } catch (err) {
                return res.status(500).json({ok: false, data: err})
            }
        }
        const {address, postalCode, country} = req.body;
        let coordinates 

       await geocode({
            address: address,
            postal: postalCode,
            countryCode: country,
            authentication
          }).then((res) => {
           coordinates = {x: res.candidates[0].location.x, y: res.candidates[0].location.y};
          });

        try {
            const shop = await shopModel.create({...req.body, coordinates, owner: req.user.id});
            await userModel.findByIdAndUpdate(req.user.id, {$push: {shops: shop._id}});
            return res.status(201).json({ok: true, data: shop});
        } catch (err) {
            return res.status(500).json({ok: false, data: err})
        }
    }

}
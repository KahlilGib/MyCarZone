const { Category, Order, Product, User, UserProfile } = require('../models');
const { formatToRupiah } = require('../helper');
const { Op } = require('sequelize');


class Controllers {

    static home(req, res) {
        try {
            res.render('home')
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }

    static async product(req, res) {
        try {
            const { search } = req.query;
            let product;

            if (search) {
                product = await Product.findAll({
                    where: {
                        name: {
                            [Op.like]: `%${search}%`
                        }
                    }
                });
            } else {
                product = await Product.findAll();
            }
            res.render('product', { product, formatToRupiah, search });
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }

    static async productDetail(req, res) {
        try {
            console.log(req.params)
            const { id } = req.params
            let product = await Product.findByPk(id);

            res.render("productDetail", { product, formatToRupiah });
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }
}

module.exports = Controllers
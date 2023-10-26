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
                            [Op.iLike]: `%${search}%`
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

    static async addProductForm(req, res) {
        try {
            const categories = await Category.findAll()
            res.render("addProduct", {categories});
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }

    static async createProduct(req, res) {
        const {name, price, fuelType, transmissionType, carImage, description, CategoryId } = req.body;
        const data = {
            name : name,
            fuelType : fuelType,
            price : +price,
            transmissionType : transmissionType,
            carImage : carImage,
            description : description,
            CategoryId : CategoryId,

        }
        try {
         console.log(req.body)
         await Product.create(data)
         res.redirect("/product")
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }

    static async showEditProductForm (req, res) {
          try {

            const categories = await Category.findAll()
            const products = await Product.findByPk(req.params.id, {
                include : Category
            });
            // console.log( "ini categories >>>",categories)

            res.render('editProduct', {products, categories});

        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }

    static async updateProduct(req, res) {
        const {name, price, fuelType, transmissionType, carImage, description, CategoryId} = req.body;

        try {
            await Product.update({name, price : +price, fuelType, transmissionType, carImage, description, CategoryId}, {
                where : {
                    id : req.params.id
                }
            });

            res.redirect(`/product/${req.params.id}`);
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }

    static async deleteProduct(req, res) {
        try {
            await Product.destroy({
                where : {
                    id : req.params.id
                }
            });

            res.redirect(`/product`);
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }


}

module.exports = Controllers
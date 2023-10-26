const { Category, Order, Product, User, UserProfile } = require('../models');
const { formatToRupiah } = require('../helper');
const { Op } = require('sequelize');
const niceInvoice = require("nice-invoice");
const bcrypt = require('bcrypt')


class Controllers {

    static async home(req, res) {
        try {
            const {errors} = req.query
            res.render('home', {errors})
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }

    static postLogin(req, res) {
        const {email, password} = req.body
        if(!email) {
            const error = "Please insert your email"
            return res.redirect(`/?errors=${error}`)
        }
        User.findOne({
            where: { email: email}
        })
            .then((result) => {
                console.log(result);
                if (!result) {
                    const error = "Email not registered"
                    return res.redirect(`/?errors=${error}`)
                } else {
                    const validatePassword = bcrypt.compareSync(password, result.password)
                    console.log(validatePassword);
                    if(!validatePassword) {
                        const error = "Password is incorrect"
                        return res.redirect(`/?errors=${error}`)
                    } else {
                        if (result.role === "Seller") {
                            res.redirect('/product')
                        } else {
                            res.redirect(`/customerProduct`)
                        }
                    }
                }
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static async customerProduct(req, res) {
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
            res.render('customerProduct', { product, formatToRupiah, search });
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

    static async productDetailCustomer(req, res) {
        try {
            console.log(req.params)
            const { id } = req.params
            let product = await Product.findByPk(id);

            res.render("customerProductDetail", { product, formatToRupiah });
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }

    static async addProductForm(req, res) {
        try {
            const categories = await Category.findAll()
            res.render("addProduct", { categories });
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }

    static async createProduct(req, res) {
        const { name, price, fuelType, transmissionType, carImage, description, CategoryId } = req.body;
        const data = {
            name: name,
            fuelType: fuelType,
            price: +price,
            transmissionType: transmissionType,
            carImage: carImage,
            description: description,
            CategoryId: CategoryId,

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

    static async showEditProductForm(req, res) {
        try {
            const categories = await Category.findAll()
            const products = await Product.findByPk(req.params.id, {
                include: Category
            });
            // console.log( "ini categories >>>",categories)

            res.render('editProduct', { products, categories });

        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }

    static async updateProduct(req, res) {
        const { name, price, fuelType, transmissionType, carImage, description, CategoryId } = req.body;

        try {
            await Product.update({ name, price: +price, fuelType, transmissionType, carImage, description, CategoryId }, {
                where: {
                    id: req.params.id
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
                where: {
                    id: req.params.id
                }
            });

            res.redirect(`/product`);
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }

    static async order(req, res) {
        try {
            const productId = req.params.id;
            const product = await Product.findByPk(productId, {
                include: Category
            });

            res.render('order', { product, formatToRupiah });
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }

    static async invoice(req, res) {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-US');
        const invoiceNumber = `INV-${currentDate.getFullYear()}${currentDate.getMonth() + 1}${currentDate.getDate()}-${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getSeconds()}`;
        try {
            const productId = req.params.id;
            const product = await Product.findByPk(productId, {
                include: Category
            });

            res.render('invoice', { product, formatToRupiah, formattedDate, invoiceNumber });
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }

    static async generateInvoice(req, res) {
        const currentDate = new Date();
        const invoiceNumber = `INV-${currentDate.getFullYear()}${currentDate.getMonth() + 1}${currentDate.getDate()}-${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getSeconds()}`;
        const formattedDate = currentDate.toLocaleDateString('en-US');
        try {
            const productId = req.params.id;
            const product = await Product.findByPk(productId, {
                include: Category
            });
            
            const invoiceData = {
                shipping: {
                    name: "Micheal",
                    address: "1234 Main Street",
                    city: "Dubai",
                    state: "Dubai",
                    country: "UAE",
                    postal_code: 94111
                },
                items: [
                    {
                        item: "mobil",
                        description: "Product Description",
                        quantity: 1,
                        price: "product.price",
                    },
                ],
                subtotal: 156,
                total: 156,
                order_number: 1234222,
                header: {
                    company_name: "Nice Invoice",
                    company_logo: "",
                    company_address: "Nice Invoice. 123 William Street 1th Floor New York, NY 123456"
                },
                footer: {
                    text: "This is footer - you can add any text here"
                },
                currency_symbol: "$",
                date: {
                    billing_date: "08 August 2020",
                    due_date: "10 September 2020",
                }
            };

            niceInvoice(invoiceData, 'your-invoice-name.pdf');

            res.redirect('product', { product, formatToRupiah, formattedDate, invoiceNumber, invoice });
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }

    static async register(req, res) {
        try {
            res.render("register")
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }

    static async postRegister(req, res) {
        const {email, password, role} =req.body
        try {
            await User.create({email, password, role})
            res.redirect("/")
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }

    static logout(req, res) {
        try {
            res.redirect('/'); 
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }
}

module.exports = Controllers
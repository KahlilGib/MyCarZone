const Controllers = require('../controllers/controllers');
const router = require('express').Router();

router.get('/', Controllers.home);
router.post('/', Controllers.postLogin) // halaman home untuk registrasi/login
router.get('/logout', Controllers.logout); // halaman home untuk logout

router.get('/register', Controllers.register)
router.post('/register', Controllers.postRegister)

router.get('/user-profile'); // halaman untuk menampilkan user profile

router.get('/user-profile/edit'); // halaman untuk edit user profile
router.post('/user-profile/edit'); 

router.get('/product', Controllers.product);
router.get('/customerProduct', Controllers.customerProduct); // halaman list product

router.get('/product/add', Controllers.addProductForm); // menampilkan form untuk menambah product
router.post('/product/add', Controllers.createProduct);

router.get('/product/:id', Controllers.productDetail); // halaman detail product
router.get('/productCustomer/:id', Controllers.productDetailCustomer);

router.get('/product/edit/:id', Controllers.showEditProductForm); // menampilkan form untuk mengedit product
router.post('/product/edit/:id', Controllers.updateProduct); 

router.get('/order/:id', Controllers.order); // halaman untuk melihat barang apa saja yang ingin di beli

router.get('/invoice/:id', Controllers.invoice); // halaman untuk melihat invoice

router.get('/download-invoice/:invoiceNumber', Controllers.generateInvoice);

router.get('/product/delete/:id', Controllers.deleteProduct); //untuk menghapus product

module.exports = router;
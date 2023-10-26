const Controllers = require('../controllers/controllers');

const router = require('express').Router();

router.get('/', Controllers.home); // halaman home untuk registrasi/login
router.get('/logout'); // halaman home untuk logout

router.get('/user-profile'); // halaman untuk menampilkan user profile

router.get('/user-profile/edit'); // halaman untuk edit user profile
router.post('/user-profile/edit'); 

router.get('/product', Controllers.product); // halaman list product

router.get('/product/add'); // menampilkan form untuk menambah product
router.post('/product/add');

router.get('/product/:id', Controllers.productDetail); // halaman detail product

router.get('/product/edit/:id'); // menampilkan form untuk mengedit product
router.post('/product/edit/:id'); 

router.get('/order/:idProduct'); // halaman untuk melihat barang apa saja yang ingin di beli

router.get('/invoice/:id'); // halaman untuk melihat invoice

router.get('/delete/:id'); //untuk menghapus product

module.exports = router;
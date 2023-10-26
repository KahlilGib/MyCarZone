
const router = require('express').Router();

router.get('/'); // halaman home untuk registrasi/login

router.get('/user-profile'); // halaman untuk edit user profile
router.post('/user-profile'); 

router.get('/product'); // halaman list product

router.get('/product/add'); // menampilkan form untuk menambah product
router.post('/product/add');

router.get('/product/:id'); // halaman detail product

router.get('/product/edit/:id'); // menampilkan form untuk mengedit product
router.post('/product/edit/:id'); 

router.get('/order/:idProduct'); // halaman untuk melihat barang apa saja yang ingin di beli

router.get('/invoice/:id'); // halaman untuk melihat invoice
router.post('/invoice/:id');

router.get('/delete/:id'); //untuk menghapus product

module.exports = router;
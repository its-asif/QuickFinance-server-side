const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const SSLCommerzPayment = require('sslcommerz-lts');
const Payment = require('../schema/paymentSchema');

const store_id = `${process.env.STORE_ID}`;
const store_passwd = `${process.env.STORE_PASS}`;
const is_live = false; //true for live, false for sandbox

router.post('/', async (req, res) => {
    console.log(req.body);
    const transId = new ObjectId().toString();

    const pay = req.body;
    const data = {
        total_amount: pay.amount,
        currency: pay.currency_type,
        tran_id: transId, // use unique tran_id for each api call
        success_url: `https://quick-finance-server-side.vercel.app/api/payments/payment/success/${transId}`,
        fail_url: `https://quick-finance-server-side.vercel.app/api/payments/payment/fail/${transId}`,
        cancel_url: 'http://localhost:3030/cancel',
        ipn_url: 'http://localhost:3030/ipn',
        shipping_method: 'Bank',
        product_name: pay.organizer_name,
        product_category: pay.trxType,
        product_profile: 'general',
        cus_name: pay.name,
        cus_email: pay.email,
        cus_add1: pay.address,
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: pay.post_code,
        cus_country: 'Bangladesh',
        cus_phone: pay.phone_no,
        cus_fax: '01711111111',
        ship_name: pay.organizer_name,
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
        
    };
    

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    sslcz.init(data).then(apiResponse => {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL;
        res.send({ url: GatewayPageURL });

        const finalData = {
            payment_status:false,
            tran_id: transId,
            email: pay.email,
            trxType: pay.trxType,
            amount: pay.amount,
            organizer_name: pay.organizer_name,
            currency_type: pay.currency_type,
            name: pay.name,
            address: pay.address,
            post_code: pay.post_code,
            phone_no: pay.phone_no,
        };
        const newPayment = new Payment(finalData);
        const result = newPayment.save();
        
        console.log('Redirecting to: ', GatewayPageURL);
    });
});

router.post('/payment/success/:tranId', async (req, res) => {
    console.log(req.params.tranId);
    const result = await Payment.updateOne({ tran_id: req.params.tranId }, {
        $set: {
            payment_status:true
        }
    });
    
    if (result.modifiedCount > 0) {
        res.redirect(`https://quickfinance-a948a.web.app/payment/success/${req.params.tranId}`);
       
    }
});

router.post("/payment/fail/:tranId", async (req, res) => {
    const result = await Payment.deleteOne({ tran_id: req.params.tranId });
    
    if (result.deletedCount) {
        res.redirect(`https://quickfinance-a948a.web.app/payment/fail/${req.params.transId}`);
       
    }
});

router.get('/', async (req, res) => {
    try {
        const payments = await Payment.find();
        res.send(payments);
    } catch (err) {
        res.send("Error " + err);
    }
});
router.delete('/', async (req, res) => {
    try {
        const payments = await Payment.deleteMany()
        res.send(payments);
    } catch (err) {
        res.send("Error " + err);
    }
});
router.get("/:email", async (req, res) => {
    const email = req.params.email;
    try {
        const payments = await Payment.find({ email });
        res.send(payments);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

module.exports = router;

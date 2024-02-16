const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const SSLCommerzPayment = require('sslcommerz-lts');
const Payment = require('../schema/paymentSchema');

const store_id = `${process.env.STORE_ID}`;
const store_passwd = `${process.env.STORE_PASS}`;
const is_live = true; // true for live, false for sandbox

router.get('/', async (req, res) => {
    try {
        const payments = await Payment.find();
        res.json(payments);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

// get by email
router.get('/:email', async (req, res) => {
    const email = req.params.email;
    try {
        const payments = await Payment.find({ email });
        res.json(payments);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.post('/', async (req, res) => {
    let data; // Define data variable outside the try block
    try {
        console.log(req.body);
        const transId = new ObjectId().toString();
        const pay = req.body;

        data = {
            
            total_amount: pay.amount,
            currency: pay.currency_type,
            tran_id: transId, // use unique tran_id for each api call
            success_url: `https://quickfinance-a948a.web.app/payment/success/${transId}`,
            fail_url: 'http://localhost:3030/payment/fail',
            cancel_url: 'http://localhost:3030/cancel',
            ipn_url: 'http://localhost:3030/ipn',
            shipping_method: 'Courier',
            product_name: 'Computer.',
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

        console.log(data);

        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
        const apiResponse = await sslcz.init(data);

        let GatewayPageURL = apiResponse.GatewayPageURL;

        const finalData = {
            amount: pay.amount,
            currency_type: pay.currency_type,
            organizer_name: pay.organizer_name,
            trxType: pay.trxType,
            name: pay.name,
            address: pay.address,
            post_code: pay.post_code,
            phone_no: pay.phone_no,
            email: pay.email,
            payment_status: 'true',
            tran_id: transId,
        };

        const newPayment = new Payment(finalData);
        await newPayment.save();

        console.log('Redirecting to:', GatewayPageURL);
        res.send({ url: GatewayPageURL });
    } catch (error) {
        console.error('Error:', error);
        console.error('Data:', data); // Log data to debug
        res.status(500).send('Internal Server Error');
    }
});


router.post('/payment/success/:tranId', async (req, res) => {
    try {
        const { tranId } = req.params;
        console.log(tranId);
        const result = await Payment.updateOne({ tran_id: tranId }, { $set: { payment_status: 'true' } });
        // if (result.modifiedCount > 0) {
        //     res.redirect(`https://quickfinance-a948a.web.app/payment/success/${tranId}`);
        // }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/payment/fail/:transId', async (req, res) => {
    try {
        const { transId } = req.params;
        const result = await Payment.deleteOne({ tran_id: transId });
        // if (result.deletedCount) {
        //     res.redirect(`https://quickfinance-a948a.web.app/payment/fail/${transId}`);
        // }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;

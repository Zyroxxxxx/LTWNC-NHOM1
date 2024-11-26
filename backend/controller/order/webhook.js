const stripe = require('../../config/stripe')

const endpointSecret = process.env.STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY

async function getLineItems(lineItems) {
    let ProductItems = []
    if(lineItems?.data?.lenght){
        for(const item of lineItems.data){
            const product = await stripe.products.retrieve(item.price.product)
            const productId = product.metadata.productId

            const productData = {
                product : productId,
                name : product.name,
                price : item.price.unit_amount,
                quantity : item.quantity,
                image: product.image
            }
            ProductItems.pust(productData)

    }
    }   
    return ProductItems   
}

const webhooks = async(request, response) => {
    const sig = request.headers['stripe-signature'];

    const payloadString = JSON.stringify(request.body)

    const header = stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret: endpointSecret,
    })

    let event;

    try {
        event = stripe.webhooks.constructEvent(payloadString, header, endpointSecret);
    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;

            const lineItems = await stripe.checkout.session.listLineItems(session.id)

            const productDetails = await getLineItems(lineItems)

            const orderDetails = {
                productDetails : productDetails,
                email : session.customer_email,
                userId : session.metadata.userId,
                paymentDetails: {
                    paymentId: session.payment_intent,
                    payment_method_type:  session.payment_method_types,
                    payment_status: session.payment_status,
                },
                shipping_options : session.shipping_options,
                totalAmount : session.amout.total
            }

            const order = new orderModel(orderDetails)
            const saveOrder = await order.save()
            break;

            default:
                console.log(`Unhandle event type ${event.type}`);
    }

    response.status(200).send();
}

    module.exports = webhooks

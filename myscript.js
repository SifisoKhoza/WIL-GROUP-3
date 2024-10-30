const product = [
    {
        id: 0,
        /*Stockdale.com. 2024. First Aid Kit. [Online]. Available at: https://stockcake.com/i/first-aid-kit_1133898_950161 [Accessed 26 November 2024]*/
        image: './images/First-Aid2.png',
        title: 'First Aid',
        description: 'Duration: 6 Months',
        price: 1500,
    },
    {
        id: 1,
        /*Stockdale.com. 2024. Gardening Equipment Display. [Online]. Available at: https://stockcake.com/i/gardening-equipment-display_338770_519282 [Accessed 26 November 2024]*/
        image: './images/Landscaping equipment.png',
        title: 'Landscaping',
        description: 'Duration: 6 Months',
        price: 1500,
    },
    {
        id: 2,
        /*Stockdale.com. 2024. Seniors at Computers. [Online]. Available at: https://stockcake.com/i/seniors-at-computers_454745_24429 [Accessed 26 November 2024]*/
        image: './images/Life-Skills-class.png',
        title: 'Life Skills',
        description: 'Duration: 6 Months',
        price: 1500,
    },
    {
        id: 3,
        /*Stockdale.com. 2024. Sewing Machine Setup. [Online]. Available at: https://stockcake.com/i/sewing-machine-setup_943957_957549 [Accessed 26 November 2024]*/
        image: './images/Sewing equipment.png',
        title: 'Sewing Class',
        description: 'Duration: 6 Months',
        price: 1500,
    },
    {
        id: 4,
        /*Stockdale.com. 2024. Colorful Classroom Interior. [Online]. Available at: https://stockcake.com/i/colorful-classroom-interior_1067671_1092855 [Accessed 26 November 2024]*/
        image: './images/Child Minding setup.png',
        title: 'Child Minding',
        description: 'Duration: 6 Weeks',
        price: 750,
    },
    {
        id: 5,
        /*Stockdale.com. 2024. Kitchen Cooking Setup. [Online]. Available at: https://stockcake.com/i/kitchen-cooking-setup_1156380_1142078 [Accessed 26 November 2024]*/
        image: './images/cooking setup.png',
        title: 'Cooking',
        description: 'Duration: 6 Weeks',
        price: 750,
    },
    {
        id: 6,
        /*Stockdale.com. 2024. Gardening Equipment Display. [Online]. Available at: https://stockcake.com/i/gardening-equipment-display_776491_685293 [Accessed 26 November 2024]*/
        image: './images/Gardening equipment.png',
        title: 'Garden maintenance',
        description: 'Duration: 6 Weeks',
        price: 750,
    }
];

const categories = [...new Set(product.map((item) => item))];

let i = 0;

document.getElementById('root').innerHTML = categories.map((item) => {
    const { image, title, description, price } = item; 
    return `
        <div class='box'>
            <div class='img-box'>
                <img class='images' src='${image}' />
            </div>
            <div class='bottom'>
                <p>${title}</p>
                <p>${description}</p>
                <h2>R${price}.00</h2>
                
                <button onclick='addtocart(${i++})'>Add to cart</button>
            </div>
        </div>
    `;
}).join('');

var cart = [];

function addtocart(a){
    cart.push({...categories[a]});
    displaycart();
}

function delElement(a){
    cart.splice(a, 1);
    displaycart();
}

function calculateDiscount(total, numCourses) {
    let discount = 0;
    if (numCourses === 2) {
        discount = 0.05;
    } else if (numCourses === 3) {
        discount = 0.10; 
    } else if (numCourses > 3) {
        discount = 0.15; 
    }
    return total * discount; 
}

function calculateVAT(total) {
    const VAT_RATE = 0.15;
    return total * VAT_RATE;
}

function displaycart(){
    let j = 0, total = 0;
    document.getElementById("count").innerHTML = cart.length;
    
    if(cart.length === 0){
        document.getElementById('cartItem').innerHTML = "Your cart is empty";
        document.getElementById("total").innerHTML = "R 0.00";
        document.getElementById("discount").innerHTML = "R 0.00"; 
        document.getElementById("vat").innerHTML = "R 0.00";
    } else {
        document.getElementById("cartItem").innerHTML = cart.map((items) => {
            const { image, title, description, price } = items;
            total += price;
            return `
            <div class='cart-item'>
                <div class='row-img'>
                    <img class='rowing' src='${image}'>
                </div>
                <p style='font-size:12px;'>${title}</p>
                <p style='font-size:12px;'>${description}</p>
                <h2 style='font-size: 15px;'>R${price}.00</h2>
                <i class='fa-solid fa-trash' onclick='delElement(${j++})'></i>
            </div>`;
        }).join('');
        
        // Calculate total and discount
        const discountAmount = calculateDiscount(total, cart.length);
        const discountedTotal = total - discountAmount;
        const vatAmount = calculateVAT(discountedTotal)
        const finalTotal = discountedTotal - vatAmount;

        // Update total and discount displays
        document.getElementById("total").innerHTML = "R " + finalTotal.toFixed(2);
        document.getElementById("discount").innerHTML = "R " + discountAmount.toFixed(2);
        document.getElementById("vat").innerHTML = "R " + vatAmount.toFixed(2);
    }

}


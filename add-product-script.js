require('dotenv').config();
const axios = require('axios');

const shopifyApiKey = process.env.SHOPIFY_API_KEY;
const shopifyStoreUrl = 'https://kuro-yellow.myshopify.com';

// Function to create a product
async function createProduct() {
  try {
    const response = await axios.post(
      `${shopifyStoreUrl}/admin/api/2023-04/products.json`,
      {
        product: {
          title: 'Strong Zero',
          body_html: '<p>Get drunk for cheap!</p>',
          vendor: 'Sample Vendor',
          product_type: 'Sample Type',
        },
      },
      {
        headers: {
          'X-Shopify-Access-Token': shopifyApiKey,
          'Content-Type': 'application/json',
        },
      }
    );

    const product = response.data.product;
    console.log('Product created successfully.');
    console.log('Product ID:', product.id);
  } catch (error) {
    console.error('Error creating product:', error);
  }
}

// Execute the script
createProduct();

require('dotenv').config();
const axios = require('axios');

const shopifyApiKey = process.env.SHOPIFY_API_KEY;
const shopifyStoreUrl = 'https://kuro-yellow.myshopify.com/';
const productId = 'onigiri';


// Function to check if the metafield already exists
async function doesMetafieldExist() {
  try {
    const response = await axios.get(`${shopifyStoreUrl}/admin/api/2021-09/products/${productId}/metafields.json`, {
      headers: {
        'X-Shopify-Access-Token': shopifyApiKey,
      },
    });

    const metafields = response.data.metafields;
    const existingMetafield = metafields.find(metafield =>
      metafield.namespace === 'global' && metafield.key === 'test'
    );

    return existingMetafield != null;
  } catch (error) {
    console.error('Error checking metafield existence:', error);
    return false;
  }
}
// Function to create or update the metafield
async function createOrUpdateMetafield() {
  try {
    const metafieldExists = await doesMetafieldExist();

    if (metafieldExists) {
      // Increment the existing metafield value by 1
      await axios.put(
        `${shopifyStoreUrl}/admin/api/2021-09/products/${productId}/metafields/global/test.json`,
        { value: '+1' },
        {
          headers: {
            'X-Shopify-Access-Token': shopifyApiKey,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Metafield updated successfully.');
    } else {
      // Create the metafield with an initial value of 0
      await axios.post(
        `${shopifyStoreUrl}/admin/api/2021-09/products/${productId}/metafields.json`,
        {
          "metafield": {
            "namespace": 'global',
            "key": 'test',
            "value": '0',
            "type": 'integer',
          },
        },
        {
          headers: {
            'X-Shopify-Access-Token': shopifyApiKey,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Metafield created successfully.');
    }
  } catch (error) {
    console.error('Error creating or updating metafield:', error);
  }
}

// Execute the script
createOrUpdateMetafield();

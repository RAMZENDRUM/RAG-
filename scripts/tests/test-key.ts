import dotenv from 'dotenv';
dotenv.config();

async function testKey() {
  const key = process.env.VERCEL_AI_KEY;
  console.log('Testing key:', key?.substring(0, 8) + '...');
  
  try {
    const response = await fetch('https://ai-gateway.vercel.sh/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      },
      body: JSON.stringify({
        model: 'text-embedding-3-small',
        input: 'test'
      })
    });
    
    console.log('Status:', response.status);
    const body = await response.text();
    console.log('Body:', body);
  } catch (error) {
    console.error('Error:', error);
  }
}

testKey();

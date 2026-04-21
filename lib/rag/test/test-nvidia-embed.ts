import dotenv from 'dotenv';

dotenv.config();

async function testRaw() {
  console.log("🧪 Testing RAW NVIDIA Embedding Fetch...");
  try {
    const response = await fetch('https://integrate.api.nvidia.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NVIDIA_API_KEY}`
      },
      body: JSON.stringify({
        input: ["Hello MSAJCE"],
        model: "nvidia/nv-embedqa-e5-v5",
        input_type: "passage",
        encoding_format: "float"
      })
    });

    const data = await response.json();
    if (response.ok) {
        console.log(`✅ Success! Embedding Dimensions: ${data.data[0].embedding.length}`);
    } else {
        console.error(`❌ Raw NVIDIA Failure:`, JSON.stringify(data, null, 2));
    }
  } catch (error: any) {
    console.error(`❌ Fetch Error:`, error.message);
  }
}

testRaw();

const { TonClient, libNode } = require("@tonclient/core");
const fs = require("fs");

// اتصال به کتابخانه TON
TonClient.useBinaryLibrary(libNode);
const client = new TonClient({
  network: {
    endpoints: ["net.ton.dev"], // به شبکه TON متصل شوید
  },
});

// اطلاعات توکن شما
const tokenName = "SHEYKH COIN"; // نام توکن
const tokenSymbol = "SHC"; // نماد توکن
const totalSupply = 1000000000; // تعداد کل توکن‌ها (مقدار دلخواه)

const walletAddress = "UQBRiszNICT3EGQGoI3P600o4eczubNu-jNGAe-0YFyiAsrn"; // آدرس کیف پول
const privateKey = "your_private_key_here"; // کلید خصوصی کیف پول شما

async function createToken() {
  try {
    // ایجاد قرارداد برای توکن
    const contract = new TonClient.Contract({
      client,
      address: walletAddress,
      abi: fs.readFileSync("contract.abi.json"),
      privateKey,
    });

    // استقرار (deploy) قرارداد در شبکه
    const result = await contract.deploy({
      name: tokenName,
      symbol: tokenSymbol,
      totalSupply,
    });

    console.log("Token created successfully:", result);
  } catch (error) {
    console.error("Error creating token:", error);
  }
}

createToken();
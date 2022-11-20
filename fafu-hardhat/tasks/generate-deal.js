const util = require("util");
const request = util.promisify(require("request"));

const marketAPIAddr = "0xEA5e4d80b1919B330C6B9B828172712b3eAdFF92";

const MockDeal = {
  id: 10662328,
  cid: "baga6ea4seaqpite3e7bbeh4hbzkzwzwwhwso5ovca6wuubfddzt26rr2hlt4smq",
  size: 784,
  verified: false,
  client: "f144zep4gitj73rrujd3jw6iprljicx6vl4wbeavi",
  provider: "f01392893",
  label: "Mabcxdfdaf",
  start: 0,
  end: 0,
  price_per_epoch: 1200000000000,
  provider_collateral: 0,
  client_collateral: 0,
  activated: 1,
  terminated: 0
};

const addBalanceParams = {
  provider_or_client: MockDeal?.provider
};

const amount = 150000000000;

task("generate-deal", "Generates mock deal and adds balance")
.setAction(async (taskArgs) => {
    const networkId = network.name
    const MarketAPI = await ethers.getContractFactory("MarketAPI")

    const accounts = await ethers.getSigners()
    const signer = accounts[0]
    const priorityFee = await callRpc("eth_maxPriorityFeePerGas")

    async function callRpc(method, params) {
        var options = {
          method: "POST",
          url: "https://wallaby.node.glif.io/rpc/v0",
          // url: "http://localhost:1234/rpc/v0",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jsonrpc: "2.0",
            method: method,
            params: params,
            id: 1,
          }),
        };
        const res = await request(options);
        return JSON.parse(res.body).result;
      }

    const marketAPI = new ethers.Contract(marketAPIAddr, MarketAPI.interface, signer)
    console.log("Generating deal:", MockDeal?.id)
    await marketAPI.mock_generate_deal(MockDeal, {
        gasLimit: 1000000000,
        maxPriorityFeePerGas: priorityFee
    })
    console.log("Mock deal added successfully");

    console.log("Adding balance:", amount)
    await marketAPI.add_balance(addBalanceParams, {
        value: amount,
        gasLimit: 1000000000,
        maxPriorityFeePerGas: priorityFee
    })
    console.log("Balance added successfully");
})

module.exports = {}
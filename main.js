window.addEventListener("load", async () => {
  // Check if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== "undefined") {
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    // Fallback - Use infura
    window.web3 = new Web3(
      new Web3.providers.HttpProvider(
        "https://mainnet.infura.io/v3/b758782c62e548d09f450b016f0ecf6a"
      )
    );
  }

  // Dead wallet info
  const deadAddr = "0x000000000000000000000000000000000000dead";

  // Bagge Contract Info
  const baggeDecimals = 9;
  const baggeTotalSupply = 8000000000;
  const burnThresholdTokens = baggeTotalSupply * 0.005;
  const baggeContractAddr = "0xC5DC281E4247d56627F6f42331eAd53720d6EBC4";
  const baggeContractABI = [
    { inputs: [], stateMutability: "nonpayable", type: "constructor" },
    {
      inputs: [{ internalType: "address", name: "owner", type: "address" }],
      name: "OwnableInvalidOwner",
      type: "error",
    },
    {
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "OwnableUnauthorizedAccount",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "TaxLimitsRevised",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "WalletLimitsRevised",
      type: "event",
    },
    {
      inputs: [
        { internalType: "address[]", name: "addList", type: "address[]" },
      ],
      name: "addToBkList",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "spender", type: "address" },
      ],
      name: "allowance",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "approve",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "createUniLQPoolAndBeginTrading",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "a", type: "address" }],
      name: "isOnBkList",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "liftTaxLimits",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "liftWalletLimits",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address[]",
          name: "removeList",
          type: "address[]",
        },
      ],
      name: "removeFromBkList",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "recipient", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "transfer",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "sender", type: "address" },
        { internalType: "address", name: "recipient", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    { stateMutability: "payable", type: "receive" },
  ];

  var contract = new web3.eth.Contract(baggeContractABI, baggeContractAddr);

  contract.methods
    .balanceOf(baggeContractAddr)
    .call()
    .then(function (balance) {
      const contractTokens = (balance / Math.pow(10, baggeDecimals)).toFixed(2);
      const leftToNextBurnTokens = burnThresholdTokens - contractTokens;
      const burnReadyPercent = (
        (contractTokens / burnThresholdTokens) *
        100
      ).toFixed(2);

      document.getElementById("div-remaining-tokens").innerText =
        leftToNextBurnTokens + " $BAGGE Tokens to Next Burn";

      document.getElementById("percent-value-next-burn").innerText =
        burnReadyPercent + " % of Next Burn Ready 🔥";
      const dashoffset = 440 - (440 * burnReadyPercent) / 100;
      document.getElementById("circle-next-burn").style.strokeDashoffset =
        dashoffset;
    });

  contract.methods
    .balanceOf(deadAddr)
    .call()
    .then(function (balance) {
      const burnedTokens = (balance / Math.pow(10, baggeDecimals)).toFixed(2);
      const percentBurned = ((burnedTokens / baggeTotalSupply) * 100).toFixed(
        2
      );
      document.getElementById("div-total-burned").innerText =
        burnedTokens + " $BAGGE Tokens Burned";
      document.getElementById("percent-value").innerText =
        percentBurned + "% of $BAGGE Burned 🔥";
      const dashoffset = 440 - (440 * percentBurned) / 100;
      document.getElementById("circle-total-burned").style.strokeDashoffset =
        dashoffset;
    });
});

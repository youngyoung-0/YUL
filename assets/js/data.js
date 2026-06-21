const CARD_DATABASE = [
  {
    id: "shinhan_mrlife",
    name: "신한카드 MR.Life",
    theme: "blue",
    image: "신한카드_MR_life_세로.png",
    colorStart: "#1e3c72",
    colorEnd: "#2a5298",
    limit: 50000, // Monthly max benefit limit (KRW)
    benefits: {
      food: 0.10,      // 10% discount on dining/cvs at night
      shopping: 0.10,  // 10% discount on online shopping
      fuel: 0.08,      // 8% discount on petrol
      transport: 0.05, // 5% discount on taxi/bus
      base: 0.002      // 0.2% base cash back
    }
  },
  {
    id: "hyundai_m3",
    name: "현대카드 M Edition3",
    theme: "purple",
    image: "현대카드_M_Edition3.png",
    colorStart: "#4f085c",
    colorEnd: "#8b008b",
    limit: 100000, // Very high limit but lower rates
    benefits: {
      food: 0.02,
      shopping: 0.03,
      fuel: 0.03,
      transport: 0.02,
      base: 0.015      // 1.5% base return on everything
    }
  },
  {
    id: "samsung_idon",
    name: "삼성 ID ON 카드",
    theme: "blue",
    image: "삼성_ID_ON_카드_세로.png",
    colorStart: "#0a2540",
    colorEnd: "#0070f3",
    limit: 40000,
    benefits: {
      food: 0.10,      // 10% on restaurants
      shopping: 0.08,  // 8% on online shopping
      fuel: 0.01,
      transport: 0.10, // 10% on transit
      base: 0.005
    }
  },
  {
    id: "woori_shopping",
    name: "카드의정석 SHOPPING+",
    theme: "blue",
    image: "우리카드_쇼핑의정석.png",
    colorStart: "#0f2027",
    colorEnd: "#203a43",
    limit: 50000,
    benefits: {
      food: 0.01,
      shopping: 0.10,  // 10% discount on shopping
      fuel: 0.01,
      transport: 0.01,
      base: 0.005
    }
  }
];
window.CARD_DATABASE = CARD_DATABASE;

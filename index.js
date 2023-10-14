// 사용자로부터 입력 받기
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 현금 입력 단위
const cashUnit = [100, 500, 1000, 5000, 10000];

// 음료수 가격 정보
const drinkPrices = {
  cola: 1100,
  water: 600,
  coffee: 700,
};

let userAmount = 0;

const processCardPayment = () => {
  rl.question(
    '잔액 부족 상황을 연출하려면 "true"를 입력하세요 (그 외의 경우 "false"): ',
    (insufficientBalance) => {
      rl.question(
        "음료수를 선택하세요 (cola, water, coffee): ",
        (drinkSelection) => {
          if (insufficientBalance === "true") {
            console.log("잔액이 부족합니다.");
          } else {
            // 음료수 가격 확인
            const drinkPrice = drinkPrices[drinkSelection];
            console.log(
              `카드 결제 완료! ${drinkSelection}이(가) 나왔습니다.\n` +
                `결제 금액: ${drinkPrice}원`
            );
          }
          rl.close();
        }
      );
    }
  );
};

const processCashPayment = () => {
  rl.question(
    "투입할 금액을 입력하세요 (금액단위:[100, 500, 1000, 5000, 10000], 투입 중지: -1): ",
    (inputAmount) => {
      const input = parseFloat(inputAmount);

      if (input === -1) {
        rl.question(
          "음료수를 선택하세요 (cola, water, coffee): ",
          (drinkSelection) => {
            // 음료수 가격 확인
            const drinkPrice = drinkPrices[drinkSelection];
            if (userAmount < drinkPrice) {
              console.log("투입 금액이 부족합니다.");
            } else {
              // 구매 성공 시 거스름돈 계산
              const change = userAmount - drinkPrice;
              console.log(`구매 완료! 거스름돈: ${change}원`);
            }
            rl.close();
          }
        );
      } else {
        if (!cashUnit.includes(input)) {
          console.log(
            `투입하신 금액은 올바를 현금이 아닙니다.\n` +
              `(금액단위:[100, 500, 1000, 5000, 10000])`
          );
        } else {
          userAmount += input;
          console.log(`현재 투입된 금액: ${userAmount}원`);
        }
        processCashPayment();
      }
    }
  );
};

rl.question("결제 수단을 선택하세요 (카드 또는 현금): ", (paymentMethod) => {
  if (paymentMethod === "카드") {
    processCardPayment();
  } else if (paymentMethod === "현금") {
    processCashPayment();
  } else {
    console.log("올바른 결제 수단을 선택하세요.");
    rl.close();
  }
});

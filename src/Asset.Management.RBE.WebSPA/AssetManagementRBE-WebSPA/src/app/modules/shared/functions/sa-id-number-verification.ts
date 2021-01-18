
export class SaIdNumberVerification {
   static SAIDCheck(IdNumber: string): boolean {
    let d1 = 0;
    let d2 = 0;
    let d3 = 0;
    let d4 = 0;
    let d5 = 0;
    let d6 = 0;
    let d7 = 0;
    let d8 = 0;
    let d9 = 0;
    let d10 = 0;
    let d11 = 0;
    let d12 = 0;
    let d13 = 0;
    let evsum = 0;
    let odsum = 0;
    let evnum1 = 0;
    let evnum2 = 0;
    let evnum3 = 0;
    let evnum4 = 0;
    let evnum5 = 0;
    let evnum6 = 0;
    let checkDigit = 0;
    if (IdNumber.length === 13) {
      d1 = parseInt(IdNumber.substr(0, 1), 10);
      d2 = parseInt(IdNumber.substr(1, 1), 10);
      d3 = parseInt(IdNumber.substr(2, 1), 10);
      d4 = parseInt(IdNumber.substr(3, 1), 10);
      d5 = parseInt(IdNumber.substr(4, 1), 10);
      d6 = parseInt(IdNumber.substr(5, 1), 10);
      d7 = parseInt(IdNumber.substr(6, 1), 10);
      d8 = parseInt(IdNumber.substr(7, 1), 10);
      d9 = parseInt(IdNumber.substr(8, 1), 10);
      d10 = parseInt(IdNumber.substr(9, 1), 10);
      d11 = parseInt(IdNumber.substr(10, 1), 10);
      d12 = parseInt(IdNumber.substr(11, 1), 10);
      d13 = parseInt(IdNumber.substr(12, 1), 10);
      evnum1 = (d2 * 2);
      evnum2 = (d4 * 2);
      evnum3 = (d6 * 2);
      evnum4 = (d8 * 2);
      evnum5 = (d10 * 2);
      evnum6 = (d12 * 2);
      evsum = (SaIdNumberVerification.CalcSumOfString(evnum1.toString())) + (SaIdNumberVerification.CalcSumOfString(evnum2.toString())) +
        (SaIdNumberVerification.CalcSumOfString(evnum3.toString())) + (SaIdNumberVerification.CalcSumOfString(evnum4.toString())) +
        (SaIdNumberVerification.CalcSumOfString(evnum5.toString())) + (SaIdNumberVerification.CalcSumOfString(evnum6.toString()));

      odsum = d1 + d3 + d5 + d7 + d9 + d11;
      if (((evsum + odsum) % 10) === 0) {
        checkDigit = 0;
      } else {
        checkDigit = 10 - ((evsum + odsum) % 10);
      }

      if (checkDigit !== d13) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  // private method CalcSumOfString
  private static CalcSumOfString(ValueToSum): number {
    const lengthOfString = ValueToSum.length;
    let sumOfString = 0;
    for (let i = 0; i < lengthOfString; i++) {
      sumOfString += parseInt(ValueToSum.substr(i, 1), 10);
    }
    return sumOfString;
  }


}

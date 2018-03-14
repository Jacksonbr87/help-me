module.exports = function count(s, pairs) {
    function nResult(pairs) {
        var n = 1;
        for (i = 0; i < pairs.length; i++) {
            // var pairsPow = (pairs[i][0] ** pairs[i][1]);
            var pairsPow = powByMod(pairs[i][0], pairs[i][1], 1000000007);
            n *= pairsPow;
        }
        return n;
    };


    function powByMod(base, exponent, modulus) {
        if ((base < 1) || (exponent < 0) || (modulus < 1)) {
            return ("invalid values sent to pow()");
        }
        let result = 1;
        while (exponent > 0) {
            if ((exponent % 2) == 1) {
                result = (result * base) % modulus;
            }
            base = (base * base) % modulus;
            exponent = Math.floor(exponent / 2);
        }
        // console.log("powResult by mod = " + result);
        return (result);
    };


    function isCoPrimeRegular(a, b) {
        var num;
        while (b) {
            num = a % b;
            a = b;
            b = num;
        }
        if (Math.abs(a) == 1) {
            // console.log(true);
            return true;
        }
        // console.log(false);
        return false;
    }


    function isCoPrimeEuklid(a, b) {
        if (a == 0 || b == 0) {
            // console.log(false);
            return false;
        }
        if (a == b) {
            if (a == 1) {
                // console.log(true);
                return true;
            } else {
                // console.log(false);
                return false;
            }
        }
        if (a > b) {
            tmp = a;
            a = b;
            b = tmp;
        }
        return isCoPrimeEuklid(a, b - a);
    }


    let sArray = s.split('').reverse();
    let nValue = nResult(pairs);
    let totalTrue = true;
    let count = 0;

    console.log("nValue = " + nValue);
    console.log("sArray length = " + sArray.length);

    for (let k = 0; k <= nValue; k++) {
        // console.log("k = " + k);
        totalTrue = true;

        for (let j = 0; j < sArray.length; j++) {
            // console.log("sArray[" + j + "] = " + sArray[j]);
            let isPrime = isCoPrimeRegular(k + j, nValue);
            // let isPrime = isCoPrimeEuklid(k + j, nValue);

            if (!(sArray[j] == 1 && isPrime === true || sArray[j] == 0 && isPrime === false && k > 0)) {
                // console.log("break");
                totalTrue = false;
                break;
            } else {
                // console.log("next j");
            }
        }

        if (totalTrue) {
            count++
            // console.log("count = " + count);
        }
    }

    console.log("final count = " + count);
    return count % 1000000007;
}
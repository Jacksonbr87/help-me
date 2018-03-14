module.exports = function count(s, pairs) {
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
    }

    function nResult(pairs) {
        var n = 1;
        for (i = 0; i < pairs.length; i++) {
            // var pairsPow = (pairs[i][0] ** pairs[i][1]);
            var pairsPow = powByMod(pairs[i][0], pairs[i][1], 1000000007);
            n *= pairsPow;
            n %= 1000000007;
        }
        return n;
    }

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

    function isCoPrimeBinaryShift(a, b) {
        if (a == 0 || b == 0) {
            // console.log("break");
            return false;
        }
        var factor = 1;
        while (true) {
            if (a == b && a != 1)
                if (a == 0) {
                    // throw 'isCoPrimeBinaryShift(0, 0)';
                } else {
                    // console.log("1 >> false");
                    return false;
                    // return factor * a;
                }
            if (a == 0) {
                if (factor == 1) {
                    // console.log("2 >> true");
                    return true;
                } else {
                    // console.log("2 >> false");
                    return false;
                }
                // return factor * b;
            }
            if (b == 0) {
                if (factor == 1) {
                    // console.log("3 >> true");
                    return true;
                } else {
                    // console.log("3 >> false");
                    return false;
                }
                // return factor * a;
            }
            if (a == 1 || b == 1) {
                if (factor == 1) {
                    // console.log("4 >> true");
                    return true;
                } else {
                    // console.log("4 >> false");
                    return false;
                }
                // return factor;
            }
            if (!(a & 1) && !(b & 1)) {
                factor <<= 1;
                a >>= 1;
                b >>= 1;
            } else if (!(a & 1)) {
                a >>= 1;
            } else if (!(b & 1)) {
                b >>= 1;
            } else if (b > a) {
                b = (b - a) >> 1;
            } else { a = (a - b) >> 1; }
        }
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
            // let isPrime = isCoPrimeRegular(k + j, nValue);
            // let isPrime = isCoPrimeEuklid(k + j, nValue);
            let isPrime = isCoPrimeBinaryShift(k + j, nValue);

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
};
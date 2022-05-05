function convertIt() {

    var from = document.getElementById("firstPickInp").value
    var to = document.getElementById("secondPickInp").value

    if (from === to) {
        document.getElementById("answer").innerHTML = `Value in ${from}: ${document.getElementById("enterVal").value}`
    } else if (from === "Decimal") {
        if (to === "Binary") {
            var dec = parseInt(document.getElementById("enterVal").value)
            var powers = []

            if (!dec) {
                alert("Please enter a value");
                return
            } else {

                if (dec < 0) {
                    console.log("Please enter a positive integer.")
                } else {
                    var mod = dec
            
                    while (mod !== 0) {
                        for (let i = 0; i < mod; i++) {
                            if ((2 ** i) > mod) {
                                powers.push(i-1)
                                mod -= 2 ** (i-1)
                                break
                            } else if ((2 ** i) === mod) {
                                powers.push(i)
                                mod = 0
                                break
                            }
                            continue
                        }
                    }
            
                    if (dec === 0) {
                        document.getElementById("answer").innerHTML = "0"
                    } else {
            
            
            
            
            
                        document.getElementById("answer").innerHTML = `Bye`
                    }
                }
            
                var bin = ""
                for (let i = powers[0]; i >= 0; i--) {
                    var trueOrFalse = false
            
                    for (let power of powers) {
            
                        if (i === power) {
                            trueOrFalse = true
                            break
                        } else {
                            trueOrFalse = false
                        }
                    }
            
                    if (trueOrFalse === true) {
                        bin += "1"
                    } else {
                        bin += "0"
                    }
                }
                
                document.getElementById("answer").innerHTML = "Value in Binary: " + bin

            }
        } else if (to === "Hexadecimal") {

            var remainder = []
            var div = parseInt(document.getElementById("enterVal").value)

            while (div !== 0) {
                var mod = div % 16
                div = (div - mod) / 16
                remainder.push(mod)
            }

            var hex = ""
            for (let i = remainder.length-1; i >= 0; i--) {
                if (remainder[i] === 10) {
                    hex += "A"
                } else if (remainder[i] === 11) {
                    hex += "B"
                } else if (remainder[i] === 12) {
                    hex += "C"
                } else if (remainder[i] === 13) {
                    hex += "D"
                } else if (remainder[i] === 14) {
                    hex += "E"
                } else if (remainder[i] === 15) {
                    hex += "F"
                } else {
                    hex += remainder[i]
                }
            }

            document.getElementById("answer").innerHTML = "Value in Hexadecimal: " + hex

        } else {
            alert("Our program cannot do that conversion.")
            location.reload()
        }

    } else if (from === "Binary") {

        if (to === "Decimal") {

            var bin = document.getElementById("enterVal").value
            var rev_arr = []
            for (let i = bin.length-1; i >= 0; i--) {
                rev_arr.push(bin[i])
            }

            var dec = 0

            for (let x = 0; x < rev_arr.length; x++) {
                if (rev_arr[x] === "1") {
                    console.log(true)
                    dec += (2 ** x)
                } else if (rev_arr[x] === "0") {
                    continue
                } else {
                    alert("Binary cannot contain any other numbers than 1 and 0.")
                    return
                }
            }

            document.getElementById("answer").innerHTML = "Value in Decimal: " + dec

        } else if (to === "Hexadecimal") {

            var x = document.getElementById("enterVal").value
            var y = []
            var y_rev = []

            var range = x.length % 4
            if (range === 0) {
                range = x.length / 4 
            } else {
                range = ((x.length - range) / 4) + 1 
            }

            if (x.length % 4 > 0) {
                let temp_arr = []
                for (let i = 0; i < x.length % 4; i++) {
                    temp_arr.push(x[i])
                }
                y.push(temp_arr)
            }

            var lastIndex = x.length % 4
            for (let i = 0; i < (x.length - (x.length % 4)) / 4; i++) {
                var temp_arr = []
                for (let l = lastIndex; l < lastIndex + 4; l++) {
                    temp_arr.push(x[l])
                }
                y.push(temp_arr)
                lastIndex += 4
            }

            for (let i = 0; i < y.length; i++) {
                var temp_arr = []
                for (let j = y[i].length-1; j >= 0; j--) {
                    temp_arr.push(y[i][j])
                }
                y_rev.push(temp_arr)
            }

            console.log(y_rev)

            var sum = []
            for (let i = 0; i < y_rev.length; i++) {
                var temp_sum = 0
                for (let x = 0; x < y_rev[i].length; x++) {
                    if (y_rev[i][x] === "1") {
                        temp_sum += 2 ** x;
                    }
                }
                sum.push(temp_sum)
            }

            console.log(sum)

            var final_hex = ""
            for (let elem of sum) {
                if (elem === 10) {
                    final_hex += "A"
                } else if (elem === 11) {
                    final_hex += "B"
                } else if (elem === 12) {
                    final_hex += "C"
                } else if (elem === 13) {
                    final_hex += "D"
                } else if (elem === 14) {
                    final_hex += "E"
                } else if (elem === 15) {
                    final_hex += "F"
                } else {
                    final_hex += elem
                }
            }

            console.log(final_hex)

            document.getElementById("answer").innerHTML = "Value in Hexadecimal: " + final_hex

        } else {
            alert("Our program cannot do that conversion.")
            location.reload()
        }

    } else if (from === "Hexadecimal") {

        if (to === "Binary") {

            

        } else if (to === "Decimal") {

            var inp = document.getElementById("enterVal").value
            var hex = []
            
            for (let i = 0; i < inp.length; i++) {
                if (inp[i] === "A") {
                    hex.push(10)
                } else if (inp[i] === "B") {
                    hex.push(11)
                } else if (inp[i] === "C") {
                    hex.push(12)
                } else if (inp[i] === "D") {
                    hex.push(13)
                } else if (inp[i] === "E") {
                    hex.push(14)
                } else if (inp[i] === "F") {
                    hex.push(15)
                } else {
                    hex.push(parseInt(inp[i]))
                }
            }

            var rev_hex = []
            for (let i = hex.length-1; i >= 0; i--) {
                rev_hex.push(hex[i])
            }

            var dec = 0
            for (let k = 0; k < rev_hex.length; k++) {
                dec += rev_hex[k] * (16 ** k)
            }

            document.getElementById("answer").innerHTML = "Value in Decimal: " + dec

        } else {
            alert("Our program cannot do that conversion.")
            location.reload()
        }

    } else {
        alert("Our program cannot do that conversion.")
        location.reload()
    }

}












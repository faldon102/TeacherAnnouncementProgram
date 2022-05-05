function calcMinGuesses() {
    var minGuesses = 0
    var range = parseInt(document.getElementById("range").value)

    if (document.getElementById("range").value) {
        var division = parseInt(document.getElementById("range").value)

        while (division !== 1) {
            minGuesses += 1
            division = Math.ceil(division / 2)
            console.log(division)
        }

        document.getElementById("enterRange").innerHTML = "Range"
        document.getElementById("to").innerHTML = `0 - ${range}`

        document.getElementById("1").style.visibility = "hidden"
        document.getElementById("range").style.visibility = "hidden"
        document.getElementById("confirm").style.visibility = "hidden"
        document.getElementById("restart").style.visibility = "visible"
        document.getElementById("yes").style.visibility = "visible"
        document.getElementById("no").style.visibility = "visible"

        document.getElementById("bet").style.visibility = "visible"
        document.getElementById("bet").innerHTML = `Pick a whole number between the given range. I bet $20 I can guess your number within ${minGuesses} guesses. Deal?`
        
        localStorage.setItem("minGuesses", minGuesses)
        localStorage.setItem("range", range)
    } else {
        alert("Please enter a range")
        location.reload()
    }
}

function locate() {

    localStorage.setItem("min", 0)
    localStorage.setItem("max", localStorage.getItem("range"))
    localStorage.setItem("guess#", 0)
}

function guess() {
    var guessNum = parseInt(localStorage.getItem("guess#")) + 1
    localStorage.setItem("guess#", guessNum)

    var min = parseInt(localStorage.getItem("min"))
    var max = parseInt(localStorage.getItem("max"))
    var guess = min + Math.ceil((max-min)/2)

    localStorage.setItem("guess", guess)

    if (localStorage.getItem("guesses") == null) {
        localStorage.setItem("guesses", guess + ",")
        localStorage.setItem("guessNums", guessNum + ",")
    } else {
        localStorage.setItem("guesses", localStorage.getItem("guesses") + guess + ",")
        localStorage.setItem("guessNums", localStorage.getItem("guessNums") + guessNum + ",")
    }

    for (let i = 0; i < localStorage.getItem("guesses").split(",").length-1; i++) {
        var table = document.getElementById("displayGuesses")
        var row = table.insertRow()
        row.style.height = "80px"

        var p = document.createElement("p")
        var guessNumberText = document.createTextNode(localStorage.getItem("guessNums").split(",")[i])
        row.appendChild(p).appendChild(guessNumberText)
        p.style.fontSize = "20px"
        p.style.position = "relative"
        p.style.top = "-40px"
        p.style.left = "35px"
        p.style.padding = "0px;"

        var h1 = document.createElement("h1")
        var guessText = document.createTextNode(localStorage.getItem("guesses").split(",")[i])
        row.appendChild(h1).appendChild(guessText)
        h1.style.fontSize = "20px"
        h1.style.position = "relative"
        h1.style.top = "-83px"
        h1.style.right = "-150px"
        h1.style.padding = "0px;"
    }

    document.getElementById("displayGuess").innerHTML = `Is Your Number ${guess}?`
}

function cancel() {
    document.getElementById("yes").style.visibility = "hidden"
    document.getElementById("no").style.visibility = "hidden"
    document.getElementById("fakeNo").style.visibility = "visible"
}

function higher() {
    localStorage.setItem("min", localStorage.getItem("guess"))

    location.reload()
}

function lower() {
    localStorage.setItem("max", localStorage.getItem("guess"))

    location.reload()
}

function no() {
    document.getElementById("higher").style.visibility = "visible"
    document.getElementById("lower").style.visibility = "visible"

    var buttons = document.querySelectorAll("button")
    for (let button of buttons) {
        button.disabled = true
    }

    document.getElementById("higher").disabled = false
    document.getElementById("lower").disabled = false
}

function yes() {
    // alert("Perfect. You got it!")

    document.getElementById("displayGuess").style.visibility = "hidden"
    document.getElementById("correct").style.visibility = "hidden"
    document.getElementById("incorrect").style.visibility = "hidden"
    document.getElementById("gotIt").style.visibility = "visible"

    location.href = "./guessHome.html"
}


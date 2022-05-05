function changeColor() {
    document.getElementById("logo").onmouseenter = function() {
        document.getElementById("logo").style.color = "grey"
        document.getElementById("small").style.backgroundColor = "grey"
        document.getElementById("big").style.backgroundColor = "grey"
    }

    document.getElementById("logo").onmouseleave = function() {
        document.getElementById("logo").style.color = "#03fcba"
        document.getElementById("small").style.backgroundColor = "#03fcba"
        document.getElementById("big").style.backgroundColor = "#03fcba"
    }
}

function publish() {
    var title = document.getElementById("ideaTitle").value
    var industry = document.getElementById("industry").value
    var impact = document.getElementById("impact").value
    var details = document.getElementById("ideaDetails").value

    localStorage.setItem("mstrcnt1", title)

    if (localStorage.getItem(title) === null) {
        localStorage.setItem("searchList", localStorage.getItem("searchList") + "," + title)
    } 

    localStorage.setItem(title, `${industry}][${impact}][${details}`)
}

function getTitle() {
    var title = localStorage.getItem("mstrcnt1")
    document.getElementById("displayIdeaTitle").innerHTML = `The idea "${title}" has been posted. Thank You!`

    localStorage.removeItem("mstrcnt1")
}

function position() {
    if (pageYOffset >= 300) {
        document.getElementById("displayIdea").style.position = "fixed"
        document.getElementById("displayIdea").style.top = "100px"
        document.getElementById("displayIdea").style.right = "0px"

        document.getElementById("hiddenForm").style.position = "fixed"
        document.getElementById("hiddenForm").style.top = "100px"
        document.getElementById("hiddenForm").style.right = "0px"
    } else {
        document.getElementById("displayIdea").style.position = "absolute"
        document.getElementById("displayIdea").style.top = "400px"
        document.getElementById("displayIdea").style.right = "0px"

        document.getElementById("hiddenForm").style.position = "absolute"
        document.getElementById("hiddenForm").style.top = "400px"
        document.getElementById("hiddenForm").style.right = "0px"
    }
}

function getIdeas() {
    var table = document.getElementById("resultsTable")

    while (table.rows.length > 0) {
        table.deleteRow(0)
    }

    // FIND OUT WHY THIS DOES NOT WORK AND WHY THE WHILE LOOP NECESSARILY DOES
    // for (let i = 0; i < table.rows.length; i++) {
    //     table.deleteRow(0)
    // }

    var inputtedText = document.getElementById("searchInputId").value
    var searchListSplitted = localStorage.getItem("searchList").split(",")

    finalIdeas = []

    if (inputtedText.toLowerCase() === "display all" || inputtedText.toLowerCase() === "da") {
        for (let idea of searchListSplitted) {
            if (idea === "") {
                continue
            }

            finalIdeas.push(idea)
        }
    } else {
        for (let idea of searchListSplitted) {
            if (idea === "") {
                continue
            }
    
            if (idea.toLowerCase().search(inputtedText.toLowerCase()) >= 0 || localStorage.getItem(idea).toLowerCase().search(inputtedText.toLowerCase()) >= 0) {
                finalIdeas.push(idea)
            }
        }
    }

    if (finalIdeas.length > 0) {
        for (let idea of finalIdeas) {
            var table = document.getElementById("resultsTable")
            var row = table.insertRow() 
            row.id = idea
    
            var p1 = document.createElement("p")
            var tempTitle = document.createTextNode(idea)
            p1.id = idea + "1"
            row.appendChild(p1).appendChild(tempTitle)
            p1.style.position = "relative"
            p1.style.top = "-20px"
            p1.style.left = "40px"
            p1.style.fontSize = "40px"
            p1.style.color = "black"
            p1.style.fontFamily = "'Times New Roman', Times, serif;"
            p1.style.width = "360px;"
            // p1.style.height = "50px"
    
            try {
                var elements = localStorage.getItem(idea)
                elements = elements.split("][")
                var industry = elements[0]
            } catch (TypeError) {
                console.log(idea)
            }

    
            var p2 = document.createElement("p")
            var tempIndustry = document.createTextNode(industry)
            p2.id = idea + "2"
            row.appendChild(p2).appendChild(tempIndustry)
            p2.style.position = "relative"
            p2.style.top = "-40px"
            p2.style.right = "-40px"
            p2.style.fontSize = "20px"
            p2.style.color = "black"
            p2.style.fontFamily = "'Times New Roman', Times, serif;"
            p2.style.height = "50px"
            p2.style.width = "300px"
    
            var hr = document.createElement("hr")
            row.appendChild(hr)
            hr.style.height = "3px"
            hr.style.width = "700px"
            hr.style.position = "relative"
            hr.style.bottom = "-10px"
            hr.style.left = "0px"
            hr.style.backgroundColor = "black"
            hr.style.border = "none"
        }
    
        maxHeight = Math.max(400 + document.getElementById("resultsTable").style.height, 1020)
        document.body.height = maxHeight
    
        var rows = document.querySelectorAll("tr")
        for (let row of rows) {
    
            row.onmouseenter = function() {
                // row.style.filter = "brightness(60%)"
                row.style.backgroundColor = "#828282"
                document.getElementById(row.id + "1").style.fontWeight = "bold"
                document.getElementById(row.id + "2").style.fontWeight = "bold"
            }
            row.onmouseleave = function() {
                // row.style.filter = "brightness(100%)"
                row.style.backgroundColor = "#c8cccc"
                document.getElementById(row.id + "1").style.fontWeight = "normal"
                document.getElementById(row.id + "2").style.fontWeight = "normal"
            }
    
            row.onclick = function() {
                // row.style.backgroundColor = "#c8cccc"
                var tempTitle = row.id
                var splittedItems = localStorage.getItem(tempTitle).split("][")
    
                var industry = splittedItems[0]
                var impact = splittedItems[1]
                var details = splittedItems[2]
    
                document.getElementById("ideaTitleText").innerHTML = tempTitle
                document.getElementById("ideaIndustry").innerHTML = industry
                document.getElementById("ideaImpact").innerHTML = impact
                document.getElementById("ideaDetails").innerHTML = details
                document.getElementById("displayIdea").style.visibility = "visible"
                localStorage.setItem("clicked", row.id)
    
                for (let idea of finalIdeas) {
                    // document.getElementById(idea).style.backgroundColor = "#c8cccc"
                    document.getElementById(idea + "1").style.color = "black"
                    document.getElementById(idea + "2").style.color = "black"
                }
    
                var clicked = localStorage.getItem("clicked")
                document.getElementById(row.id).style.backgroundColor = "#828282"
                document.getElementById(clicked + "1").style.color = "white"
                document.getElementById(clicked + "2").style.color = "white"

                localStorage.setItem("clickedRowId", row.id)

                // for (let r of rows) {
                //     r.style.backgroundColor = ""
                // }
            }
        }
    } else {
        alert("NO RESULTS")
        document.getElementById("displayIdea").style.visibility = "hidden"
    }

}

function edit() {
    var title = localStorage.getItem("clicked")
    var splitted = localStorage.getItem(title).split("][")
    var industry = splitted[0]
    var impact = splitted[1]
    var details = splitted[2]

    document.getElementById("hiddenIdeaTitleText").value = title
    document.getElementById("hiddenIdeaIndustry").value = industry
    document.getElementById("hiddenIdeaImpact").value = impact
    document.getElementById("hiddenIdeaDetails").value = details

    document.getElementById("displayIdea").style.visibility = "hidden"
    document.getElementById("hiddenForm").style.visibility = "visible"
}

function save() {
    var title = document.getElementById("hiddenIdeaTitleText").value
    var industry = document.getElementById("hiddenIdeaIndustry").value
    var impact = document.getElementById("hiddenIdeaImpact").value
    var details = document.getElementById("hiddenIdeaDetails").value

    document.getElementById(localStorage.getItem("clickedRowId")).id = localStorage.getItem("clicked")
    document.getElementById(localStorage.getItem("clickedRowId") + "1").id = localStorage.getItem("clicked") + "1"
    document.getElementById(localStorage.getItem("clickedRowId") + "2").id = localStorage.getItem("clicked") + "2"
    localStorage.setItem("clickedRowId", localStorage.getItem("clicked"))

    var deleteTitle = localStorage.getItem("clicked")
    document.getElementById(deleteTitle + "1").innerHTML = title
    document.getElementById(deleteTitle + "2").innerHTML = industry

    localStorage.setItem("clicked", title)
    localStorage.removeItem(deleteTitle)

    localStorage.setItem(title, `${industry}][${impact}][${details}`)

    document.getElementById("ideaTitleText").innerHTML = title
    document.getElementById("ideaIndustry").innerHTML = industry
    document.getElementById("ideaImpact").innerHTML = impact
    document.getElementById("ideaDetails").innerHTML = details

    document.getElementById("displayIdea").style.visibility = "visible"
    document.getElementById("hiddenForm").style.visibility = "hidden"

    var splitted = localStorage.getItem("searchList").split(",")
    var updatedSearchList = ""
    for (let elem of splitted) {
        if (elem === ",") {
            continue
        }

        if (elem === deleteTitle) {
            continue
        }

        updatedSearchList += "," + elem

    }

    updatedSearchList += "," + title

    localStorage.setItem("searchList", updatedSearchList)
}
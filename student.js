                                                                                // ALL PAGES 




function line() {
    if (window.pageYOffset >= 5) {
        document.getElementById("headerLine").style.visibility = "visible"
    } else {
        document.getElementById("headerLine").style.visibility = "hidden"
    }
}

function kmLogo() {
    document.getElementById("logoTextInFooter").onmouseenter = function() {
        document.getElementById("logoTextInFooter").style.filter = "brightness(80%)"
        document.getElementById("smallLogoLineInFooter").style.filter = "brightness(80%)"
        document.getElementById("largeLogoLineInFooter").style.filter = "brightness(80%)"
    }

    document.getElementById("logoTextInFooter").onmouseleave = function() {
        document.getElementById("logoTextInFooter").style.filter = "brightness(100%)"
        document.getElementById("smallLogoLineInFooter").style.filter = "brightness(100%)"
        document.getElementById("largeLogoLineInFooter").style.filter = "brightness(100%)"
    }
}



                                                                                // FILTER SEARCH PAGE 






function getInput() {

    let inputtedTitle = document.getElementById("sTitle").value
    let inputtedSex = document.getElementById("sSex").value
    let chosenGrades = []
    let inputtedClubs = []

    // chosenGrades gets appended the value of the chosen grades 
    let gradesValue = [
        document.getElementById("sGrade9").checked, 
        document.getElementById("sGrade10").checked,
        document.getElementById("sGrade11").checked,
        document.getElementById("sGrade12").checked
    ];
    for (let i = 0; i < gradesValue.length; i++) {
        if (gradesValue[i] === true) {
            chosenGrades.push(`Grade ${i+9}`);
        }
    }

    // inputtedClubs gets appended the value of the chosen clubs 
    let clubsValue = [
        ["NONE", document.getElementById("sNone").checked], 
        ["HOSA", document.getElementById("sHosa").checked],
        ["DECA", document.getElementById("sDeca").checked],  
        ["STEM", document.getElementById("sStem").checked], 
        ["Chess", document.getElementById("sChess").checked], 
        ["FILM", document.getElementById("sFilm").checked], 
        ["SAC", document.getElementById("sSac").checked], 
        ["Computer", document.getElementById("sComputer").checked]
    ];
    for (let i = 0; i < clubsValue.length; i++) {
        if (clubsValue[i][1] === true) {
            inputtedClubs.push(clubsValue[i][0]);
        }
    }

    // ITEMS UPLOADED TO LOCAL STORAGE FOR TEMPORARY USAGE
    localStorage.setItem("inputtedTitle", inputtedTitle)
    localStorage.setItem("inputtedSex", inputtedSex)
    localStorage.setItem("chosenGrades", chosenGrades)
    localStorage.setItem("inputtedClubs", inputtedClubs)

}




                                                                                // SEARCH ENGINE PAGE 





// SEARCH ENGINE PAGE FUNCTION, TO FILTER AND FIND ANNOUNCEMENTS
function findAnn() {

    // VARIABLES STORING INPUT, THEN DELETING RESPECTIVE LOCAL STORAGE ELEMENTS 
    let title = localStorage.getItem("inputtedTitle")
    localStorage.removeItem("inputtedTitle")

    let sex = localStorage.getItem("inputtedSex")
    localStorage.removeItem("inputtedSex")

    let grades = localStorage.getItem("chosenGrades")
    localStorage.removeItem("chosenGrades")

    let clubs = localStorage.getItem("inputtedClubs")
    localStorage.removeItem("inputtedClubs")

    var inputtedVals = []

    // CHECKS WHICH INPUTS ARE PRESENT, THEN APPENDS RESPECTIVE INPUTS TO inputtedVals
    if (title) {
        inputtedVals.push(title)
    } 
    if (sex) {
        inputtedVals.push(sex)
    } 
    if (grades) [
        inputtedVals.push(grades.split(","))
    ]
    if (clubs) {
        inputtedVals.push(clubs)
    }

    var final_announcements = []

    // DISPLAYS ALL ANNOUNCEMENTS IF SEX IS SET TO "All"
    if (sex === "All") {
        for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i) === "Favorites" || localStorage.key(i) === "entered") {
                continue
            }

            let key = localStorage.key(i)
            let value = localStorage.getItem(key)
            let keysVals = key + value

            final_announcements.push(`${key}:${value}`)
        }
    } else {

        // ALGORITHM CHECKS WHICH ANNOUNCEMENTS FROM LOCAL STORAGE MATCH INPUT, THEN APPEND MATCHING ANNOUNCEMENTS TO final_announcements
        for (let i = 0; i < localStorage.length; i++) {

            // CHECKS IF LOCAL STORAGE ELEMENTS ARE "Favorites" or "entered", AND CONTINUE IF TRUE 
            if (localStorage.key(i) === "Favorites" || localStorage.key(i) === "entered") {
                continue
            }
            let key = localStorage.key(i)
            let value = localStorage.getItem(key)
            let keysVals = key + value

            for (let vals of inputtedVals) {

                // IF vals IS AN ARRAY, IT WILL BE THE GRADES ARRAY, AND WILL THEREFORE ITERATE THROUGH GRADES ARRAY TO COMPARE INPUT WITH GRADES
                if (Array.isArray(vals)) {
                    for (let grade of vals) {
                        if (keysVals.toLowerCase().search(grade.toLowerCase()) >= 0 && checkIfElementInArr(final_announcements, key)) {
                            final_announcements.push(`${key}:${value}`)
                            break
                        }
                    }

                // IF vals NOT ARRAY, IT WILL EITHER BE TITLE, GENDER, OR CLUBS, AND WILL COMPARE RESPECTIVE VALUES 
                } else {
                    if (keysVals.toLowerCase().search(vals.toLowerCase()) >= 0 && checkIfElementInArr(final_announcements, key)) {
                        final_announcements.push(`${key}:${value}`)
                    }
                    continue
                }
            }
        }

    }

    // "Results:" TEXT WILL BE APPENDED THE VALUE OF THE NUMBER OF RESULTS
    document.getElementById("results").innerHTML += final_announcements.length

    if (final_announcements.length === 0) {
        
        document.getElementById("noResultsStudent").innerHTML = "Your inputs match NO existing announcements."

    } else {

        // ITERATES THROUGH final_announcements TO CREATE FORMATTED DISPLAY OF RESULTS
        for (let ann of final_announcements) {

            // splitted WILL SPLIT THE TITLE FROM ALL OTHER VALUES 
            var splitted = ann.split(":")
            var newTitle = splitted[0]

            // CREATES ROW INSIDE TABLE IN EVERY ITERATION OF LOOP
            var table = document.getElementById("searchTable")
            var row = table.insertRow()

            // TITLE TEXT 
            var p = document.createElement("p")
            var text = document.createTextNode(newTitle)
            row.appendChild(p).appendChild(text)
            row.style.height = "320px";

            // FAVORITES BUTTON
            var f = document.createElement("button")
            var fText = document.createTextNode("Add To Favorites")

            row.appendChild(f).appendChild(fText)
            f.style.height = "50px"
            f.style.width = "400px"
            f.style.position = "relative"
            f.style.top = "35px";
            f.style.right = "160px";

            // FAVORITES CHECKBOX
            var checkbox = document.createElement("INPUT")
            checkbox.setAttribute("type", "checkbox")
            checkbox.id = newTitle + "check"
            row.appendChild(checkbox)

            // AUTOMATICALLY CHECKS THE CHECKBOX IF ANNOUNCEMENT PRESENT IN FAVORITES STRING IN LS
            var existingData = localStorage.getItem("Favorites")
            if (existingData.search(checkbox.id) >= 0) {
                document.getElementById(checkbox.id).checked = true
            } else {
                document.getElementById(checkbox.id).checked = false
            }

            // DETAILS BUTTON
            var d = document.createElement("button")
            var dText = document.createTextNode("More Details") 
            d.id = newTitle

            row.appendChild(d).appendChild(dText)
            d.style.height = "50px";
            d.style.width = "350px"
            d.style.position = "relative"
            d.style.top = "35px";
            d.style.right = "-160px";

            // HR LINE
            var h = document.createElement("hr")
            row.appendChild(h)

        } 


        var buttons = document.querySelectorAll("tr > button")

        // DISPLAYS THE ANNOUNCEMENT'S DETAILS OF WHICH THE BUTTON IS ASSOCIATED TO 
        for (let elem of buttons) {

            // ONCLICK OF ANY BUTTON, FUNCTION WILL BE EXECUTED
            elem.onclick = function() {

                // IF ELEMENT IS NOT THE "ADD TO FAVORITES" BUTTON OR THE CHECKBOX, IT WILL ENTER THIS IF STATEMENT
                if (elem.id.search("fav") < 0 && elem.id.search("check") < 0) {
                    console.log(elem.id)
                    var valSplit = localStorage.getItem(elem.id).split("][")
                    var newestTitle = elem.id
                    var newGrades;
                    var newGender;
                    var newDetails;
                    var newClubs;

                    if (valSplit[0]) {
                        newGrades = valSplit[0]
                    } else {
                        newGrades = "Not Specified"
                    }

                    if (valSplit[1]) {
                        newGender = valSplit[1]
                    } else {
                        newGender = "Not Specified"
                    }

                    if (valSplit[2]) {
                        newClubs = valSplit[2]
                    } else {
                        newClubs = "Not Specified"
                    }

                    if (valSplit[3]) {
                        newDetails = valSplit[3]
                    } else {
                        newDetails = "Not Specified"
                    }

                    alert("Title: " + newestTitle + "\n" + "Grades: " + newGrades + "\n" + "Gender: " + newGender + "\n" + "Clubs: " + newClubs + "\n" + "Details: " + newDetails)
                }
            }
        }

        // FUNCTION WHICH CHECKS IF CHECKBOX HAS BEEN CLICKED, AND SHOULD THEREFORE ADD IT TO "Favorites" LOCAL STORAGE KEY AND SUBSEQUENTLY TO THE FAVORITES PAGE
        toggleFunc()
    }

    // INCREASES THE BODY HEIGHT OF SEARCH ANNOUNCEMENTS PAGE ACCORDING TO THE NUMBER OF ANNOUNCEMENTS
    document.body.style.height = (1600 + final_announcements.length * 320) + "px"
}

// CHECKS IF KEY IS IN ARR
function checkIfElementInArr(arr, key) {
    for (elem of arr) {
        if (elem.search(key) >= 0) {
            return false
        }
    }
    return true
}




                                                                                // FAVORITES PAGE 





// ADDS LS KEY Favorites' ITEMS TO FAVORITES PAGE
function favorites() {
    var favVals = localStorage.getItem("Favorites")

    // REMOVES ALL COMMAS IN Favorites KEY FROM THE FRONT
    while (favVals[0] === ",") {
        favVals = favVals.slice(1)
    }

    localStorage.setItem("Favorites", favVals)

    // CHECKS IF favVals HAS A VALUE, AND ENTERS IF STATEMENT IF TRUTHY
    if (favVals) {
        var favoriteAnn = localStorage.getItem("Favorites")
        var favSplitted = favoriteAnn.split(",")

        // APPENDS ANNOUNCEMENT TITLE (key) AND OTHER VALUES (val) TO finalFav
        var finalFav = []
        for (let elem of favSplitted) {
            var key = elem.slice(0, -5)
            var val = localStorage.getItem(key)
            finalFav.push(`${key}:${val}`)
        }

        for (let ann of finalFav) {

            // SEPERATES KEY (title) FROM VALUES (grades, gender, clubs, details)
            var splitted = ann.split(":")
            var newTitle = splitted[0]

            // ADDS ROW TO TABLE IN EVERY ITERATION OF LOOP
            var table = document.getElementById("favoritesTable")
            var row = table.insertRow()

            // TITLE TEXT
            var p = document.createElement("p")
            var text = document.createTextNode(newTitle)
            row.appendChild(p).appendChild(text)
            row.style.height = "320px";

            // FAVORITES BUTTON
            var f = document.createElement("button")
            var fText = document.createTextNode("Add To Favorites")

            row.appendChild(f).appendChild(fText)
            f.style.height = "50px"
            f.style.width = "400px"
            f.style.position = "relative"
            f.style.top = "35px";
            f.style.right = "160px";

            // FAVORITES CHECKBOX
            var checkbox = document.createElement("INPUT")
            checkbox.setAttribute("type", "checkbox")
            checkbox.id = newTitle + "check"
            row.appendChild(checkbox)

            // AUTOMATICALLY CHECKS THE CHECKBOX IF ANNOUNCEMENT PRESENT IN FAVORITES STRING IN LS
            var existingData = localStorage.getItem("Favorites")
            if (existingData.search(checkbox.id) >= 0) {
                document.getElementById(checkbox.id).checked = true
            } else {
                document.getElementById(checkbox.id).checked = false
            }

            // DETAILS BUTTON
            var d = document.createElement("button")
            var dText = document.createTextNode("More Details") 
            d.id = newTitle

            row.appendChild(d).appendChild(dText)
            d.style.height = "50px";
            d.style.width = "350px"
            d.style.position = "relative"
            d.style.top = "35px";
            d.style.right = "-160px";

            // HR LINE
            var h = document.createElement("hr")
            row.appendChild(h)

        } 

        // SELECTS ALL BUTTONS IN TABLE 
        var buttons = document.querySelectorAll("tr > button")

        // DISPLAYS THE ANNOUNCEMENT'S DETAILS OF WHICH THE BUTTON IS ASSOCIATED TO 
        for (let elem of buttons) {
            elem.onclick = function() {

                // ENTERS IF STATEMENTS IF BUTTON IS NOT "ADD TO FAVORITES" BUTTON OR CHECKBOX
                if (elem.id.search("fav") < 0 && elem.id.search("check") < 0) {
                    var valSplit = localStorage.getItem(elem.id).split("][")
                    var newestTitle = elem.id
                    var newGrades;
                    var newGender;
                    var newDetails;
                    var newClubs;

                    if (valSplit[0]) {
                        newGrades = valSplit[0]
                    } else {
                        newGrades = "Not Specified"
                    }

                    if (valSplit[1]) {
                        newGender = valSplit[1]
                    } else {
                        newGender = "Not Specified"
                    }

                    if (valSplit[2]) {
                        newClubs = valSplit[2]
                    } else {
                        newClubs = "Not Specified"
                    }

                    if (valSplit[3]) {
                        newDetails = valSplit[3]
                    } else {
                        newDetails = "Not Specified"
                    }

                    alert("Title: " + newestTitle + "\n" + "Grades: " + newGrades + "\n" + "Gender: " + newGender + "\n" + "Clubs: " + newClubs + "\n" + "Details: " + newDetails)
                }
            }
        }

        // FUNCTION CHECKS IF CHECKBOX WAS CHECKED OR UNCHECKED. IF CHECKED (first if statement), IT WILL ADD ANNOUNCEMENT TO Favorites KEY IN LS. IF UNCHECKED, IT WILL REMOVE IT FROM Favorites KEY IN LS.
        toggleFunc()

        document.body.style.height = (1600 + finalFav.length * 320) + "px"
    } else {
        var h6 = document.getElementById("h6")
        var text = document.createTextNode("You have no Favorite Announcements.")
        h6.appendChild(text)
    }
}




                                                                                // FUNCTION USED IN FAVORITES AND SEARCH ENGINE PAGE





// TOGGLE FAVORITES CHECKBOX. UNCHECKING WILL REMOVE FROM FAVORITES, CHECKING WILL ADD IT TO FAVORITES 
function toggleFunc() {

    // SELECTS ALL INPUT ELEMENTS (checkbox is the only one) IN TABLE 
    var check = document.querySelectorAll("tr > input")
    for (let box of check) {

        // ONCLICK, FUNCTION WILL BE EXECUTED
        box.addEventListener('click', function() {

            // CHECKS IF CHECKBOX IS CHECKED. ENTERS IF STATEMENT BODY IF .checked returns TRUE, AND ELSE OTHERWISE 
            if (document.getElementById(box.id).checked) {
                var existingData = localStorage.getItem("Favorites")

                // IF box.id IS NOT PRESENT IN Favorites KEYS ITEMS, IT WILL ADD IT
                if (existingData.search(box.id) < 0) {
                    localStorage.setItem("Favorites", existingData + "," + box.id)
                }

            } else {
                var existingData = localStorage.getItem("Favorites")
                while (existingData[0] === ",") {
                    existingData = existingData.slice(1)
                }
                var splittedData = existingData.split(",")
                var newArr = ""

                // ADDS ALL ANNOUNCEMENTS FROM splittedData TO newArr IF box.id DOES NOT MATCH ANY ID IN Favorites KEY IN LS
                for (let i = 0; i < splittedData.length; i++) {
                    if (splittedData[i] != box.id) {
                        newArr += "," + splittedData[i]
                    }
                }

                // SETS Favorites KEY IN LS TO NEW ARR, WHICH DOES NOT CONTAIN 
                localStorage.setItem("Favorites", newArr)

                // IF THE CURRENT PAGE IS THE FAVORITES PAGE, RELOAD PAGE TO ACCURATELY DISPLAY ALL FAVORITES RESULTS
                if (location.href === "file:///Users/krishmehta/Desktop/HTML/favorites.html") {
                    location.reload()
                }
            }
        })
    }
}


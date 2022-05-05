                                                                                // ALL PAGES 





// DISPLAYS LINE BENEATH HEADER WHEN PAGE IS SCROLLED MORE THAN 5 PIXELS
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



                                                                                // AUTHORIZATION PAGE 





// AUTHORIZES PERSON, CHECKS IF THEY ARE ALLOWED TO ENTER THE SITE. ONLY KRISH MEHTA AND MS. PREMAWARDENA ARE ALLOWED.
function authorize() {
    if ((document.getElementById("name").value === "Krish Mehta" && document.getElementById("sex").value === "M") || (document.getElementById("name").value === "Chamila Premawardena" && document.getElementById("sex").value === "F")) {
        authorization()
    } else {
        alert("You are not authorized to access the school's Announcements database.")
        location.reload()
    }
}

// Confirm button for authorization. Links to authorization1.html file, to confirm button
function authorization() {
    var myName = document.getElementById("name").value;
    var sex = document.getElementById("sex").value;
    var prefix;
    if (myName && sex) {
        if (sex === "M" || sex === "Male") {
            prefix = " Mr. ";
        } else if (sex === "F" || sex === "Female") {
            prefix = " Ms. ";
        } else {
            prefix = " "
        }
        document.getElementById("continueToAnn").style.visibility = "visible";
        document.getElementById("agreement").style.visibility = "visible";
        document.getElementById("terms").innerHTML = `I,${prefix}${myName}, confirm of my occupation being a teacher, and my workplace being North Park Secondary School. 
        I realize the consequences of using a false identity to access and manipulate this database, and agree to be held fully accountable for my actions on this site. 
        I agree to the terms and conditions of using this page, and will thereby remain within the rules and regulations set by this site for usage.`;
    }
}





                                                                                // ANNOUNCEMENT INPUT AND PREVEIW PAGE 





// The var finalTitle temporarily stores the title of the announcement, when creating the announcement
let finalTitle;

// The var final_sex temporarily stores the sex to which the announcement applies 
let final_sex;

// The var final_grades temporarily stores all the grades which have been selected by the teacher
let final_grades = [];

// The var final_clubs temporarily stores all clubs which have been selected by the teacher
let final_clubs = [];

// The var annDetails stands for "announcement details," and temporarily stores the details of the announcement
let annDetails;

function preview() {

    if (document.getElementById("title").value) {
        if (checkInput()) {
            window.finalTitle = document.getElementById("title").value
        } else {
            alert("An announcement with this name already exists. Please choose a different one.")
            location.reload()
        }
        
        // Updates final_sex with the inputted sex
        final_sex = document.getElementById("inpSex").value;
    
        // Updates final_grades with the chosen grades
        let inp_grades = [
            document.getElementById("grade9").checked, 
            document.getElementById("grade10").checked,
            document.getElementById("grade11").checked,
            document.getElementById("grade12").checked
        ];
        for (let i = 0; i < inp_grades.length; i++) {
            if (inp_grades[i] === true) {
                final_grades.push(`Grade ${i+9}`);
            }
        }
    
        // Updates final_clubs with the clubs this announcement concerns
        let a_clubs = [
            ["NONE", document.getElementById("none").checked], 
            ["HOSA", document.getElementById("hosa").checked],
            ["DECA", document.getElementById("deca").checked],  
            ["STEM", document.getElementById("stem").checked], 
            ["Chess", document.getElementById("chess").checked], 
            ["FILM", document.getElementById("film").checked], 
            ["SAC", document.getElementById("sac").checked], 
            ["Computer", document.getElementById("computer").checked]
        ];
        for (let i = 0; i < a_clubs.length; i++) {
            if (a_clubs[i][1] === true) {
                final_clubs.push(a_clubs[i][0]);
            }
        }
    
        // Updates annDetails with the details of the announcement
        annDetails = document.getElementById("details").value;
    
        document.getElementById("allAnnInputs").style.display = "none"
        document.getElementById("preview").style.display = "block"
    
        window.scrollTo(0,0)
        document.getElementById("previewTitleInput").innerHTML = window.finalTitle
        document.getElementById("previewGradesInput").innerHTML = final_grades
        document.getElementById("previewSexInput").innerHTML = final_sex
        document.getElementById("previewClubsInput").innerHTML = final_clubs
        document.getElementById("previewDetailsInput").innerHTML = annDetails
    } else {
        alert("Please input a title.")
        location.reload()
        window.scrollTo(0,0)
    }
}

// Checks if the title exists in localStorage 
function checkInput() {
    var tempTitle = document.getElementById("title").value

    for (let x = 0; x < localStorage.length; x++) {
        if (localStorage.key(x) === tempTitle) {
            return false
        }
        continue
    }
    return true
}

// Edit button in preview section in announcement_input page 
function edit() {
    window.finalTitle = undefined;
    final_sex = undefined;
    final_grades = [];
    final_clubs = []
    annDetails = undefined;
    document.getElementById("preview").style.display = "none"
    document.getElementById("allAnnInputs").style.display = "block"
    window.scrollTo(0,0)
}

// On the click of the Post button on the preview page, the inputted elements will be added to local storage
function post() {
    localStorage.setItem(window.finalTitle, `${final_grades}][${final_sex}][${final_clubs}][${annDetails}`)
    localStorage.setItem("Title", window.finalTitle)
}





                                                                                // FINAL POST PAGE





// Prints TITLE in final_post.html page
function getTitle() {
    document.getElementById("displayTitle").innerHTML = `Your announcement, titled "${localStorage.getItem("Title")}" has been posted.`
    localStorage.removeItem("Title")
}





                                                                                // DELETE PAGE





// FUNCTION FOR FINDING SEARCH RESULTS FROM INPUTS FROM DELETE PAGE (DELETE PAGE FUNCTION)
function datalistAnn() {

    // REMOVES ALL STORED ROWS IN RESULTS TABLE
    while (document.getElementById("deleteTable").rows.length > 0) {
        document.getElementById("deleteTable").deleteRow(0)
    }

    // GETS INPUT FROM ALL DROWDOWN MENUS
    var title = document.getElementById("dS").value
    var sex = document.getElementById("delGender").value
    var grades = document.getElementById("delGrades").value
    var clubs = document.getElementById("delClubs").value

    // ARRAY CONTAINS ALL INPUTTED VALUES
    var inputtedVals = []
    
    if (title) {
        inputtedVals.push(title)
    }
    if (sex) {
        inputtedVals.push(sex)
    }
    if (grades) {
        inputtedVals.push(grades)
    }
    if (clubs) {
        inputtedVals.push(clubs)
    }

    var results = []

    // IF INPUTTED SEX WAS "All" OR INPUTTED GRADES WAS "All", IF STATEMENT IS ENTERED, ALL ANNOUNCEMENTS WILL BE ADDED TO RESULTS AND DISPLAYED
    if (sex === "All") {
        for (let i = 0; i < localStorage.length; i++) {

            // PREVENTS LOOP FROM ACCESSING "Favorites" and "entered" KEYS IN LS
            if (localStorage.key(i) === "Favorites" || localStorage.key(i) === "entered") {
                continue
            }

            results.push(`${localStorage.key(i)}:${localStorage.getItem(key)}`)
        }
    } else {
        for (let i = 0; i < localStorage.length; i++) {

            // PREVENTS LOOP FROM ACCESSING "Favorites" and "entered" KEYS IN LS
            if (localStorage.key(i) === "Favorites" || localStorage.key(i) === "entered") {
                continue
            }

            var key = localStorage.key(i) 
            var value = localStorage.getItem(key)
            var keyValue = key + value
    
            // LOOPS THROUGH ALL VALUES WHICH WERE INPUTTED TO LOOK FOR MATCH
            for (let val of inputtedVals) {
                if (keyValue.toLowerCase().search(val.toLowerCase()) >= 0 && checkIfElementInArr(results, key)) {
                    results.push(`${key}:${value}`)
                }
            }
        }
    }

    if (results.length === 0) {
        document.getElementById("noResultsTeacher").innerHTML = "Your inputs match NO existing announcements."
        document.getElementById("noResultsTeacher").style.color = "white"
    } else {
        document.getElementById("noResultsTeacher").innerHTML = ""

        // ITERATES THROUGH "results" ARRAY AND CREATES FORMATTED DISPLAY OF RESULTS
        for (let ann of results) {

            // splitted WILL SPLIT THE TITLE FROM ALL OTHER VALUES 
            var splitted = ann.split(":")
            var newTitle = splitted[0]

            // CREATES ROW INSIDE TABLE IN EVERY ITERATION OF LOOP
            var table = document.getElementById("deleteTable")
            var row = table.insertRow()

            // TITLE TEXT 
            var p = document.createElement("p")
            var text = document.createTextNode(newTitle)
            row.appendChild(p).appendChild(text)
            row.style.height = "335px";

            // DELETE BUTTON
            var delBtn = document.createElement("button")
            var del = document.createTextNode("Delete")
            delBtn.id = newTitle + "del"

            row.appendChild(delBtn).appendChild(del)
            delBtn.style.height = "50px"
            delBtn.style.width = "400px"
            delBtn.style.position = "relative"
            delBtn.style.top = "35px";
            delBtn.style.right = "160px";

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

                // IF ELEMENT IS "MORE DETAILS" BUTTON, IT WILL ENTER THIS IF STATEMENT. IF ELEMENT IS "DELETE" BUTTON, IT WILL ENTER ELSE STATEMENT 
                if (elem.id.search("del") < 0) {

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
                
                } else {

                    document.getElementById(elem.id).innerText = "Deleted"

                    // REMOVES ANNOUNCEMENT FROM LS
                    var annTitle = elem.id
                    annTitle = annTitle.slice(0, -3)
                    localStorage.removeItem(annTitle)

                    // REMOVES ANNOUNCEMENT FROM LS KEY "Favorites"
                    var favorites = localStorage.getItem("Favorites")
                    while (favorites[0] === ",") {
                        favorites = favorites.slice(1)
                    }

                    var favSplitted = favorites.split(",")
                    var newFav = ""
                    for (let i = 0; i < favSplitted.length; i++) {
                        if (favSplitted[i].search(annTitle) < 0) {
                            newFav += "," + favSplitted[i]
                        }
                    }
                    localStorage.setItem("Favorites", newFav)

                }
            }
        }

    }

    document.body.style.height = 1600 + (335 * results.length) + "px"

}

// REMOVES DELETED ANNOUNCEMENT TITLES FROM DELETE PAGE SEARCH DATALIST. EXECUTED WHEN DELETE PAGE IS UNLOADED
function removeFromDatalist(arr) {
    var list = document.getElementById("dI")
    for (let j = 0; j < arr.length; j++) {
        for (let i = 0; i < list.options.length; i++) {
            if (list.options[j].value === arr[i]) {
                list.remove(i)
            }
        }
    }
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

// ADDS EACH ANNOUNCEMENT TITLE TO DROPDOWN OPTION VALUES 
function dropdown() {
    var datalist = document.getElementById("dI")

    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) === "Favorites" || localStorage.key(i) === "entered") {
            continue
        }

        var option = document.createElement("option")
        var text = localStorage.key(i)

        option.value = text
        datalist.appendChild(option)
    }
}

// STYLING FOR CREATE BUTTON ON DELETE PAGE 
function createButtonOnDeletePage() {
    var arrow = document.getElementById("arrow")
    var button = document.getElementById("createButtonOnDeletePage")

    arrow.style.position = "absolute"
    arrow.style.bottom = "730px"
    arrow.style.right = "90px"
    button.style.position = "absolute"
    button.style.bottom = "730px"
    button.style.right = "90px"
    button.style.height = "50px"
    button.style.width = "630px"
    button.style.backgroundColor = "#093373"
    button.style.fontFamily = "Andale Mono, AndaleMono, monospace"
    button.style.fontSize = "50px"
    button.style.textDecoration = "none"
    button.style.color = "white"

    button.onmouseenter = function() {
        button.style.right = "120px"
        arrow.style.visibility = "visible"
        button.style.color = "lightSalmon"
    }

    button.onmouseleave = function() {
        button.style.right = "70px"
        arrow.style.visibility = "hidden"
        button.style.color = "white"
    }
}





                                                                                // ANNOUNCEMENT INPUT PAGE 





// STYLING FOR DELETE BUTTON ON CREATE PAGE
function deleteButtonOnCreatePage() {
    var arrow = document.getElementById("arrowInput")
    var button = document.getElementById("deleteButtonOnCreatePage")
    arrow.style.position = "absolute"
    arrow.style.bottom = "730px"
    arrow.style.right = "90px"

    button.onmouseenter = function() {
        button.style.right = "120px"
        button.style.color = "lightSalmon"
        arrow.style.visibility = "visible"
    }

    button.onmouseleave = function() {
        button.style.right = "70px"
        button.style.color = "white"
        arrow.style.visibility = "hidden"
    }
}





                                                                                // FAVORITES PAGE





// STYLING FOR SEARCH BUTTON ON FAVORITES PAGE
function searchButtonOnFavoritesPage() {
    var arrow = document.getElementById("arrowFavorites")
    var button = document.getElementById("createButtonOnFavoritesPage")
    arrow.style.position = "absolute"
    arrow.style.bottom = "730px"
    arrow.style.left = "80px"
    button.style.position = "absolute"
    button.style.bottom = "680px"
    button.style.left = "70px"
    button.style.height = "100px"
    button.style.width = "630px"
    button.style.backgroundColor = "#093373"
    button.style.fontFamily = "Andale Mono, AndaleMono, monospace"
    button.style.fontSize = "50px"
    button.style.textDecoration = "none"
    button.style.color = "white"

    button.onmouseenter = function() {
        button.style.left = "140px"
        button.style.color = "lightSalmon"
        arrow.style.visibility = "visible"
    }

    button.onmouseleave = function() {
        button.style.left = "70px"
        button.style.color = "white"
        arrow.style.visibility = "hidden"
    }
}


//-------- ([ Super Hero Main Info Page ]) --------

// Get Items that are stored in Local Storage
//  Unique Id's

//-------- ([ Variable Declaration  ]) --------

var FavoriteIdArray = [localStorage.getItem("FavoriteIdArray")];
localStorage.getItem("FavoriteIdArray");

if (JSON.parse(localStorage.getItem("FavoriteIdArray")) != null) {
    FavoriteIdArray = JSON.parse(localStorage.getItem("FavoriteIdArray"));
}

localStorage.setItem("FavoriteIdArray", JSON.stringify(FavoriteIdArray));

let superResults = document.getElementById("super-results");
var resultId = localStorage.getItem("id");
console.log(resultId);

//-------- ([ async function to fetch id and datas ]) --------

async function fetchID(idd) {
    try {
        await fetch(
            `https://gateway.marvel.com/v1/public/characters/${idd}?&ts=1&apikey=e1de55e77fe1473b015ecf2427a9e302&hash=334b09e4b9df89d3649360679b5e2988`
        )
            .then((response) => response.json())
            .then((datas) => {
                var JsonResult = datas.data.results;
                console.log(datas.data.results);
                showResultIdResults(datas.data.results);
            });
    } catch (error) {
        console.log(error);
    }
}

//--------(Function : To Render the DOM to Dispaly More Info )--------

function showResultIdResults(APIdata) {
    //--------( Finding if hero id is in fav list or not )--------
    var idid = true;
    let hero = APIdata[0];
    if (FavoriteIdArray && FavoriteIdArray.length > 0) {
        FavoriteIdArray.forEach((id) => {
            if (hero.id == id) {
                idid = false;
            }
        });
    }

    //--------( )--------

    // getting the single hero
    // hero is the object that we get from API
    // Appending the element into DOM

    //--------( )--------

    let superResults = document.getElementById("super-results");
    superResults.innerHTML += `
    <div class=" mainContainer flex-row hero-img-and-more-info">
    <img id="portraitImage" class="hero-img" src="${
        hero.thumbnail.path +
        "/landscape_incredible." +
        hero.thumbnail.extension
    }" alt="">
    <div class="card">
        <div class="flex-col more-info txtarea">
                <div class="flex-col hero-name">${hero.name}</div>
                <div class="flex-row id">
                    <b>ID:</b><span>${hero.id}</span>
                </div>
                <div class="flex-row comics">
                    <b>Comics:</b><span>${hero.comics.available}</span>
                </div>
                <div class="flex-row series">
                    <b>Series:</b><span>${hero.series.available}</span>
                </div>
                <div class="flex-row stories">
                    <b>Stories:</b><span>${hero.stories.available}</span>
                </div>
                <div class="flex-row stories">
                    <b>Events:</b><span>${hero.events.available}</span>
                </div>
        </div>
         <br>

         <div class="flex-col desp hero-discription">
                         <b>Discription:</b>
                         <p><span class = "desss">${
                             hero.description != ""
                                 ? hero.description
                                 : "No Description Available"
                         }</span></p>
                    </div>
    </div>
  <div id="favBtnNew" class="favBtnNew">
                        <div class="cardi">
                            <button id = "addToFavBtn"  class = "addToFavBtn" >
                            ${
                                idid
                                    ? '<i  id = "adFAV"  class="fa-solid fa-heart fav-icon remFavBtn"></i> &nbsp; Add to Favourites</button>'
                                    : '<i id = "rmFAV" class="fa-solid fa-heart-circle-minus addToFavBtnBtn"></i> &nbsp; Remove from Favourites'
                            }
                        </div>
                    </div>
    </div>
            `;
}

//--------( Calling the function to Fetch Id and display more info )--------

fetchID(resultId);

//--------( Making event listener in global section )--------

document.addEventListener("click", handleDocumentClick);
function handleDocumentClick(e) {
    const eventTarget = e.target;

    //--------(Conditions For Add Favourite Button )--------

    if (
        eventTarget.className === "addToFavBtn" &&
        eventTarget.children[0].id == "adFAV"
    ) {
        FavIDafterClick =
            e.target.parentElement.parentElement.parentElement.parentElement
                .children[0].children[1].children[0].children[1].children[1]
                .innerHTML;
        console.log("favvvv  ", FavIDafterClick);
        FavoriteIdArray.push(FavIDafterClick); // adding id
        function removeDuplicates(arr) {
            return arr.filter((item, index) => arr.indexOf(item) === index);
        }
        FavoriteIdArray = removeDuplicates(FavoriteIdArray);
        localStorage.setItem(
            "FavoriteIdArray",
            JSON.stringify(FavoriteIdArray)
        );
        renderAgain();
    }

    //--------(Conditions For Remove Favourite Button )--------

    if (
        eventTarget.className === "addToFavBtn" &&
        eventTarget.children[0].id == "rmFAV"
    ) {
        FavIDafterClick =
            e.target.parentElement.parentElement.parentElement.parentElement
                .children[0].children[1].children[0].children[1].children[1]
                .innerHTML;
        removeFavArray(FavoriteIdArray, FavIDafterClick); // removing id

        localStorage.setItem(
            "FavoriteIdArray",
            JSON.stringify(FavoriteIdArray)
        );
        renderAgain();
    }
}

//--------(Function : To Remove the id of superHero , when Clicked on Remove From Favourite Button)--------

function removeFavArray(FavoriteIdArray, heroid) {
    FavoriteIdArray.forEach((element) => {
        if (element == heroid) {
            let xx = FavoriteIdArray.indexOf(element);
            if (xx != -1) {
                console.log("Before ", FavoriteIdArray);
                FavoriteIdArray.splice(xx, 1);
                console.log("After ", FavoriteIdArray);
            }
        }
    });
}

//--------(Function : To Render Again the DOM )--------

function renderAgain() {
    superResults.innerHTML = "";
    fetchID(resultId);
}

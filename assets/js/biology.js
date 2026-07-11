const topicsContainer = document.getElementById("topics");
const searchBox = document.getElementById("searchBox");
const noResult = document.getElementById("noResult");

let biologyTopics = [];

// Load Biology Topics
fetch("../data/biology.json")
.then(response => response.json())
.then(data => {

    biologyTopics = data;

    displayTopics(biologyTopics);

})
.catch(error => {

    console.error("Error loading Biology topics:", error);

});


// Display Topics
function displayTopics(topics){

    topicsContainer.innerHTML = "";

    if(topics.length === 0){

        noResult.style.display = "block";

        return;

    }

    noResult.style.display = "none";

    topics.forEach(topic => {

        const card = document.createElement("div");

        card.className = "note";

        card.innerHTML = `
            <a href="${topic.url}">
                ${topic.title}
            </a>

            <p>${topic.description}</p>
        `;

        topicsContainer.appendChild(card);

    });

}


// Live Search
searchBox.addEventListener("keyup", function(){

    const keyword = this.value.toLowerCase().trim();

    const filteredTopics = biologyTopics.filter(topic =>

        topic.title.toLowerCase().includes(keyword) ||

        topic.description.toLowerCase().includes(keyword)

    );

    displayTopics(filteredTopics);

});

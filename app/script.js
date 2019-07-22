var app = document.getElementById("script")
var logo = document.createElement("img")
logo.src = "logo.png"

var container = document.createElement("div")
app.appendChild(logo)
app.appendChild(container)
var request = new XMLHttpRequest()

var url
request.open("GET", "https://api.mercadolibre.com/sites", true)

request.onload = function (ev) {
    var data = JSON.parse(this.response)
    if (request.status >= 200 && request.status < 400) {
        var cardContainer = document.createElement("div")
        cardContainer.setAttribute("class", "card")
        data.forEach(function (site) {
            var card = document.createElement("div")
            card.setAttribute("class", "card childCard")
            var h1 = document.createElement("h1")
            h1.textContent = site.id
            card.onclick = function () {
                    moreCategories(site.id)
                }
            var p = document.createElement("p")
            p.textContent = site.name

            card.appendChild(h1)
            card.appendChild(p)
            cardContainer.appendChild(card)
        })

        container.appendChild(cardContainer)
    } else {
        var errorMessage = document.createElement("marquee")
        errorMessage.textContent = "status_code = " + data.status + " - message = " + data.message
        app.appendChild(errorMessage)
    }
}


request.send()

function moreCategories(id) {
    var requestcat = new XMLHttpRequest()
    requestcat.open("GET", "https://api.mercadolibre.com/sites/" + id, true)

    requestcat.onload = function (ev) {
        var data2 = JSON.parse(this.response)
        if (requestcat.status >= 200 && requestcat.status < 400) {
            var cardContainer = document.createElement("div")
            cardContainer.setAttribute("class", "card")
            var titleCard = document.createElement("h1")
            titleCard.textContent = data2.name
            cardContainer.appendChild(titleCard)
            container.innerHTML=""
            data2.categories.forEach(function (site) {
                var card = document.createElement("div")
                card.setAttribute("class", "card childCard")
                var h1 = document.createElement("h1")
                h1.textContent = site.id
                card.onclick = function () {
                    catTree(site.id)
                }
                var p = document.createElement("p")
                p.textContent = site.name

                card.appendChild(h1)
                card.appendChild(p)
                cardContainer.appendChild(card)
            })
            container.appendChild(cardContainer)
        } else {
        }
    }
    requestcat.send()
}
function catTree(id) {
    var requestcat = new XMLHttpRequest()
    requestcat.open("GET", "https://api.mercadolibre.com/categories/" + id, true)

    requestcat.onload = function (ev) {
        var data2 = JSON.parse(this.response)
        if (requestcat.status >= 200 && requestcat.status < 400) {
            if (data2.children_categories.length == 0){
                alert(data2.name + " no tiene más subcategorías")
            } else {
                var cardContainer = document.createElement("div")
                cardContainer.setAttribute("class", "card")
                var titleCard = document.createElement("h1")
                titleCard.textContent = data2.name
                cardContainer.appendChild(titleCard)
                container.innerHTML=""
                data2.children_categories.forEach(function (site) {
                    var card = document.createElement("div")
                    card.setAttribute("class", "card childCard")
                    var h1 = document.createElement("h1")
                    h1.textContent = site.name
                    card.onclick = function () {
                        catTree(site.id)
                    }
                    var p = document.createElement("p")
                    p.textContent = site.id

                    card.appendChild(h1)
                    card.appendChild(p)
                    cardContainer.appendChild(card)
                })
                container.appendChild(cardContainer)
            }
        } else {
        }
    }
    requestcat.send()
}
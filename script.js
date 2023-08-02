import { games } from './data.js'

document.addEventListener('DOMContentLoaded', (event) => {
  window.smoothScrollToSection = function (sectionId) {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }
})

$(document).ready(function () {
  let isExpanded = false

  $('.read-more').click(function (event) {
    event.preventDefault()
    if (isExpanded) {
      $('.desc').css('maxHeight', '160px')
      $(this).text('+Plus')
    } else {
      $('.desc').css('maxHeight', $('.desc')[0].scrollHeight + 'px')
      $(this).text('-Minus')
    }

    isExpanded = !isExpanded
  })

  window.showGames = function (type) {
    $('#casinos').removeClass('selected')
    $('#nouveauxCasinos').removeClass('selected')

    $('#' + type).addClass('selected')

    if (type === 'casinos') {
      $('#casinosRadio').prop('checked', true)
    } else {
      $('#nouveauxCasinosRadio').prop('checked', true)
    }

    $('#gamesList').empty()

    games.forEach((game, index) => {
      if (
        type === 'casinos' ||
        (type === 'nouveauxCasinos' && game.type === type)
      ) {
        var gameHTML = generateHTMLForGame(game, index)
        $('#gamesList').append(gameHTML)
      }
    })

    games.forEach((game, index) => {
      $(`#slideButton-${index}`).click(function () {
        var div = $(`#slideDiv-${index}`)
        if (div.css('maxHeight') === '0px') {
          div.css('maxHeight', '1000px')
        } else {
          div.css('maxHeight', '0px')
        }
      })
    })
  }

  showGames('casinos')
})

function generateHTMLForGame(game, index) {
  var featuresHTML = ''
  game.features.forEach((feature) => {
    featuresHTML += `<div class="spanWrap"><span class="dot"></span><p class="infodesc">${feature}</p></div>`
  })

  return `
      <div class="detailsWrapTwo" style="background-color: ${game.bgclr};">
      <div class="divideLeft">
          <img src=${game.imgLink} class="company" style="background-color: ${game.clr};">
          <div class="amount">
            <p class="jusqu">${game.percentage} ${game["jusqu'a"]}</p>
            <p class="num">${game.amount}</p>
          </div>
          <div class="amountTwo">
            <p class="spin">FREE SPINS</p>
            <p class="num">${game.spin_amount}</p>
          </div>
          <div class="info">
            ${featuresHTML}
          </div>
          <div class="ratings">
            <img src=${game.rating} alt="" class="rate">
            <p class="ratedesc">Lira Ia revue</p>
          </div>
        </div>
      <div class="divideRight">
        <div class="buttons">
        <a href=${game.buttonLink} class="linki">
        <button class="btn">Jouer</button>
        </a>
        <button class="btnTwo" id="slideButton-${index}">+Plus</button>
        </div>
      </div>
      </div>
      <div id="slideDiv-${index}" style="max-height: 0; overflow: hidden; transition: max-height 0.5s ease-out;">
            <div class="slideWrap">
              <div class="wrapper">
              <div class="box">
                <p class="boxTitle">Infos Utiles</p>
                <div class="boxDataWrapper">
                  <div class="boxData">
                    <div class="dataTile">Lancement: </div>
                    <div class="dataValue"> ${game.lancement}</div>
                  </div>
                  <div class="boxDataTwo">
                    <div class="dataTile">Licence: </div>
                    <div class="dataValue"> ${game.licence}</div>
                  </div>
                  <div class="boxData">
                    <div class="dataTile">Live Chat: </div>
                    <div class="dataValue"> Oui</div>
                  </div>
                  <div class="boxDataTwo">
                    <div class="dataTile">Dépôt min: </div>
                    <div class="dataValue"> ${game.depotmin}</div>
                  </div>
                </div>
              </div>
              <div class="box">
             
                <p class="boxTitle">Introduction</p>
                <div class="txtBox">
                ${game.introduction}
                </div>
              </div>
              <div class="box">
                <p class="boxTitle">Bonus de bienvenue</p>
                <div class="boxDataWrapper">

                  <div class="boxData">
                    <div class="dataTile">Bonus: </div>
                    <div class="dataValue"> ${game.amount}</div>
                  </div>
                  <div class="boxDataTwo">
                    <div class="dataTile">Pourcentage: </div>
                    <div class="dataValue"> ${game.percentage}</div>
                  </div>
                  <div class="boxData">
                    <div class="dataTile">Free Spins: </div>
                    <div class="dataValue"> ${game.spin_amount}</div>
                  </div>
                  <div class="boxDataTwo">
                    <div class="dataTile">Wagering: </div>
                    <div class="dataValue"> ${game.wagering}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="lineBox">
              <hr class="line">
            </div>
            <div class="reviewBox">
                <a href=${game.buttonLink} class="linki">
                  <button class="btnTwo">Lire la revue</button>
                </a>
                <a href=${game.buttonLinkTwo} class="linki">
                  <button class="btnThree">Jouer</button>
                </a>
   
            </div>
          </div>
        </div>
      `
}

const accordionItemHeaders = document.querySelectorAll('.accordion-item-header')

accordionItemHeaders.forEach((accordionItemHeader) => {
  accordionItemHeader.addEventListener('click', (event) => {
    const currentlyActiveAccordionItemHeader = document.querySelector(
      '.accordion-item-header.active'
    )
    if (
      currentlyActiveAccordionItemHeader &&
      currentlyActiveAccordionItemHeader !== accordionItemHeader
    ) {
      currentlyActiveAccordionItemHeader.classList.toggle('active')
      currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0
    }
    accordionItemHeader.classList.toggle('active')
    const accordionItemBody = accordionItemHeader.nextElementSibling
    if (accordionItemHeader.classList.contains('active')) {
      accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + 'px'
    } else {
      accordionItemBody.style.maxHeight = 0
    }
  })
})

document.getElementById('plusBtn').addEventListener('click', function () {
  let hiddenDiv = document.getElementById('slideDiv')
  hiddenDiv.classList.toggle('active')
})

document.getElementById('plusBtnTwo').addEventListener('click', function () {
  let hiddenDivTwo = document.getElementById('slideDivTwo')
  hiddenDivTwo.classList.toggle('active')
})

document.getElementById('plusBtnThree').addEventListener('click', function () {
  let hiddenDivThree = document.getElementById('slideDivThree')
  hiddenDivThree.classList.toggle('active')
})

const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loadingAnimation = document.getElementById('loader')


function showLoaderAnimation() {
    loadingAnimation.hidden = false
    quoteContainer.hidden = true
}

function hideLoadingAnimation() {
    if (!loadingAnimation.hidden) {
        quoteContainer.hidden = false
        loadingAnimation.hidden = true
    }
}

// Get Quote From API using async fetch function
 async function getQuote() {
    showLoaderAnimation()
    // Use of proxy url to make api call when dealing with cors errors
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
 try {
    const response = await fetch(proxyUrl + apiUrl)
    const data = await response.json()
    // If no Author is available inject 'Unknown' in it's place
    if (data.quoteAuthor === '') {
        authorText.innerText = 'Unknown'
    } else {
        authorText.innerText = data.quoteAuthor
    }
    
    // Reduce font-size for long Quote's

    if (data.quoteText.length > 120) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }

    quoteText.innerText = data.quoteText    
    hideLoadingAnimation()
   
 } catch (error) {
    getQuote()
    console.log('Whoops, No Quote!', error);
 }
}

// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText
    const author = authorText.innerText
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} ~ ${author}`
    window.open(twitterUrl, '_blank')
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote)
twitterBtn.addEventListener('click', tweetQuote )

// On Load
getQuote()



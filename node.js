const allCharacters = document.querySelector('#allCharacters')
const studentsBtn = document.querySelector('#students')
const staffBtn = document.querySelector('#staff')
const houseBtn = document.querySelector('#house')
const spellsBtn = document.querySelector('#spells')
const houseMenu = document.querySelector('#houseMenu')
const output = document.querySelector('#output')
const mainMenu = document.querySelector('#mainMenu')
const backButton = document.querySelector('#backButton')
const searchContainer = document.getElementById('searchContainer')
const searchInput = document.getElementById('searchInput')
const searchSpellsContainer = document.getElementById('searchSpellsContainer')
const searchSpellInput = document.getElementById('searchSpellInput')

let currentCharacters = []
let currentSpells = []

const URLS = {
	all: 'https://hp-api.onrender.com/api/characters',
	students: 'https://hp-api.onrender.com/api/characters/students',
	staff: 'https://hp-api.onrender.com/api/characters/staff',
	spells: 'https://hp-api.onrender.com/api/spells',
}

async function fetchData(url) {
	try {
		const res = await fetch(url)
		if (!res.ok) throw new Error(`HTTP error: ${res.status}`)
		return await res.json()
	} catch (err) {
		output.innerHTML = `<p style="color:red;">Error: ${err.message}</p>`
	}
}

function highlightText(text, query) {
	if (!query) return text
	const regex = new RegExp(`(${query})`, 'gi')
	return text.replace(regex, `<span class="highlight-search">$1</span>`)
}

function renderCharacterBoxes(data, query = '') {
	output.innerHTML = ''
	data.forEach(({ name, alternate_names, gender, house, dateOfBirth, eyeColour, hairColour, image }) => {
		const html = `
			<div class="box">
				<img src="${image || './no-image.jpg'}" alt="${name}" />
				<p><strong>Name:</strong> ${highlightText(name, query)}</p>
				<p><strong>Alternate:</strong> ${highlightText(alternate_names?.[0] || '—', query)}</p>
				<p><strong>Gender:</strong> ${gender || '—'}</p>
				<p><strong>House:</strong> ${house || '—'}</p>
				<p><strong>Date of Birth:</strong> ${dateOfBirth || '—'}</p>
				<p><strong>Eye colour:</strong> ${eyeColour || '—'}</p>
				<p><strong>Hair colour:</strong> ${hairColour || '—'}</p>
			</div>
		`
		output.insertAdjacentHTML('beforeend', html)
	})
	output.classList.add('visible')
}

function renderSpellBoxes(data, query = '') {
	output.innerHTML = ''
	data.forEach(({ name, description }) => {
		const html = `
			<div class="spell-box">
				<h3>${highlightText(name, query)}</h3>
				<p>${description}</p>
			</div>
		`
		output.insertAdjacentHTML('beforeend', html)
	})
	output.classList.add('visible')
}

function renderBoxes(data, type = 'character') {
	output.innerHTML = ''
	mainMenu.classList.add('hidden')
	houseMenu.classList.add('hidden')
	backButton.classList.remove('hidden')
	searchContainer.classList.toggle('hidden', type !== 'character')
	searchSpellsContainer.classList.toggle('hidden', type !== 'spell')
	output.classList.remove('visible')

	if (type === 'character') {
		currentCharacters = data
		renderCharacterBoxes(data)
	} else if (type === 'spell') {
		currentSpells = data
		renderSpellBoxes(data)
	}
}

searchInput.addEventListener('input', () => {
	const query = searchInput.value.toLowerCase()
	const filtered = currentCharacters.filter(char => char.name.toLowerCase().includes(query))
	renderCharacterBoxes(filtered, query)
})

searchSpellInput.addEventListener('input', () => {
	const query = searchSpellInput.value.toLowerCase()
	const filtered = currentSpells.filter(spell => spell.name.toLowerCase().includes(query))
	renderSpellBoxes(filtered, query)
})

backButton.addEventListener('click', () => {
	output.innerHTML = ''
	backButton.classList.add('hidden')
	mainMenu.classList.remove('hidden')
	houseMenu.classList.add('hidden')
	searchContainer.classList.add('hidden')
	searchSpellsContainer.classList.add('hidden')
	searchInput.value = ''
	searchSpellInput.value = ''
	output.classList.remove('visible')
})

allCharacters.addEventListener('click', async () => {
	const data = await fetchData(URLS.all)
	renderBoxes(data, 'character')
})

studentsBtn.addEventListener('click', async () => {
	const data = await fetchData(URLS.students)
	renderBoxes(data, 'character')
})

staffBtn.addEventListener('click', async () => {
	const data = await fetchData(URLS.staff)
	renderBoxes(data, 'character')
})

houseBtn.addEventListener('click', () => {
	mainMenu.classList.add('hidden')
	houseMenu.classList.remove('hidden')
})

houseMenu.querySelectorAll('button').forEach(btn => {
	btn.addEventListener('click', async () => {
		const house = btn.dataset.house
		const data = await fetchData(`https://hp-api.onrender.com/api/characters/house/${house}`)
		renderBoxes(data, 'character')
	})
})

spellsBtn.addEventListener('click', async () => {
	const data = await fetchData(URLS.spells)
	renderBoxes(data, 'spell')
})











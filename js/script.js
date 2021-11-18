const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

// Search shows.json and filter it
const searchBands = async searchText => {
    const res = await fetch('../data/bands.json');
    const bands = await res.json();

    // Get matches to current text input
    let matches = bands.filter(band => {
      const regex = new RegExp(`^${searchText}`, 'gi');
      return band.name.match(regex);
    });

    if (searchText.length === 0) {
        matches = [];
        matchList.innerHTML = '';
    }

    outputHtml(matches);
};

// Show results in HTML
const outputHtml = matches => {
    if(matches.length > 0) {
        const html = matches .map(match =>
           `<div class="card card-body mb-1 bg-dark">
              <img src="${match.img}" class="card-img mb-2">
              <h4 class="text-center"><span class="text-warning">${match.name}</span></h4><h5 class="text-center">Years Active: ${match.years}</h5>
              <h6 class="text-center">Members: ${match.members}</h6>
              <h5 class="text-center mt-2"><a href="${match.link}" target="_blank" class="text-white">Website</a></h5>
            </div> `
        )
        .join('');

        matchList.innerHTML = html;
    }
};

search.addEventListener('input', () => searchBands(search.value));
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

const dictionary = {
    'edf3d7e8694c654d0265be0066a62b59': 'Myrella Nascimento',
    '4bf5414cd39a16991e6c08077bd4e287': 'Marcia Lopes',
    'c1cf4086e93e7cba47ab20525d7ba4d3': 'Jorge Severiano',
    '67aba769436ecdba044888e4946d5f30': "Isaac D'Césares",
    '33fb7067dda566f740fd93266fcad0f5': 'Ana Oliveira',
    '1812e6e0252fd68bc24ae851eb1f8493': 'Isabela Oliveira',
    '01b7905f855bb64204338618e869c069': 'Brunna Cristina',
    'bc855f42d11d4d72068e8d98f2ea5830': 'Kamylla Cristina',
    '03312ffc886ded6e6eceeda351f11c93': 'Marcia Cristina',
    '8b0ed47a80a4bc4fda19264434780c21': 'Marcia Oliveira'
}

const friend = document.querySelector('#friend');
if (id) {
    friend.innerHTML = dictionary[id];
}

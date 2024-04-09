
const btnPesquisa = document.getElementById('pesquisa');
const txtprocura = document.getElementById('procura');
const livros = document.getElementById('livros');
const bntAdicionar = document.querySelector('#butaoAdicionar');

let storedBooks = []; // Array to store added books

btnPesquisa.addEventListener('click', async () => {
    const pesquisa = txtprocura.value.replaceAll(' ', '+');
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${pesquisa}`);
    const dados = await res.json();
    
    console.log(dados.items);
    
    livros.innerHTML = '';
    dados.items.forEach(item => {
        livros.innerHTML += `<li>${item.volumeInfo.title} - ${item.volumeInfo.authors} 
        <button class="addBtn" data-id="${item.id}">Adicionar</button></li>`;
    });
});

livros.addEventListener('click', async (event) => {
    if (event.target.classList.contains('addBtn')) {
        const bookId = event.target.getAttribute('data-id');
        const bookToAdd = storedBooks.find(book => book.id === bookId);
        if (!bookToAdd) {
            const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
            const bookData = await res.json();
            storedBooks.push(bookData);
            console.log('Book added:', bookData.volumeInfo.title);
        }
    }
});

bntAdicionar.addEventListener('click', () => {
    livros.innerHTML = '';
    storedBooks.forEach(book => {
        livros.innerHTML += `<li>${book.volumeInfo.title} - ${book.volumeInfo.authors} <button class="removeBtn" data-id="${book.id}">Remover</button></li>`;
    });
});

livros.addEventListener('click', (event) => {
    if (event.target.classList.contains('removeBtn')) {
        const bookId = event.target.getAttribute('data-id');
        const bookIndex = storedBooks.findIndex(book => book.id === bookId);
        if (bookIndex !== -1) {
            storedBooks.splice(bookIndex, 1);
            livros.innerHTML = '';
            storedBooks.forEach(book => {
                livros.innerHTML += `<li>${book.volumeInfo.title} - ${book.volumeInfo.authors} <button class="removeBtn" data-id="${book.id}">Remover</button></li>`;
            });
            console.log('Book removed:', bookId);
        }
    }
});


const divs = document.getElementById('divs');

const getAll = async () => {
    const response = await fetch('http://localhost:3001/api/v1/users');
    const data = await response.json();
    data.forEach(element => {
        const elemento = document.createRange().createContextualFragment(`
            <div class="card" style="width: 18rem; width: 15rem;">
                <div class="card-body">
                    <h5 class="card-title">${element.email}</h5><br>
                    <p class="card-text">${element.post}</p>
                    <button onclick="like(${element.userId})" class="btn btn-primary">Likes ${element.likes}</button>
                </div>
            </div>
        `)
        divs.appendChild(elemento);
    });
}

const like = async (id) => {
    const response = await fetch('http://localhost:3001/api/v1/users');
    const data = await response.json();

    for (let i = 0; i < data.length; i++) {
        if (data[i].userId == id) {
            data[i].likes += 1;
            const res = await fetch(`http://localhost:3001/api/v1/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data[i])
            })
            window.location.reload()
        }
    }
}

getAll();
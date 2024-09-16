document.getElementById('userForm').addEventListener('submit', startTest);

let startTime;

function startTest(e) {
    e.preventDefault();
    document.getElementById('userForm').style.display = 'none';
    document.getElementById('testArea').style.display = 'block';
    const delay = Math.random() * 5000 + 2000;
    setTimeout(() => {
        const btn = document.getElementById('testButton');
        btn.classList.replace('btn-secondary', 'btn-success');
        btn.textContent = 'Click!';
        startTime = Date.now();
    }, delay);
}

document.getElementById('testButton').addEventListener('click', () => {
    if (startTime) {
        const reactionTime = Date.now() - startTime;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        fetch('/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, time: reactionTime })
        }).then(() => {
            fetchTopTimes();
        });
    }
});

function fetchTopTimes() {
    fetch('/top')
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById('timesList');
            list.innerHTML = '';
            data.forEach(entry => {
                const li = document.createElement('li');
                li.className = 'list-group-item';
                li.textContent = `${entry.name}: ${entry.time} ms`;
                list.appendChild(li);
            });
        });
}

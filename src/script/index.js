//Buscar os dados clicando no botão
document.getElementById("btn-search").addEventListener("click", () => {
  const userName = document.getElementById("input-search").value;
  getUserProfile(userName);
  getUserRepos(userName);
});

//Buscar os dados com click do enter
document.getElementById("input-search").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const userName = e.target.value;
    getUserProfile(userName);
    getUserRepos(userName);
  }
});

//Buscar Perfil do GitHub
async function getUserProfile(userName) {
  const response = await fetch(`https://api.github.com/users/${userName}`);
  const userData = await response.json();

  const userInfo = `
  <div class="info">
    <img src="${userData.avatar_url}" alt "Foto do perfil do usuário" />
    <div class="data">
        <h1>${userData.name ?? "Não possui nome cadastrado"}</h1>
        <p>${userData.bio ?? "Não possui bio cadastrada"}</p>
    </div>
  </div>
  `;
  document.querySelector(".profile-data").innerHTML = userInfo;
}

//Buscar Perfil do GitHub
async function getUserRepos(userName) {
  const limiteRepositorios = `?per_page=10`;
  const response = await fetch(
    `https://api.github.com/users/${userName}/repos${limiteRepositorios}`
  );
  const reposData = await response.json();

  const repoItems = reposData
    .map(
      (repo) => `
      <li>
        <a href="${repo.html_url}" target="_blank">${repo.name}</a>
      </li>
    `
    )
    .join("");

  document.querySelector(".profile-data").innerHTML += `
      <div class="repositories section">
        <h2>Repositórios:</h2>
        <ul>${repoItems}</ul>
      </div>
    `;
}

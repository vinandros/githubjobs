const form = document.querySelector("#formulario");
const result = document.querySelector("#resultado");

document.addEventListener("DOMContentLoaded", () => {
  form.addEventListener("submit", checkRequestData);
});

function checkRequestData(e) {
  e.preventDefault();
  const search = document.querySelector("#busqueda").value;

  if (search.length < 3) {
    showAlert("Búsqueda muy corta, añade más información");
    return;
  }

  requestAPI(search);
}

function requestAPI(search) {
  const githubUrl = `https://jobs.github.com/positions.json?search=${search}`;
  const url = `https://api.allorigins.win/get?url=${encodeURIComponent(
    githubUrl
  )}`;

  axios.get(url).then((res) => showJobs(JSON.parse(res.data.contents)));
}

function showJobs(jobs) {
  while (result.firstChild) {
    result.removeChild(result.firstChild);
  }

  if (jobs.length > 0) {
    result.classList.add("grid");

    jobs.forEach((job) => {
      const { company, title, type, url, description } = job;
      result.innerHTML += `
            <div class="shadow bg-white p-6 rounded">
                    <h2 class="text-2xl font-light mb-4">${title}</h2>
                    <p class="font-bold uppercase">Compañia:  <span class="font-light normal-case">${company} </span></p>
                    <p class="font-bold uppercase">Tipo de Contrato:   <span class="font-light normal-case">${type} </span></p>
                    <!-- <p class="font-bold uppercase">Descripción:  <span class="font-light normal-case">${description} </span></p> -->
                    <a target="_blank" class="bg-teal-500 max-w-lg mx-auto mt-3 rounded p-2 block uppercase font-xl font-bold text-white text-center" href="${url}">Ver Vacante</a>
            </div>
            `;
    });
  } else {
    const notResults = document.createElement("p");
    notResults.classList.add("text-center", "mt-10", "text-gray-600", "w-full");
    result.classList.remove("grid");
    notResults.textContent =
      "No hay vacantes, intenta otro término de busqueda.";
    result.appendChild(notResults);
  }
}

function showAlert(msg) {
  const isExistAlert = document.querySelector(".alerta");
  if (!isExistAlert) {
    const alert = document.createElement("div");
    alert.classList.add("bg-gray-100", "p-3", "text-center", "mt-3", "alerta");
    alert.textContent = msg;

    form.appendChild(alert);
    setTimeout(() => {
      alert.remove();
    }, 3000);
  }
}

const API_URL = "http://localhost:3000/usuarios";

const formulario = document.querySelector("#form-time");
const campoId = document.querySelector("#time-id");
const campoNome = document.querySelector("#nome");
const campoEmail = document.querySelector("#email");
const campoIdade = document.querySelector("#idade");
const tituloFormulario = document.querySelector("#titulo-formulario");
const botaoSalvar = document.querySelector("#botao-salvar");
const botaoCancelar = document.querySelector("#botao-cancelar");
const listaUsuarios = document.querySelector("#lista-times");
const mensagem = document.querySelector("#mensagem");
const formularioBusca = document.querySelector("#form-busca");
const campoBuscaId = document.querySelector("#busca-id");

async function fazerRequisicao(url, opcoes = {}) {
  const resposta = await fetch(url, opcoes);

  if (!resposta.ok) {
    const erro = await resposta.json().catch(() => ({}));
    throw new Error(erro.mensagem || "Não foi possível concluir a operação");
  }

  if (resposta.status === 204) {
    return null;
  }

  return resposta.json();
}

function mostrarMensagem(texto, erro = false) {
  mensagem.textContent = texto;
  mensagem.classList.toggle("erro", erro);
}

function criarCartaoTime(time) {
  const cartao = document.createElement("article");
  cartao.className = "time";

  const nome = document.createElement("h3");
  nome.textContent = time.nome;

  const email = document.createElement("p");
  email.textContent = `E-mail: ${usuario.email}`;

  const idade = document.createElement("p");
  idade.textContent = `Idade: ${time.idade ?? "Não informada"}`;

  const id = document.createElement("p");
  id.textContent = `ID: ${time._id}`;

  const acoes = document.createElement("div");
  acoes.className = "acoes-time";

  const botaoEditar = document.createElement("button");
  botaoEditar.type = "button";
  botaoEditar.textContent = "Editar";
  botaoEditar.addEventListener("click", () => carregarTimeParaEdicao(time._id));

  const botaoExcluir = document.createElement("button");
  botaoExcluir.type = "button";
  botaoExcluir.className = "perigo";
  botaoExcluir.textContent = "Excluir";
  botaoExcluir.addEventListener("click", () => excluirTime(time._id));

  acoes.append(botaoEditar, botaoExcluir);
  cartao.append(nome, email, idade, id, acoes);

  return cartao;
}

function exibirTimes(times) {
  listaTimes.innerHTML = "";

  if (times.length === 0) {
    mostrarMensagem("Nenhum time cadastrado");
    return;
  }

  usuarios.forEach((time) => {
    listaTimes.appendChild(criarCartaoTime(time));
  });

  mostrarMensagem(`${times.length} times(s) encontrado(s)`);
}

async function listarTimes() {
  try {
    mostrarMensagem("Carregando times...");
    const times = await fazerRequisicao(API_URL);
    exibirTimes(times);
  } catch (erro) {
    listaTimes.innerHTML = "";
    mostrarMensagem(erro.message, true);
  }
}

async function buscarTimesPorId(id) {
  const time = await fazerRequisicao(`${API_URL}/${id}`);
  exibirTimes([time]);
  return time;
}

async function salvarTime(evento) {
  evento.preventDefault();

  const time = {
    nome: campoNome.value.trim(),
    email: campoEmail.value.trim()
  };

  if (campoIdade.value !== "") {
    time.idade = Number(campoIdade.value);
  }

  const id = campoId.value;
  const estaEditando = Boolean(id);
  const url = estaEditando ? `${API_URL}/${id}` : API_URL;
  const metodo = estaEditando ? "PUT" : "POST";

  try {
    await fazerRequisicao(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(time)
    });

    limparFormulario();
    mostrarMensagem(estaEditando ? "Time atualizado" : "Time cadastrado");
    await listarTimes();
  } catch (erro) {
    mostrarMensagem(erro.message, true);
  }
}

async function carregarTimeParaEdicao(id) {
  try {
    const time = await fazerRequisicao(`${API_URL}/${id}`);

    campoId.value = time._id;
    campoNome.value = time.nome;
    campoEmail.value = time.email;
    campoIdade.value = time.idade ?? "";
    tituloFormulario.textContent = "Editar time";
    botaoSalvar.textContent = "Salvar alterações";
    botaoCancelar.classList.remove("oculto");
    campoNome.focus();
  } catch (erro) {
    mostrarMensagem(erro.message, true);
  }
}

async function excluirTime(id) {
  const confirmou = window.confirm("Deseja excluir este time?");

  if (!confirmou) {
    return;
  }

  try {
    await fazerRequisicao(`${API_URL}/${id}`, { method: "DELETE" });
    limparFormulario();
    mostrarMensagem("Time excluído");
    await listarUsuarios();
  } catch (erro) {
    mostrarMensagem(erro.message, true);
  }
}

function limparFormulario() {
  formulario.reset();
  campoId.value = "";
  tituloFormulario.textContent = "Novo time";
  botaoSalvar.textContent = "Cadastrar";
  botaoCancelar.classList.add("oculto");
}

formulario.addEventListener("submit", salvarTime);
botaoCancelar.addEventListener("click", limparFormulario);
document.querySelector("#botao-atualizar").addEventListener("click", listarTimes);
document.querySelector("#botao-limpar-busca").addEventListener("click", () => {
  campoBuscaId.value = "";
  listarTimes();
});

formularioBusca.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  const id = campoBuscaId.value.trim();

  if (!id) {
    mostrarMensagem("Informe um ID para realizar a busca", true);
    return;
  }

  try {
    await buscarTimePorId(id);
  } catch (erro) {
    listaTimes.innerHTML = "";
    mostrarMensagem(erro.message, true);
  }
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}

listarTimes();

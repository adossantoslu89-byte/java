const respostas = {
    q1: "b",
    q2: "c",
    q3: "a",
    q4: "b",
    q5: "a",
    q6: "c",
    q7: "b",
    q8: "b",
    q9: "b",
    q10: "a"
};

const quiz = document.getElementById("quiz");
const progresso = document.getElementById("progresso");
const pontuacao = document.getElementById("pontuacao");
const resultado = document.getElementById("resultado");
const reiniciar = document.getElementById("reiniciar");

const total = 10;

quiz.addEventListener("change", function(evento) {

    const marcada = evento.target;

    if (marcada.type !== "radio") return;

    const nome = marcada.name;
    const pergunta = marcada.closest(".pergunta");

    // Verifica se a resposta está correta
    pergunta.classList.remove("correta", "errada");

    const feedbackAntigo = pergunta.querySelector(".feedback");

    if (feedbackAntigo) {
        feedbackAntigo.remove();
    }

    const feedback = document.createElement("p");
    feedback.className = "feedback";

    if (marcada.value === respostas[nome]) {

        pergunta.classList.add("correta");
        feedback.classList.add("certo");
        feedback.textContent = "✅ Parabéns! Resposta correta!";

    } else {

        pergunta.classList.add("errada");
        feedback.classList.add("erro");

        const correta = quiz.querySelector(
            `input[name="${nome}"][value="${respostas[nome]}"]`
        );

        feedback.textContent =
            "❌ Resposta errada! A correta é: " +
            correta.parentElement.textContent.trim();
    }

    pergunta.appendChild(feedback);

    // Atualiza a pontuação e o progresso
    let respondidas = 0;
    let pontos = 0;

    for (let i = 1; i <= total; i++) {

        const resposta = quiz.querySelector(
            `input[name="q${i}"]:checked`
        );

        if (resposta) {

            respondidas++;

            if (resposta.value === respostas["q" + i]) {
                pontos++;
            }
        }
    }

    progresso.textContent = respondidas + "/10 respondidas";
    pontuacao.textContent = "Pontos: " + pontos;

    // Mostra o resultado final
    if (respondidas === total) {
        resultado.textContent =
            "🎉 Você terminou! Acertou " + pontos + " de 10 questões!";
    } else {
        resultado.textContent = "";
    }

});

// Botão para começar novamente
reiniciar.addEventListener("click", function() {

    quiz.reset();

    document.querySelectorAll(".pergunta").forEach(function(pergunta) {

        pergunta.classList.remove("correta", "errada");

        const feedback = pergunta.querySelector(".feedback");

        if (feedback) {
            feedback.remove();
        }

    });

    progresso.textContent = "0/10 respondidas";
    pontuacao.textContent = "Pontos: 0";
    resultado.textContent = "";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});
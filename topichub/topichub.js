function selector(entity) {
    document.querySelectorAll(".topic-entity").forEach(el => {
        el.classList.remove("active");
    })
    entity.classList.add('active');

    let selected_topic = document.getElementById("selected-topic");
    selected_topic.innerHTML = entity.innerText;

    document.getElementById("learn-link").href =
        `../materials/materials.html?topic=${encodeURIComponent(entity.id)}`;

    document.getElementById("quiz-link").href =
        `../quiz/quiz.html?topic=${encodeURIComponent(entity.id)}`;
}
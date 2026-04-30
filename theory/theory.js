function selector(entity) {
    document.querySelectorAll(".topic-entity").forEach(el => {
        el.classList.remove("active");
    })
    entity.classList.add('active');

    let selected_topic = document.getElementById("selected-topic");
    selected_topic.innerHTML = entity.innerText;

    console.log(entity.innerText);
    console.log(entity.id);
}
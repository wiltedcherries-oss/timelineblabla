document.querySelectorAll("main").forEach(function (timeline) {
  const dates = [...timeline.querySelectorAll(".date")];
  const rail = timeline.querySelector(".rail");
  const story = timeline.querySelector(".story");

  if (!dates.length || !rail || !story) return;

  let timer;

  function show(index) {
    const button = dates[index];

    dates.forEach(function (date, i) {
      if (i === index) {
        date.setAttribute("aria-current", "date");
      } else {
        date.removeAttribute("aria-current");
      }
    });

    const progress = dates.length > 1
      ? (index / (dates.length - 1)) * 100
      : 0;

    rail.style.setProperty("--progress", progress + "%");
    story.classList.add("leaving");
    clearTimeout(timer);

    timer = setTimeout(function () {
      story.querySelector("h1").textContent = button.dataset.title;
      story.querySelector("p").textContent = button.dataset.copy;
      story.classList.remove("leaving");
    }, 180);
  }

  dates.forEach(function (date, index) {
    date.addEventListener("click", function () {
      show(index);
    });
  });
});

import projects from "./projects.js";

const content = document.querySelector(".content");
const navToggleBtn = document.querySelector(".toggle-btn");
const navLinks = document.querySelector(".nav-links");
const projectLinks = document.querySelector(".project-links");

window.addEventListener("DOMContentLoaded", () => {
  displayProjectItems(projects);
  displayNavProject(projects);
  const navProjectItems = document.querySelectorAll(".link-item");
  navProjectItems.forEach((item) => {
    item.addEventListener("click", () => {
      navLinks.classList.toggle("hidden");
    });
  });

  const items = document.querySelectorAll("article");
  items.forEach((item) => {
    const expand = item.querySelector(".expand");
    const info = item.querySelector(".info");
    const close = item.querySelector(".close");
    const imgBtns = item.querySelectorAll(".img-btn");
    const projectImg = item.querySelector(".project-image");

    let currentItem = 0;

    expand.addEventListener("click", () => {
      toggleInfo();
    });

    close.addEventListener("click", () => {
      toggleInfo();
    });

    const toggleInfo = () => {
      info.classList.toggle("hidden");
      expand.classList.toggle("hidden");
    };

    imgBtns.forEach((imgBtn) => {
      imgBtn.addEventListener("click", (e) => {
        const index = item.id;
        const images = projects[index].images;
        if (e.currentTarget.classList.contains("prev")) {
          currentItem--;
          if (currentItem < 0) {
            currentItem = images.length - 1;
          }
        } else if (e.currentTarget.classList.contains("next")) {
          currentItem++;
          if (currentItem > images.length - 1) {
            currentItem = 0;
          }
        }
        const image = images[currentItem];
        projectImg.src = image;
      });
    });
  });
});

navToggleBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("hidden");
});

const displayNavProject = (projectItems) => {
  let displayProject = projectItems.map((item, index) => {
    return `<li>
              <a class='link-item' href='#${index}'><i class="fa-solid fa-chevron-right"></i>${item.projectName}</a>
            </li>`;
  });
  displayProject = `<p>Projects</p>${displayProject.join("")}`;
  projectLinks.innerHTML = displayProject;
};

const displayProjectItems = (projectItems) => {
  let displayProject = projectItems.map((item, index) => {
    const frameworks = handleFrameworks(item);
    const languagePercentage = handleLangPercentage(item);
    const images = null;

    return `<article id='${index}'>
              <h2>${item.projectName}</h2>
              <div class='image-container'>
                <button class='img-btn prev'><i class="fa-solid fa-chevron-left"></i></button>
                  <img class='project-image' src='${
                    item.images[0]
                  }' alt='no-image-available'>
                <button class='img-btn next'><i class="fa-solid fa-chevron-right"></i></button>
              </div>
              <h3 class="date">${item.date}</h3>
              <p class="link">
                <a class="${
                  item.link === "" ? "hidden" : ""
                }" target="_blank" href="${
      item.link
    }"><i class="fa-solid fa-link"></i></a>
                <a class="${
                  item.repository === "" ? "hidden" : ""
                }" target="_blank" href="${
      item.repository
    }"><i class="fa-brands fa-github"></i></a>
              </p>
              <div class='desc'>
                <p>${item.description}
                <span class='expand'>Selengkapnya</span></p>
                <div class='info hidden'>
                  <div class="close">X</div>
                  <p><span class='info-item'>Languages</span>: ${item.languages.join(
                    ", "
                  )}</p>
                  <p><span class='info-item'>Framework/Library</span>: ${frameworks}</p>
                  <div>
                    <p><span class='info-item'>Language Proportion</span>:</p>
                    <div class="percentage">${languagePercentage}</div>
                  </div>
                </div>
              </div>
            </article>`;
  });
  displayProject = displayProject.join("");
  content.innerHTML = displayProject;
};

const handleFrameworks = (item) => {
  let frameworks;
  if (item.frameworks) {
    frameworks = item.frameworks.join(", ");
  } else {
    frameworks = "-";
  }
  return frameworks;
};

const handleLangPercentage = (item) => {
  let languagePercentage = item.languagePercentage.map((lang) => {
    return `<div class='lang ${lang.langName}' style='width: ${lang.percentage}%;'></div>`;
  });
  languagePercentage = languagePercentage.join("");
  return languagePercentage;
};

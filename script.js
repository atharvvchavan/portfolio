const CONFIG = {
  name: "Atharv Chavan",
  role: "Aspiring DevOps Engineer",
  email: "chavanatharvv@gmail.com",
  github: "https://github.com/atharvvchavan",
  linkedin: "https://www.linkedin.com/in/atharv-chavan-9441a2363?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
  intro: "I am learning DevOps by building real things: Linux servers, Docker, and CI/CD pipelines. Every project is on GitHub, with honest notes on what works and what is unfinished.",
  availability: "Open to DevOps internships and junior roles",
  nav: [["Work", "#work"], ["About", "#about"], ["Contact", "#contact"]],
  work: [
    
     {
      title: "Secure Linux Server",
      line: "Ubuntu server with SSH key login, password login disabled, a ufw firewall, and backup, cleanup and health-check scripts run by cron.",
      tag: "Linux",
      year: "2026",
      url: "https://github.com/atharvvchavan/linux-server-scripts"
    },
    {
      title: "This Portfolio Site",
      line: "A static site served by Nginx in a Docker container, deployed by GitHub Actions on a self-hosted runner.",
      tag: "Docker / CI",
      year: "2026",
      url: "#"
    },
    {
      title: "Unit Converter CI/CD",
      line: "GitHub Actions pipeline: lint, tests on two Python versions, a container smoke test, and publishing the image to GHCR.",
      tag: "CI/CD",
      year: "2026",
      url: "https://github.com/atharvvchavan/unit-converter"
    },
    {
      title: "Compose Notes App",
      line: "Flask and PostgreSQL started together with Docker Compose, with a healthcheck, a named volume and secrets kept out of Git.",
      tag: "Docker",
      year: "2026",
      url: "https://github.com/atharvvchavan/compose-notes-app"
    },
    
  ],
    statement: "Build it small, automate it, and test it before anyone else has to.",
  statementBy: "My rule for every project",
    facts: [
    { value: "4", label: "hands-on projects", lead: true },
    { value: "4", label: "pipeline stages on every push", ink: true },
    { value: "2", label: "Python versions tested automatically" },
    { value: "3", label: "Bash scripts run by cron" }
  ],
    about: [
    "I am a beginner in DevOps, learning step by step by building projects on my own laptop and a Linux VM. I start small, break things on purpose, and write down what I learn.",
    "So far I have worked with Linux and Bash, Docker and Docker Compose, and GitHub Actions. I am looking for a first role where I can keep learning from a team."
  ],
  clients: ["Linux", "Bash", "Docker", "Docker Compose", "GitHub Actions", "Nginx", "Python", "Git"],
  choices: ["Job opportunity", "Collaboration"],
  footerNote: "Learning in public. Open to remote and local roles."
};

const $ = (id) => document.getElementById(id);
const C = CONFIG;
document.title = C.name + ": " + C.role;

$("head").innerHTML = `<a class="mark" href="#top">${C.name}</a>` + C.nav.map(([t, h]) => `<a href="${h}">${t}</a>`).join("");

$("hero").innerHTML = `
  <div class="big"><h1>${C.name}</h1></div>
  <div class="lede"><p>${C.intro}</p><div class="btns"><a class="btn" href="#work">See work</a><a class="btn btn--ink" href="#contact">Get in touch</a></div></div>
  <div class="avail ink"><span class="muted" style="color:var(--color-paper-3)">${C.role}</span><span class="display">${C.availability}</span></div>`;

$("work-count").textContent = C.work.length + " selected projects";
$("index").innerHTML = C.work.map((w, i) => `
  <a class="row" href="${w.url}"${w.url.startsWith("http") ? ' target="_blank" rel="noopener"' : ""}>
    <span class="num">${String(i + 1).padStart(2, "0")}</span>
    <span><h3>${w.title}</h3><p>${w.line}</p></span>
    <span class="meta">${w.tag}<br>${w.year}</span>
  </a>`).join("");

$("statement").innerHTML = `<p class="display">${C.statement}</p><p class="by muted">${C.statementBy}</p>`;

$("bento").innerHTML = C.facts.map((f) =>
  `<div class="${f.lead ? "lead" : ""} ${f.ink ? "ink" : ""}"><span class="num">${f.value}</span><span class="muted">${f.label}</span></div>`).join("");

$("about-cells").innerHTML = `
  <div><h2>About</h2></div>
  <div>${C.about.map((p) => `<p>${p}</p>`).join("")}</div>
  <div class="clients">${C.clients.map((c) => `<span>${c}</span>`).join("")}</div>`;

let chosen = C.choices[0];
$("form").innerHTML = `
  <div class="field"><label for="f-name">Name</label><input id="f-name" autocomplete="name"></div>
  <div class="field"><label for="f-email">Email</label><input id="f-email" type="email" autocomplete="email"></div>
  ${C.choices.map((c, i) => `<button type="button" class="choice${i === 0 ? " is-chosen" : ""}" data-c="${c}" aria-pressed="${i === 0}">${c}</button>`).join("")}
  <div class="field full"><label for="f-msg">Your message</label><textarea id="f-msg" rows="5"></textarea></div>
  <button type="submit" class="send full">Send message</button>`;

$("form").addEventListener("click", (e) => {
  const b = e.target.closest(".choice"); if (!b) return;
  chosen = b.dataset.c;
  document.querySelectorAll(".choice").forEach((x) => { const on = x === b; x.classList.toggle("is-chosen", on); x.setAttribute("aria-pressed", on); });
});
$("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const n = $("f-name").value, em = $("f-email").value, m = $("f-msg").value;
  const body = `${m}\n\n${n}\n${em}`;
  location.href = `mailto:${C.email}?subject=${encodeURIComponent(chosen + " enquiry")}&body=${encodeURIComponent(body)}`;
});

const links = [["GitHub", C.github], ["LinkedIn", C.linkedin]]
  .filter(([, url]) => url)
  .map(([label, url]) => `<a href="${url}" target="_blank" rel="noopener">${label}</a>`)
  .join(" · ");

$("foot").innerHTML = `<div class="display">Say hello</div>
  <p style="margin-top:20px"><a href="mailto:${C.email}">${C.email}</a></p>
  ${links ? `<p style="margin-top:8px">${links}</p>` : ""}
  <div class="muted"><span>${C.footerNote}</span><span>© ${new Date().getFullYear()} ${C.name}</span></div>`;
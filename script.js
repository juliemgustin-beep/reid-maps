const destinations = [
  { key: "work", name: "OpenAI", category: "Work" },
  { key: "home", name: "Home", category: "Homes" },
  { key: "tahoe", name: "Tahoe", category: "Homes" },
  { key: "lower", name: "Lower", category: "Schools" },
  { key: "middle", name: "Middle", category: "Schools" },
  { key: "upper", name: "Upper", category: "Schools" },
  { key: "fremont-hills-club", name: "Fremont Hills Club", category: "Sports" },
  { key: "grant-park", name: "Grant Park", category: "Sports" },
  { key: "fabian", name: "Fabian", category: "Sports" },
  { key: "chase", name: "Chase", category: "Sports" },
  { key: "paly-football-field", name: "PALY Football Field", category: "Sports" },
  { key: "encina", name: "Encina", category: "Doctors" },
  { key: "smilecraft", name: "Smilecraft", category: "Doctors" },
  { key: "pediatrician", name: "Pediatrician", category: "Doctors" },
  { key: "kids-dentist", name: "Kids' Dentist", category: "Doctors" },
  { key: "urgent-care-mtv", name: "Urgent Care MTV", category: "Doctors" },
  { key: "trader-joes", name: "Trader Joe's", category: "Stores" },
  { key: "target", name: "Target", category: "Stores" },
  { key: "costco", name: "Costco", category: "Stores" },
  { key: "stanford-mall", name: "Stanford Mall", category: "Stores" },
  { key: "downtown-los-altos", name: "Downtown Los Altos", category: "Stores" },
  { key: "andronicos", name: "Andronicos", category: "Stores" },
  { key: "home-depot", name: "Home Depot", category: "Stores" },
  { key: "lowes", name: "Lowe's", category: "Stores" },
  { key: "anna", name: "Anna", category: "Friends and Family" },
  { key: "eddie", name: "Eddie", category: "Friends and Family" },
  { key: "stewart", name: "Stewart", category: "Friends and Family" },
  { key: "aman", name: "Aman", category: "Friends and Family" },
  { key: "clayton", name: "Clayton", category: "Friends and Family" },
];

const icons = {
  Homes: `
    <svg viewBox="0 0 24 24" focusable="false">
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5.5 9.5V20h13V9.5" />
      <path d="M10 20v-5h4v5" />
    </svg>
  `,
  Schools: `
    <svg viewBox="0 0 24 24" focusable="false">
      <path d="M4.5 5.5h8a3 3 0 0 1 3 3v10h-8a3 3 0 0 0-3 3z" />
      <path d="M19.5 5.5h-8a3 3 0 0 0-3 3v10h8a3 3 0 0 1 3 3z" />
    </svg>
  `,
  Work: `
    <svg viewBox="0 0 24 24" focusable="false">
      <path d="M4.5 8.5h15v10h-15z" />
      <path d="M9 8.5v-2a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 6.5v2" />
      <path d="M4.5 12h15" />
    </svg>
  `,
  Sports: `
    <svg viewBox="0 0 24 24" focusable="false">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 3.5a14 14 0 0 1 0 17" />
      <path d="M12 3.5a14 14 0 0 0 0 17" />
      <path d="M5.5 7.5c2.2 1.4 4.4 2.1 6.5 2.1s4.3-.7 6.5-2.1" />
      <path d="M5.5 16.5c2.2-1.4 4.4-2.1 6.5-2.1s4.3.7 6.5 2.1" />
    </svg>
  `,
  Stores: `
    <svg viewBox="0 0 24 24" focusable="false">
      <path d="M7 8V7a5 5 0 0 1 10 0v1" />
      <path d="M5.5 8.5h13l-1 11h-11z" />
      <path d="M9.5 11.5a2.5 2.5 0 0 0 5 0" />
    </svg>
  `,
  Doctors: `
    <svg viewBox="0 0 24 24" focusable="false">
      <path d="M12 4.5v15" />
      <path d="M4.5 12h15" />
      <path d="M6.5 4.5h11a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2v-11a2 2 0 0 1 2-2z" />
    </svg>
  `,
  "Friends and Family": `
    <svg viewBox="0 0 24 24" focusable="false">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5.5 19a6.5 6.5 0 0 1 13 0" />
    </svg>
  `,
};

const groupsContainer = document.querySelector("#groups");
const groupTemplate = document.querySelector("#group-template");
const buttonTemplate = document.querySelector("#button-template");

const groupedDestinations = destinations.reduce((groups, destination) => {
  const { category } = destination;

  if (!groups[category]) {
    groups[category] = [];
  }

  groups[category].push(destination);
  return groups;
}, {});

const workerBaseUrl = "https://reid-maps.julie-m-gustin.workers.dev";

const buildDirectionsUrl = (key) => `${workerBaseUrl}/go/${encodeURIComponent(key)}`;

const toggleGroup = (section, button) => {
  const isCollapsed = section.classList.toggle("is-collapsed");
  section.classList.toggle("is-open", !isCollapsed);
  button.setAttribute("aria-expanded", String(!isCollapsed));
};

Object.entries(groupedDestinations).forEach(([group, places]) => {
  const groupFragment = groupTemplate.content.cloneNode(true);
  const section = groupFragment.querySelector(".group");
  const toggle = groupFragment.querySelector(".group-toggle");
  const title = groupFragment.querySelector(".group-title");
  const groupIcon = groupFragment.querySelector(".group-icon");
  const grid = groupFragment.querySelector(".button-grid");

  title.textContent = group;
  groupIcon.innerHTML = icons[group] || "";
  toggle.setAttribute("aria-label", `Toggle ${group} destinations`);

  toggle.addEventListener("click", () => toggleGroup(section, toggle));

  places.forEach(({ key, name }) => {
    const buttonFragment = buttonTemplate.content.cloneNode(true);
    const link = buttonFragment.querySelector(".destination-button");
    const icon = buttonFragment.querySelector(".destination-icon");
    const nameText = buttonFragment.querySelector(".destination-name");

    nameText.textContent = name;
    icon.innerHTML = icons[group] || "";
    link.href = buildDirectionsUrl(key);
    link.setAttribute("aria-label", `Open Google Maps directions to ${name}`);

    grid.appendChild(buttonFragment);
  });

  groupsContainer.appendChild(groupFragment);
});

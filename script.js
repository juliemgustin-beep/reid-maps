const destinations = [
  { name: "Home", address: "1141 Payne Drive Los Altos, CA 94024", category: "Homes" },
  { name: "Tahoe", address: "497 Tahoe Keys Blvd, South Lake Tahoe, CA 96150", category: "Homes" },
  { name: "Mom", address: "19626 Vineyard Ln, Saratoga, CA 95070", category: "Homes" },
  { name: "Eddie", address: "1612 Duvall Dr, San Jose, CA 95130", category: "Homes" },
  { name: "Lower", address: "477 Fremont Ave, Los Altos, CA 94024", category: "Schools" },
  { name: "Middle", address: "327 Fremont Ave, Los Altos, CA 94024", category: "Schools" },
  { name: "Upper", address: "26800 Fremont Rd, Los Altos Hills, CA 94022", category: "Schools" },
  { name: "Fabian", address: "3750 Fabian Way, Palo Alto, CA 94303", category: "Schools" },
  { name: "Fremont Hills Club", address: "12889 Viscaino Pl, Los Altos Hills, CA 94022", category: "Sports" },
  { name: "Grant Park", address: "1575 Holt Ave, Los Altos, CA 94024", category: "Sports" },
  { name: "Fabian", address: "1575 Holt Ave, Los Altos, CA 94024", category: "Sports" },
  { name: "Chase", address: "1 Warriors Way, San Francisco, CA 94158", category: "Sports" },
  { name: "Encina", address: "49 Wells Avenue, 3rd Floor, Palo Alto, CA 94301", category: "Doctors" },
  { name: "Smilecraft", address: "787 E El Camino Real, Sunnyvale, CA 94087", category: "Doctors" },
  { name: "Pediatrian", address: "842 Altos Oaks Dr, Los Altos, CA 94024", category: "Doctors" },
  { name: "Kids' Dentist", address: "1704 Miramonte Ave #9, Mountain View, CA 94040", category: "Doctors" },
  { name: "Urgent Care Mountain View", address: "701 E El Camino Real 2nd floor, Mountain View, CA 94040", category: "Doctors" },
  { name: "Trader Joes", address: "2310 Homestead Rd, Los Altos, CA 94024", category: "Stores" },
  { name: "Target", address: "555 Showers Dr, Mountain View, CA 94040", category: "Stores" },
  { name: "Costco", address: "1000 N Rengstorff Ave #143c, Mountain View, CA 94043", category: "Stores" },
  { name: "Stanford Mall", address: "660 Stanford Shopping Center, Palo Alto, CA 94304", category: "Stores" },
  { name: "Downtown Los Altos", address: "288 1st St, Los Altos, CA 94022", category: "Stores" },
  { name: "Stewart", address: "288 Liebre Ct, Sunnyvale, CA 94086", category: "Friends" },
  { name: "Aman", address: "1586 Holt Ave, Los Altos, CA 94024", category: "Friends" },
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
  Friends: `
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

const buildGoogleMapsUrl = (address) => {
  const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}&travelmode=driving`;
  return url;
};

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

  places.forEach(({ name, address }) => {
    const buttonFragment = buttonTemplate.content.cloneNode(true);
    const link = buttonFragment.querySelector(".destination-button");
    const icon = buttonFragment.querySelector(".destination-icon");
    const nameText = buttonFragment.querySelector(".destination-name");

    nameText.textContent = name;
    icon.innerHTML = icons[group] || "";
    link.href = buildGoogleMapsUrl(address);
    link.setAttribute("aria-label", `Open Google Maps directions to ${name}`);

    grid.appendChild(buttonFragment);
  });

  groupsContainer.appendChild(groupFragment);
});
